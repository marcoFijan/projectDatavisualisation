const ringRingDataset =
  "https://cors-anywhere.herokuapp.com/http://ringring.jorrr.nl/geojson-data-ringring.json";

//All datasets per hour
let filteredData0006;
let filteredData0607;
let filteredData0708;
let filteredData0809;
let filteredData0910;
let filteredData1011;
let filteredData1112;
let filteredData1213;
let filteredData1314;
let filteredData1415;
let filteredData1516;
let filteredData1617;
let filteredData1718;
let filteredData1819;
let filteredData1920;
let filteredData2021;
let filteredData2122;
let filteredData2223;
let filteredData2324;

// Unedited data
let rawData;

// mapboxgl.accessToken =
//   "pk.eyJ1IjoibWFyY29maWphbiIsImEiOiJja2pvN3N2ZHkwemE3MnRsOWRpb25pOTkyIn0.TsX82sLIJbvYddLYHphDbA";
// let map = new mapboxgl.Map({
//   container: "map",
//   style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
//   center: [4.89, 52.371], // starting position [lng, lat]
//   zoom: 12.8, // starting zoom
// });

// map.on("load", function () {
//   map.addSource("route", {
//     type: "geojson",
//     data:
//       "https://cors-anywhere.herokuapp.com/http://ringring.jorrr.nl/geojson-data-ringring.json",
//   });
//   map.addLayer({
//     id: "route",
//     type: "line",
//     source: "route",
//     layout: {
//       "line-join": "round",
//       "line-cap": "round",
//     },
//     paint: {
//       "line-color": "#be3027",
//       "line-width": 1,
//     },
//   });
// });

async function setupMapData() {
  rawData = await getData();
  filterListener();
  drawMap();
}

async function getData() {
  const response = await fetch(ringRingDataset);
  const json = await response.json();
  return await json;
}

function drawMap() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWFyY29maWphbiIsImEiOiJja2pvN3N2ZHkwemE3MnRsOWRpb25pOTkyIn0.TsX82sLIJbvYddLYHphDbA";
  let map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
    center: [4.89, 52.371], // starting position [lng, lat]
    zoom: 12.8, // starting zoom
  });

  map.on("load", function () {
    if (document.getElementById("00-06").checked) {
      drawMapLayer(map, filteredData0006, "0006", "#054488");
    }

    if (document.getElementById("06-07").checked) {
      drawMapLayer(map, filteredData0607, "0607", "#c42116");
    }

    if (document.getElementById("07-08").checked) {
      drawMapLayer(map, filteredData0708, "0708", "#c42116");
    }

    if (document.getElementById("08-09").checked) {
      drawMapLayer(map, filteredData0809, "0809", "#f48a14");
    }

    if (document.getElementById("09-10").checked) {
      drawMapLayer(map, filteredData0910, "0910", "#f48a14");
    }

    if (document.getElementById("10-11").checked) {
      drawMapLayer(map, filteredData1011, "1011", "#f48a14");
    }

    if (document.getElementById("11-12").checked) {
      drawMapLayer(map, filteredData1112, "1112", "#f48a14");
    }

    if (document.getElementById("12-13").checked) {
      drawMapLayer(map, filteredData1213, "1213", "#f48a14");
    }

    if (document.getElementById("13-14").checked) {
      drawMapLayer(map, filteredData1314, "1314", "#f48a14");
    }

    if (document.getElementById("14-15").checked) {
      drawMapLayer(map, filteredData1415, "1415", "#f48a14");
    }

    if (document.getElementById("15-16").checked) {
      drawMapLayer(map, filteredData1516, "1516", "#c42116");
    }

    if (document.getElementById("16-17").checked) {
      drawMapLayer(map, filteredData1617, "1617", "#c42116");
    }

    if (document.getElementById("17-18").checked) {
      drawMapLayer(map, filteredData1718, "1718", "#f48a14");
    }

    if (document.getElementById("18-19").checked) {
      drawMapLayer(map, filteredData1819, "1819", "#054488");
    }

    if (document.getElementById("19-20").checked) {
      drawMapLayer(map, filteredData1920, "1920", "#054488");
    }

    if (document.getElementById("20-21").checked) {
      drawMapLayer(map, filteredData2021, "2021", "#054488");
    }

    if (document.getElementById("21-22").checked) {
      drawMapLayer(map, filteredData2122, "2122", "#054488");
    }

    if (document.getElementById("22-23").checked) {
      drawMapLayer(map, filteredData2223, "2223", "#054488");
    }

    if (document.getElementById("23-24").checked) {
      drawMapLayer(map, filteredData2223, "2324", "#054488");
    }
  });
}

