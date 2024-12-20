import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import SocialModal from "../components/SocialModal";
import PageTitle from "../components/PageTitle";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Chart } from "react-google-charts";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  Marker
} from "react-simple-maps";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Stats({data, kioskMode}){
    const [locationData, setLocationData] = useState({});
    const [statData, setStats] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [least, setLeast] = useState({});
    const [most, setMost] = useState({});
    const [families, setFamilies] = useState([['Family', 'Number In Flight']]);
    const [continents, setContinents] = useState({});
    const [continentValues, setcontinentValues] = useState([]);
    const [finalContinentValues, setfinalContinentValues] = useState([]);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const countryContinentMap = {
      "AFG": "Asia",
      "ALB": "Europe",
      "DZA": "Africa",
      "ASM": "Oceania",
      "AND": "Europe",
      "AGO": "Africa",
      "AIA": "North America",
      "ATA": "Antarctica",
      "ATG": "North America",
      "ARG": "Central/South America",
      "ARM": "Asia",
      "ABW": "North America",
      "AUS": "Oceania",
      "AUT": "Europe",
      "AZE": "Asia",
      "BHS": "North America",
      "BHR": "Asia",
      "BGD": "Asia",
      "BRB": "North America",
      "BLR": "Europe",
      "BEL": "Europe",
      "BLZ": "North America",
      "BEN": "Africa",
      "BMU": "North America",
      "BTN": "Asia",
      "BOL": "Central/South America",
      "BES": "North America",
      "BIH": "Europe",
      "BWA": "Africa",
      "BVT": "Antarctica",
      "BRA": "Central/South America",
      "IOT": "Africa",
      "VGB": "North America",
      "BRN": "Asia",
      "BGR": "Europe",
      "BFA": "Africa",
      "BDI": "Africa",
      "CPV": "Africa",
      "KHM": "Asia",
      "CMR": "Africa",
      "CAN": "North America",
      "CYM": "North America",
      "CAF": "Africa",
      "TCD": "Africa",
      "CHL": "Central/South America",
      "CHN": "Asia",
      "HKG": "Asia",
      "MAC": "Asia",
      "CXR": "Oceania",
      "CCK": "Oceania",
      "COL": "Central/South America",
      "COM": "Africa",
      "COG": "Africa",
      "COK": "Oceania",
      "CRI": "Central/South America",
      "CIV": "Africa",
      "HRV": "Europe",
      "CUB": "Central/South America",
      "CUW": "North America",
      "CYP": "Asia",
      "CZE": "Europe",
      "PRK": "Asia",
      "COD": "Africa",
      "DNK": "Europe",
      "DJI": "Africa",
      "DMA": "North America",
      "DOM": "North America",
      "ECU": "Central/South America",
      "EGY": "Africa",
      "SLV": "Central/South America",
      "GNQ": "Africa",
      "ERI": "Africa",
      "EST": "Europe",
      "SWZ": "Africa",
      "ETH": "Africa",
      "FLK": "South America",
      "FRO": "Europe",
      "FJI": "Oceania",
      "FIN": "Europe",
      "FRA": "Europe",
      "GUF": "Central/South America",
      "PYF": "Oceania",
      "ATF": "Antarctica",
      "GAB": "Africa",
      "GMB": "Africa",
      "GEO": "Asia",
      "DEU": "Europe",
      "GHA": "Africa",
      "GIB": "Europe",
      "GRC": "Europe",
      "GRL": "North America",
      "GRD": "North America",
      "GLP": "North America",
      "GUM": "Oceania",
      "GTM": "Central/South America",
      "GGY": "Europe",
      "GIN": "Africa",
      "GNB": "Africa",
      "GUY": "Central/South America",
      "HTI": "Central/South America",
      "HMD": "Antarctica",
      "VAT": "Europe",
      "HND": "Central/South America",
      "HUN": "Europe",
      "ISL": "Europe",
      "IND": "Asia",
      "IDN": "Asia",
      "IRN": "Asia",
      "IRQ": "Asia",
      "IRL": "Europe",
      "IMN": "Europe",
      "ISR": "Asia",
      "ITA": "Europe",
      "JAM": "North America",
      "JPN": "Asia",
      "JEY": "Europe",
      "JOR": "Asia",
      "KAZ": "Asia",
      "KEN": "Africa",
      "KIR": "Oceania",
      "KWT": "Asia",
      "KGZ": "Asia",
      "LAO": "Asia",
      "LVA": "Europe",
      "LBN": "Asia",
      "LSO": "Africa",
      "LBR": "Africa",
      "LBY": "Africa",
      "LIE": "Europe",
      "LTU": "Europe",
      "LUX": "Europe",
      "MDG": "Africa",
      "MWI": "Africa",
      "MYS": "Asia",
      "MDV": "Asia",
      "MLI": "Africa",
      "MLT": "Europe",
      "MHL": "Oceania",
      "MTQ": "North America",
      "MRT": "Africa",
      "MUS": "Africa",
      "MYT": "Africa",
      "MEX": "North America",
      "FSM": "Oceania",
      "MCO": "Europe",
      "MNG": "Asia",
      "MNE": "Europe",
      "MSR": "North America",
      "MAR": "Africa",
      "MOZ": "Africa",
      "NAM": "Africa",
      "NER": "Africa",
      "NGA": "Africa",
      "RWA": "Africa",
      "STP": "Africa",
      "SEN": "Africa",
      "SYC": "Africa",
      "SLE": "Africa",
      "SOM": "Africa",
      "ZAF": "Africa",
      "SSD": "Africa",
      "SDN": "Africa",
      "TZA": "Africa",
      "TGO": "Africa",
      "TUN": "Africa",
      "UGA": "Africa",
      "UKR": "Europe",
      "UMI": "Oceania",
      "URY": "Central/South America",
      "UZB": "Asia",
      "VUT": "Oceania",
      "VEN": "Central/South America",
      "VNM": "Asia",
      "WLF": "Oceania",
      "ESH": "Africa",
      "YEM": "Asia",
      "ZMB": "Africa",
      "ZWE": "Africa"
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try{
              const response = await fetch(`https://flutr.org:8282/api/orgs/view/${data}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
              },
              });
              response.json().then(json => {
                setLocationData(json.payload);
                setLoaded(true);
              });
            } catch (error) {
              console.error("Failed to fetch location:", error);
            } finally {
              
            }
            
          };
          const fetchStats = async () => {
            try{
              const response = await fetch(`https://flutr.org:8282/api/releases/inflight/${data}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
              },
              });
              response.json().then(json => {
                if(json.success){
                    setStats(json.payload);
                }
              });
            } catch (error) {
              console.error("Failed to fetch stats:", error);
            } finally {
              
            }
            
          };
          const fetchMost = async () => {
            try{
              const response = await fetch(`https://flutr.org:8282/api/stats/mostInFlight/${data}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
              },
              });
              response.json().then(json => {
                if(json.success){
                    setMost(json.payload);
                    
                }
              });
            } catch (error) {
              console.error("Failed to fetch most stats:", error);
            } finally {
            }
            
          };
          const fetchLeast = async () => {
            try{
              const response = await fetch(`https://flutr.org:8282/api/stats/leastInFlight/${data}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
              },
              });
              response.json().then(json => {
                if(json.success){
                    setLeast(json.payload);
                    
                }
              });
            } catch (error) {
              console.error("Failed to fetch least stats:", error);
            } finally {
            }
            
          };
          const fetchFamilies = async () => {
            try{
              const response = await fetch(`https://flutr.org:8282/api/stats/familyInflight/${data}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
              },
              });
              response.json().then(json => {
                if(json.success){
                  console.log(json.payload);
                  setFamilies(json.payload.filter(item => item.family));
                }
              });
            } catch (error) {
              console.error("Failed to fetch family stats:", error);
            } finally {
            }
            
          };
          const fetchContinents = async () => {
            try{
              const response = await fetch(`https://flutr.org:8282/api/stats/continentInflight/${data}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
              },
              });
              response.json().then(json => {
                if(json.success){
                    setContinents(json.payload);
                }
              });
            } catch (error) {
              console.error("Failed to fetch continent stats:", error);
            } finally {
            }
            
          };
        fetchData();
        fetchStats();
        fetchMost();
        fetchLeast();
        fetchFamilies();
        fetchContinents();
    }, []);
    const [insta, setInsta] = useState(false);
    const [fb, setFB] = useState(false);
    const [x, setX] = useState(false);
    const [yt, setYT] = useState(false);







  /*Map Stuff*/
  const geoUrl = "/map.json";
  

  function scaleValues(continents) {
    // Find the maximum value
    const maxVal = Math.max(...continents.map(item => item.totalInFlight));
  
    // Scale each value to a percentage of the maximum
    const scaledData = continents.map(item => ({
      continent: item.continent,
      percentage: item.totalInFlight / maxVal
    }));
  
    return scaledData;
  }

  const colorScale = scaleLinear()
  .domain([0, 1])
  .range(["#abd6ed", "#6393ad"]);


  function combineData(countryContinentMap, scaledData) {
    const combinedData = {};
  
    for (const [country, continent] of Object.entries(countryContinentMap)) {
      const matchingContinent = scaledData.find(item => item.continent === continent);
      if (matchingContinent) {
        combinedData[country] = matchingContinent.percentage;
      }
    }
  
    return combinedData;
  }



  const MapChart = () => {

  
     useEffect(() => {
      if(isInitialRender){
        const scaledValues = scaleValues(continents);
        const finalValues = combineData(countryContinentMap, scaledValues);
  
        setcontinentValues(scaledValues);
        setfinalContinentValues(finalValues); 

        setIsInitialRender(false);
      }
      
    }, [isInitialRender]);


  
    return (
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 100
        }}
        height={300}
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                 const countryId = geo.id;
                 const value = finalContinentValues[countryId] || 1;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colorScale(value)}
                  />
                );
              })
            }
          </Geographies>
      </ComposableMap>
    );
  };

  function ContinentItem({ continent, totalInFlight }) {
    return (
      <div style={{ textAlign: 'center', margin: '10px' }}>
        <p style={{color: locationData.colors[0]}}>{continent}</p>
        <p style={{color: locationData.colors[0]}}>{totalInFlight}</p>
      </div>
    );
  }

  function ContinentList({ continents }) {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {continents.map((continentData, index) => (
          <ContinentItem key={index} {...continentData} />
        ))}
      </div>
    );
  }



  /*End of Map Stuff*/





  const handleClose = () => {
    setInsta(false);
    setFB(false);
    setX(false);
    setYT(false);
  }
  const handleInsta = () => setInsta(true);
  const handleFB = () => setFB(true);
  const handleX = () => setX(true);
  const handleYT = () => setYT(true);
    const stats = {butterflyCount: 123, speciesCount: 45, highCount: 100, lowCount: 2, highSpecies: "Blue Morpho", lowSpecies: "Dan"}

  const chartOptions = {
    title: 'Families',
    pieHole: 0.4,
    // is3D: true,
    pieStartAngle: 100,
    sliceVisibilityThreshold: 0.02,
    lengend: {
      position: 'right',
      alignment: 'center',
      textStyle: {
        color: "#233238",
        fontSize: 14,
      },
    },
    colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
  }
  const COLORS = ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A","#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"];
  const datatest = [{ value: 1 }, { value: 1 }, { value: 1 }]; // Simple data

    if(loaded){
    return(
        <div style={{backgroundColor: locationData.colors[0]}}>
            <Navbar location={locationData} kioskMode={kioskMode}/>
            <PageTitle title={locationData.name + "'s Statistics"}/>
            <SocialModal show={insta} handleClose={handleClose} type={"Instagram"} link={locationData.socials.instagramLink}/>
            <SocialModal show={fb} handleClose={handleClose} type={"Facebook"} link={locationData.socials.facebookLink}/>
            <SocialModal show={x} handleClose={handleClose} type={"X"} link={locationData.socials.twitterLink}/>
            <SocialModal show={yt} handleClose={handleClose} type={"YouTube"} link={locationData.socials.youtubeLink}/>
                <div style={{width: "100%", backgroundColor: "#FFFFFF",margin: 'auto', paddingTop: "30px", paddingBottom: "30px"}}>
                    <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: locationData.colors[0]}}><strong>Statistics</strong></h2>
                </div>
                <div style={{backgroundColor: "#FFFFFF", borderRadius: "15px", width: "86.45%", margin: 'auto', marginTop: '16px'}}>
                    <Container style={{paddingTop: '20px'}}>
                        <Row style={{marginTop: '16px'}}>
                            <Col>
                                <div style={{width: '100%', margin: 'auto', textAlign: "center"}}>
                                    <h1 style={{color: locationData.colors[0]}}>{statData.totalInFlight}</h1>
                                    <h4 style={{color: locationData.colors[0]}}>butterflies in flight</h4>
                                </div>
                            </Col>
                            <Col>
                                <div style={{width: '100%', margin:'auto', textAlign: "center"}}>
                                    <h1 style={{color: locationData.colors[0]}}>{statData.speciesInFlight}</h1>
                                    <h4 style={{color: locationData.colors[0]}}>species in flight</h4>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                          <MapChart />
                        </Row>
                        <div>
                        <ContinentList continents={continents} />
                        </div>
                        <Row style={{marginTop: '15px'}}>
                          <Col><div style={{width: "100%", margin: 'auto', textAlign: 'center'}}><h4>Butterfly Family Breakdown</h4></div></Col>
                        </Row>
                        <Row>
                          <Col style={{ width: '100%', margin: 'auto' }}>
                            <div style={{ width: '100%', height: '300px', margin: 'auto', alignContent: 'center' }}>
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={families} 
                                    nameKey="family" 
                                    dataKey="totalInFlight" 
                                    cx="50%" 
                                    cy="50%" 
                                    outerRadius={100} 
                                    innerRadius={30} 
                                    label
                                  >
                                    {families.map((_, index) => (
                                      <Cell key={index} fill={COLORS[index]} />
                                    ))}
                                  </Pie>
                                  <Tooltip />
                                  <Legend
                                    // layout="vertical"  // Arrange items vertically
                                    // align="right"      // Align to the right
                                    // verticalAlign="middle" // Center vertically
                                    // wrapperStyle={{
                                    //   right: '5%',        // Push the legend to the right
                                    //   top: '50%',      // Align the legend vertically to the middle
                                    //   transform: 'translateY(-50%)', // Center the legend vertically in its container
                                    //   marginRight: '20px', // Adjust margin to bring it closer
                                    // }}
                                  />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                            <Col><div style={{width: "100%", margin: 'auto', textAlign: 'center'}}><h4>Current Populations</h4></div></Col>
                        </Row>
                        {/* <Row xs={1} sm={1} md={2} >
                            <Col style={{textAlign: 'center', alignItems: 'center'}}>
                              {most.imgWingsOpen !== null && <img style={{width: '50%', borderRadius: '10px'}} src={most.imgWingsOpen}/>}
                              <div style={{width: '100%',textAlign: "center", margin: 'auto'}}><div style={{width: '61.78%'}}><p>There are currently {most.noInFlight} of the {most.buttId} currently in flight, making them the most represented species in flight.</p></div></div>
                            </Col>
                            <Col style={{textAlign: 'center'}}>
                              {least.imgWingsOpen !== null && <img style={{width: '50%', borderRadius: '10px'}} src={least.imgWingsOpen}/>}
                              <div style={{width: '100%',textAlign: "center", margin: 'auto'}}><div style={{width: '61.78%'}}><p>There are only {least.noInFlight} of the {least.buttId} currently in flight. See if you can spot one!</p></div></div>
                            </Col>
                        </Row> */}
                        <Row xs={1} sm={1} md={2}>
  <Col style={{ textAlign: 'center', alignItems: 'center' }}>
    {most.imgWingsOpen !== null && (
      <img
        style={{ width: '50%', borderRadius: '10px', margin: 'auto' }}
        src={most.imgWingsOpen}
      />
    )}
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '61.78%' }}>
        <p>
          There are currently {most.noInFlight} of the <strong>{most.buttId}</strong> currently
          in flight, making them the most represented species in flight.
        </p>
      </div>
    </div>
  </Col>
  <Col style={{ textAlign: 'center', alignItems: 'center' }}>
    {least.imgWingsOpen !== null && (
      <img
        style={{ width: '50%', borderRadius: '10px', margin: 'auto' }}
        src={least.imgWingsOpen}
      />
    )}
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '61.78%' }}>
        <p>
          There are only {least.noInFlight} of the <strong>{least.buttId}</strong> currently in
          flight. See if you can spot one!
        </p>
      </div>
    </div>
  </Col>
</Row>
                    </Container>
                    <div style={{width: '100%', margin: 'auto'}}>
                        
                        
                    </div>
                </div>
                <Footer location={locationData} kioskMode={kioskMode} insta={handleInsta} facebook={handleFB} x={handleX} youtube={handleYT}/>
        </div>
    )}
}
