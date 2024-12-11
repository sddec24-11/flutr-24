package com.flutr.backend.service;

import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.flutr.backend.model.ButterflyDetail;
import com.flutr.backend.model.HouseButterflies;
import com.flutr.backend.model.Shipment;
import com.flutr.backend.util.JwtUtil;
import com.mongodb.client.MongoClients;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class ReportService {

    private final LoggingService loggingService;
    private final JwtUtil jwtUtil;
    private final HttpServletRequest request;

    @Autowired
    public ReportService(LoggingService loggingService, JwtUtil jwtUtil, HttpServletRequest request) {
        this.loggingService = loggingService;
        this.request = request;
        this.jwtUtil = jwtUtil;
    }

    @Value("${butterfly.placeholder.url}")
    private String defaultImageUrl;

    private MongoTemplate getMongoTemplate() {
        String houseId = getCurrentHouseId();
        return new MongoTemplate(MongoClients.create(), houseId + "_DB");
    }

    private MongoTemplate getMongoTemplate(String houseId) {
        return new MongoTemplate(MongoClients.create(), houseId + "_DB");
    }

    private String getCurrentHouseId() {
        final String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            try {
                return jwtUtil.extractHouseId(jwt);
            } catch (Exception e) {
                throw new IllegalStateException("Failed to extract house ID from JWT", e);
            }
        } else {
            throw new SecurityException("No JWT token found in request headers");
        }
    }

    private boolean isSuperUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().stream()
                            .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_SUPERUSER"));
    }

    public List<List<String>> exportShipmentData(
        @RequestParam(required = false) Integer startYear, 
        @RequestParam(required = false) Integer startMonth, 
        @RequestParam(required = false) Integer endYear, 
        @RequestParam(required = false) Integer endMonth, 
        @RequestParam(required = false) String houseId) {

        MongoTemplate mongoTemplate;
        if (houseId != null && isSuperUser()){
            mongoTemplate = getMongoTemplate(houseId);
        } else {
            mongoTemplate = getMongoTemplate();
        }
        Criteria criteria = new Criteria();
        loggingService.log("HANDLE_EXPORT", "START", "Starting report export");
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
            if (startYear != null && startMonth != null && endYear != null && endMonth != null) {
                Date startDate = sdf.parse(startYear + "-" + startMonth);
                Date endDate = sdf.parse(endYear + "-" + endMonth);
                Calendar cal = Calendar.getInstance();
                cal.setTime(endDate);
                cal.add(Calendar.MONTH, 1);
                endDate = cal.getTime();
                criteria.and("arrivalDate").gte(startDate).lt(endDate);
            } else if (startYear != null && startMonth != null) {
                Date startDate = sdf.parse(startYear + "-" + startMonth);
                Calendar cal = Calendar.getInstance();
                cal.setTime(startDate);
                cal.add(Calendar.MONTH, 1);
                Date endDate = cal.getTime();
                criteria.and("arrivalDate").gte(startDate).lt(endDate);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error parsing date: " + e.getMessage());
        }

        Query query = new Query(criteria).with(Sort.by(Sort.Direction.DESC, "arrivalDate"));
        List<Shipment> shipments = mongoTemplate.find(query, Shipment.class, "shipments");

        List<List<String>> csvData = new ArrayList<>();
        csvData.add(List.of("Species", "Common name", "No. rec", "Supplier", "Ship date", "Arrival date", "Emerg. in transit", "Damag in transit", "No. disea", "No. parasit", "No emerg", "Poor emerg"));

        for (Shipment shipment : shipments) {
            for (ButterflyDetail detail : shipment.getButterflyDetails()) {
                HouseButterflies houseButterfly = mongoTemplate.findOne(Query.query(Criteria.where("buttId").is(detail.getButtId())), HouseButterflies.class, "house_butterflies");

                List<String> row = List.of(
                    detail.getButtId(),
                    houseButterfly != null ? houseButterfly.getCommonName() : "Unknown",
                    String.valueOf(detail.getNumberReceived()),
                    shipment.getAbbreviation(),
                    new SimpleDateFormat("MM/dd/yyyy").format(shipment.getShipmentDate()),
                    new SimpleDateFormat("MM/dd/yyyy").format(shipment.getArrivalDate()),
                    String.valueOf(detail.getEmergedInTransit()),
                    String.valueOf(detail.getDamaged()),
                    String.valueOf(detail.getDiseased()),
                    String.valueOf(detail.getParasite()),
                    String.valueOf(detail.getNoEmergence()),
                    String.valueOf(detail.getPoorEmergence())
                );
                csvData.add(row);
            }
        }

        loggingService.log("HANDLE_EXPORT", "SUCCESS", "Finished report export successfully");
        return csvData;
    }

    public List<String> importShipmentsFromCsv(MultipartFile file) throws Exception {
        MongoTemplate mongoTemplate = getMongoTemplate();
        List<Shipment> shipments = new ArrayList<>();
        List<String> errors = new ArrayList<>();
        Shipment currentShipment = null;
        String currentSupplier = null;
        Date currentShipDate = null;
        Date currentArrivalDate = null;
        int lineNumber = 0;

        try (CSVReader reader = new CSVReaderBuilder(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))
                .withSkipLines(1)
                .build()) {

            String[] details;
            while ((details = reader.readNext()) != null) {
                lineNumber++;
                
                if (details.length < 12) {
                    errors.add("Line " + lineNumber + ": Incomplete or malformed line.");
                    continue;
                }

                try {
                    Date shipDate = parseDate(details[4].trim());
                    Date arrivalDate = parseDate(details[5].trim());
                    String supplier = details[3].trim();

                    if (currentShipment == null || !supplier.equals(currentSupplier) || !shipDate.equals(currentShipDate) || !arrivalDate.equals(currentArrivalDate)) {
                        currentShipment = new Shipment();
                        currentShipment.setShipmentDate(shipDate);
                        currentShipment.setArrivalDate(arrivalDate);
                        currentShipment.setAbbreviation(supplier);
                        currentShipment.setButterflyDetails(new ArrayList<>());
                        shipments.add(currentShipment);

                        currentSupplier = supplier;
                        currentShipDate = shipDate;
                        currentArrivalDate = arrivalDate;
                    }

                    ButterflyDetail detail = new ButterflyDetail();
                    detail.setButtId(details[0].trim());
                    detail.setNumberReceived(parseInt(details[2].trim()));
                    detail.setNumberReleased(detail.getNumberReceived()); // released = received
                    detail.setTotalRemaining(0); // Always set to 0 initially
                    detail.setEmergedInTransit(parseInt(details[6].trim()));
                    detail.setDamaged(parseInt(details[7].trim()));
                    detail.setDiseased(parseInt(details[8].trim()));
                    detail.setParasite(parseInt(details[9].trim()));
                    detail.setNoEmergence(parseInt(details[10].trim()));
                    detail.setPoorEmergence(parseInt(details[11].trim()));

                    currentShipment.getButterflyDetails().add(detail);

                    updateOrCreateButterfly(detail, arrivalDate, details[1].trim(), mongoTemplate);
                } catch (ParseException | NumberFormatException e) {
                    errors.add("Line " + lineNumber + ": " + e.getMessage());
                }
            }
        }

        if (!errors.isEmpty()) {
            return errors;
        }

        for (Shipment shipment : shipments) {
            mongoTemplate.save(shipment, "shipments");
        }
        return Collections.emptyList(); 
    }

    private Date parseDate(String dateString) throws ParseException {
        List<SimpleDateFormat> dateFormats = new ArrayList<>(Arrays.asList(
            new SimpleDateFormat("MM/dd/yyyy"),
            new SimpleDateFormat("MM-dd-yyyy")
        ));

        ParseException lastException = null;
        for (SimpleDateFormat format : dateFormats) {
            try {
                return format.parse(dateString);
            } catch (ParseException e) {
                lastException = e;
            }
        }
        if (lastException != null) {
            throw lastException;
        } else {
            throw new ParseException("No valid date format found for: " + dateString, 0);
        }
    }

    private int parseInt(String value) {
        if (value == null || value.trim().isEmpty()) {
            return 0;
        }
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    private void updateOrCreateButterfly(ButterflyDetail detail, Date arrivalDate, String commonName, MongoTemplate mongoTemplate) {
        Query query = new Query(Criteria.where("buttId").is(detail.getButtId()));

        HouseButterflies existingButterfly = mongoTemplate.findOne(query, HouseButterflies.class, "house_butterflies");
        Update update = new Update()
            .inc("totalFlown", detail.getNumberReleased())
            .inc("totalReceived", detail.getNumberReceived());

        if (existingButterfly == null) {
            update.setOnInsert("commonName", commonName);
            update.setOnInsert("firstFlownOn", arrivalDate);
            update.setOnInsert("lastFlownOn", arrivalDate);
            update.setOnInsert("noInFlight", 0);
            update.setOnInsert("BOTD", false);
            update.setOnInsert("imgWingsOpen", defaultImageUrl);
            update.setOnInsert("imgWingsClosed", defaultImageUrl);
            update.setOnInsert("extraImg1", "");
            update.setOnInsert("extraImg2", "");
        } else {
            update.min("firstFlownOn", arrivalDate);
            update.max("lastFlownOn", arrivalDate);
        }
        mongoTemplate.upsert(query, update, HouseButterflies.class, "house_butterflies");
    }
}