function drawMapLayer(map, filteredData, id, color) {
  map.addSource(id, {
    type: "geojson",
    data: filteredData,
  });
  map.addLayer({
    id: id,
    type: "line",
    source: id,
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": color,
      "line-width": 2.5,
      "line-opacity": 0.3,
    },
  });
}

function filterListener() {
  document.getElementById("00-06").addEventListener("change", filter0006);
  document.getElementById("06-07").addEventListener("change", filter0607);
  document.getElementById("07-08").addEventListener("change", filter0708);
  document.getElementById("08-09").addEventListener("change", filter0809);
  document.getElementById("09-10").addEventListener("change", filter0910);
  document.getElementById("10-11").addEventListener("change", filter1011);
  document.getElementById("11-12").addEventListener("change", filter1112);
  document.getElementById("12-13").addEventListener("change", filter1213);
  document.getElementById("13-14").addEventListener("change", filter1314);
  document.getElementById("14-15").addEventListener("change", filter1415);
  document.getElementById("15-16").addEventListener("change", filter1516);
  document.getElementById("16-17").addEventListener("change", filter1617);
  document.getElementById("17-18").addEventListener("change", filter1718);
  document.getElementById("18-19").addEventListener("change", filter1819);
  document.getElementById("19-20").addEventListener("change", filter1920);
  document.getElementById("20-21").addEventListener("change", filter2021);
  document.getElementById("21-22").addEventListener("change", filter2122);
  document.getElementById("22-23").addEventListener("change", filter2223);
  document.getElementById("23-24").addEventListener("change", filter2324);
  //   filter0006();
  //   filter0607();
}

function filterHour(hourStart, hourEnd) {
  // Navigate to features
  let features = rawData.features;
  // Filter the features on hour
  return features.filter((feature) => {
    let date = new Date(feature.properties.start); // Convert to Date
    let hour = date.getHours(); // Fetch hour of date
    if (hour >= hourStart && hour < hourEnd) {
      // Return feature if hour is included in filter
      return feature;
    }
  });
}

// Filter hours function: 00:00 - 06:00
function filter0006() {
  const filteredTime = filterHour(0, 6);
  // Create new GeoJson
  filteredData0006 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

// Filter hours function: 06:00 - 07:00
function filter0607() {
  const filteredTime = filterHour(6, 7);
  // Create new GeoJson
  filteredData0607 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

// Filter hours function: 07:00 - 08:00
function filter0708() {
  const filteredTime = filterHour(7, 8);
  // Create new GeoJson
  filteredData0708 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

function filter0809() {
  const filteredTime = filterHour(8, 9);
  // Create new GeoJson
  filteredData0809 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

function filter0910() {
  const filteredTime = filterHour(9, 10);
  // Create new GeoJson
  filteredData0910 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

function filter1011() {
  const filteredTime = filterHour(10, 11);
  // Create new GeoJson
  filteredData1011 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

function filter1112() {
  const filteredTime = filterHour(11, 12);
  // Create new GeoJson
  filteredData1112 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

function filter1213() {
  const filteredTime = filterHour(12, 13);
  // Create new GeoJson
  filteredData1213 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

function filter1314() {
  const filteredTime = filterHour(13, 14);
  // Create new GeoJson
  filteredData1314 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

function filter1415() {
  const filteredTime = filterHour(14, 15);
  // Create new GeoJson
  filteredData1415 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

function filter1516() {
  const filteredTime = filterHour(15, 16);
  // Create new GeoJson
  filteredData1516 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

function filter1617() {
  const filteredTime = filterHour(16, 17);
  // Create new GeoJson
  filteredData1617 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

function filter1718() {
  const filteredTime = filterHour(17, 18);
  // Create new GeoJson
  filteredData1718 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

function filter1819() {
  const filteredTime = filterHour(18, 19);
  // Create new GeoJson
  filteredData1819 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

function filter1920() {
  const filteredTime = filterHour(19, 20);
  // Create new GeoJson
  filteredData1920 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

function filter2021() {
  const filteredTime = filterHour(20, 21);
  // Create new GeoJson
  filteredData2021 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

function filter2122() {
  const filteredTime = filterHour(21, 22);
  // Create new GeoJson
  filteredData2122 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

function filter2223() {
  const filteredTime = filterHour(22, 23);
  // Create new GeoJson
  filteredData2223 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

function filter2324() {
  const filteredTime = filterHour(23, 24);
  // Create new GeoJson
  filteredData2324 = {
    type: "FeatureCollection",
    features: filteredTime,
  };
  // Draw map with the new GeoJson
  drawMap();
}

function goBack() {
  window.history.back();
}

setupMapData();
