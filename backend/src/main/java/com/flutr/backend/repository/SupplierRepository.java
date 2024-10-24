package com.flutr.backend.repository;

import com.flutr.backend.model.Supplier;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface SupplierRepository extends MongoRepository<Supplier, String> {
    Optional<Supplier> findByAbbreviation(String abbreviation);
}