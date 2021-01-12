// const proxyUrl = "https://cors-anywhere.herokuapp.com/";
// const url = "../resources/export-details-amsterdam-binnenring.json";

// const { timeStamp } = require("console");

// let data = [];

// async function setupData() {
//   data = await getData();
//   console.log(data);
//   return data;
// }

// async function getData() {
//   const response = await fetch(proxyUrl + url);
//   console.log(response);
//   const json = await response.json();
//   return await json;
// }

// setupData();
const proxyURL = "https://cors-anywhere.herokuapp.com/";
const ringRingApi = "http://ringring.jorrr.nl/geojson-data-ringring.json";
const timeStampsList = [
  "00:00-06:00",
  "06:00-07:00",
  "07:00-08:00",
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
  "17:00-18:00",
  "18:00-19:00",
  "19:00-20:00",
  "20:00-21:00",
  "21:00-24:00",
];

//## SET D3 VARIABLES ##
//-- General --
const svg = d3.select("svg");
let data;
let filteredData;
let g;
//-- Position & Size --
const width = 500;
const height = 400;
const margin = { left: 70, right: 20, bottom: 100, top: 50 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
//-- Y & X Values --
const stackGenerator = d3
  .stack()
  .keys([
    "veryShortDistance",
    "shortDistance",
    "mediumDistance",
    "longDistance",
    "veryLongDistance",
  ]);
const valueX = (d) => d.timeStamp; // d.data.province
let stackedBars;
//-- Scales --
let colorScale;
let scaleY;
let scaleX;

durationPerTimestamp = [];

function setupData() {
  durationPerTimestamp = d3
    .json(proxyURL + ringRingApi)
    .then((ringRingFetchedData) => {
      console.log(ringRingFetchedData);
      const ringRingFeatures = ringRingFetchedData.features;
      console.log(ringRingFeatures);
      const timeStamps = getTimeStamp(ringRingFeatures);
      // const timeStampsAndDuration = getDurationInMinutes(timeStamps);
      const timeStampsAndDistance = getDistance(timeStamps);
      console.log(timeStampsAndDistance);
      const durationPerTimestamp = timeStampsList.map((timeStamp) => {
        const filteredTimestamp = filterTimestamp(
          timeStampsAndDistance,
          timeStamp
        );
        return {
          timeStamp: timeStamp,
          veryShortDistance: getVeryShortDistancePerTimestamp(
            filteredTimestamp
          ),
          veryShortDistance: getVeryShortDistancePerTimestamp(
            filteredTimestamp
          ),
          shortDistance: getShortDistancePerTimestamp(filteredTimestamp),
          mediumDistance: getMediumDistancePerTimestamp(filteredTimestamp),
          longDistance: getLongDistancePerTimestamp(filteredTimestamp),
          veryLongDistance: getVeryLongDistancePerTimestamp(filteredTimestamp),
        };
      });
      data = durationPerTimestamp;
      filteredData = durationPerTimestamp;
      console.log(data);
      createDiagram();
      initMap(ringRingFetchedData);
    });
}

function filterTimestamp(timeStampsAndDurationArray, timeStamp) {
  return timeStampsAndDurationArray.filter((route) => {
    return route.timeStamp === timeStamp;
  });
}

// function getShortDurationPerTimestamp(timeStampsAndDurationArray) {
//   return timeStampsAndDurationArray.reduce((sum, route) => {
//     if (route.duration === "short") {
//       return sum + 1;
//     }
//     return sum;
//   }, 0);
// }

// function getMediumDurationPerTimestamp(timeStampsAndDurationArray) {
//   return timeStampsAndDurationArray.reduce((sum, route) => {
//     if (route.duration === "medium") {
//       return sum + 1;
//     }
//     return sum;
//   }, 0);
// }

// function getLongDurationPerTimestamp(timeStampsAndDurationArray) {
//   return timeStampsAndDurationArray.reduce((sum, route) => {
//     if (route.duration === "long") {
//       return sum + 1;
//     }
//     return sum;
//   }, 0);
// }

// function getAverageDistance(timeStamp, timeStampsList) {
//   const currentTimeStampCollection = timeStampsList.filter(
//     (feature) => feature.timeStamp === timeStamp
//   );
//   const totalDistance = currentTimeStampCollection.reduce((sum, route) => {
//     return sum + route.properties.distance;
//   }, 0);
//   averageDistance = totalDistance / currentTimeStampCollection.length;
//   if (isNaN(averageDistance)) {
//     averageDistance = 0;
//   }
//   return averageDistance;
// }

// function getDurationInMinutes(ringRingFeatures) {
//   return ringRingFeatures.map((feature) => {
//     const duration = feature.properties.duration;
//     if (duration <= 5) {
//       return {
//         properties: feature.properties,
//         timeStamp: feature.timeStamp,
//         duration: "short",
//       };
//     } else if (duration > 5 && duration <= 30) {
//       return {
//         properties: feature.properties,
//         timeStamp: feature.timeStamp,
//         duration: "medium",
//       };
//     } else {
//       return {
//         properties: feature.properties,
//         timeStamp: feature.timeStamp,
//         duration: "long",
//       };
//     }
//   });
// }

function getDistance(ringRingFeatures) {
  return ringRingFeatures.map((feature) => {
    const distance = feature.properties.distance;
    if (distance <= 1) {
      return {
        properties: feature.properties,
        timeStamp: feature.timeStamp,
        distance: "veryShort",
      };
    } else if (distance > 1 && distance <= 2) {
      return {
        properties: feature.properties,
        timeStamp: feature.timeStamp,
        distance: "short",
      };
    } else if (distance > 2 && distance <= 4) {
      return {
        properties: feature.properties,
        timeStamp: feature.timeStamp,
        distance: "medium",
      };
    } else if (distance > 4 && distance <= 10) {
      return {
        properties: feature.properties,
        timeStamp: feature.timeStamp,
        distance: "long",
      };
    } else {
      return {
        properties: feature.properties,
        timeStamp: feature.timeStamp,
        distance: "veryLong",
      };
    }
  });
}

function getVeryShortDistancePerTimestamp(timeStampsAndDistanceArray) {
  return timeStampsAndDistanceArray.reduce((sum, route) => {
    if (route.distance === "veryShort") {
      return sum + 1;
    }
    return sum;
  }, 0);
}

function getShortDistancePerTimestamp(timeStampsAndDistanceArray) {
  return timeStampsAndDistanceArray.reduce((sum, route) => {
    if (route.distance === "short") {
      return sum + 1;
    }
    return sum;
  }, 0);
}

function getMediumDistancePerTimestamp(timeStampsAndDistanceArray) {
  return timeStampsAndDistanceArray.reduce((sum, route) => {
    if (route.distance === "medium") {
      return sum + 1;
    }
    return sum;
  }, 0);
}

function getLongDistancePerTimestamp(timeStampsAndDistanceArray) {
  return timeStampsAndDistanceArray.reduce((sum, route) => {
    if (route.distance === "long") {
      return sum + 1;
    }
    return sum;
  }, 0);
}

function getVeryLongDistancePerTimestamp(timeStampsAndDistanceArray) {
  return timeStampsAndDistanceArray.reduce((sum, route) => {
    if (route.distance === "veryLong") {
      return sum + 1;
    }
    return sum;
  }, 0);
}

function getTimeStamp(ringRingFeatures) {
  return ringRingFeatures.map((feature) => {
    const startTime = feature.properties.start;
    const startTimestamp = startTime.substr(11, 2);
    const startTimestampInteger = parseInt(startTimestamp, 10);
    if (startTimestampInteger >= 00 && startTimestampInteger < 6) {
      return {
        timeStamp: "00:00-06:00",
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 6 && startTimestampInteger < 7) {
      return {
        timeStamp: "06:00-07:00",
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 7 && startTimestampInteger < 8) {
      return {
        timeStamp: "07:00-08:00",
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 8 && startTimestampInteger < 9) {
      return {
        timeStamp: "08:00-09:00",
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 9 && startTimestampInteger < 10) {
      return {
        timeStamp: "09:00-10:00",
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 10 && startTimestampInteger < 11) {
      return {
        timeStamp: "10:00-11:00",
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 11 && startTimestampInteger < 12) {
      return {
        timeStamp: "11:00-12:00",
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 12 && startTimestampInteger < 13) {
      return {
        timeStamp: "12:00-13:00",
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 13 && startTimestampInteger < 14) {
      return {
        timeStamp: "13:00-14:00",
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 14 && startTimestampInteger < 15) {
      return {
        timeStamp: "14:00-15:00",
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 15 && startTimestampInteger < 16) {
      return {
        timeStamp: "15:00-16:00",
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 16 && startTimestampInteger < 17) {
      return {
        timeStamp: "16:00-17:00",
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 17 && startTimestampInteger < 18) {
      return {
        timeStamp: "17:00-18:00",
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 18 && startTimestampInteger < 19) {
      return {
        timeStamp: "18:00-19:00",
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 19 && startTimestampInteger < 20) {
      return {
        timeStamp: "19:00-20:00",
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 20 && startTimestampInteger < 21) {
      return {
        timeStamp: "20:00-21:00",
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 21 && startTimestampInteger < 24) {
      return {
        timeStamp: "21:00-24:00",
        properties: feature.properties,
      };
    }
  });
}

function createDiagram() {
  const svg = d3.select(".durationChart");
  g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Define d3 variables
  stackedBars = stackGenerator(filteredData);

  // Create Diagram
  setScales(data);
  setAxises();
  drawBar();
  checkInput();
}

// Set the scales for the chart
function setScales(data) {
  colorScale = d3
    .scaleOrdinal()
    .domain(["shortDuration", "mediumDuration", "longDuration"])
    .range(["#F48A14", "#BE3027", "#054488"]);

  scaleY = d3
    .scaleLinear()
    .domain([
      d3.max(stackedBars, (layer) => d3.max(layer, (subLayer) => subLayer[1])),
      0,
    ])
    .range([0, innerHeight])
    .nice();

  scaleX = d3
    .scaleBand()
    .domain(data.map(valueX)) // Select all the provinces for the domain
    .range([0, innerWidth])
    .padding(0.3);
}

// Set the axisses for the chart
function setAxises() {
  const yAxis = d3.axisLeft(scaleY).tickSize(-innerWidth);

  const xAxis = d3.axisBottom(scaleX);

  const yAxisGroup = g.append("g").call(yAxis).attr("class", "yAxis");

  yAxisGroup.select(".domain").remove();

  yAxisGroup
    .append("text")
    .attr("y", -50)
    .attr("x", -(innerHeight / 2))
    .attr("transform", "rotate(-90)")
    .attr("class", "yAxisName")
    .text("Aantal fietsritten");

  const xAxisGroup = g
    .append("g")
    .call(xAxis)
    .attr("transform", "translate(0," + innerHeight + ")")
    .attr("class", "xAxis");

  xAxisGroup
    .selectAll("text")
    .attr("transform", "rotate(55)")
    .attr("text-anchor", "start");

  xAxisGroup.selectAll(".domain, .tick line").remove();

  xAxisGroup
    .append("text")
    .attr("y", 80)
    .attr("x", innerWidth / 2)
    .attr("class", "xAxisName")
    .text("Tijdsvak");

  g.append("text")
    .text("Aantal fietsritten per tijdsvlak")
    .attr("y", -20)
    .attr("x", innerWidth / 2)
    .attr("text-anchor", "middle")
    .attr("class", "title");
}

// Draw the rectangles
function drawBar() {
  g.selectAll(".layer")
    .data(stackedBars)
    .enter()
    .append("g")
    .attr("class", "layer")
    .attr("fill", (d) => colorScale(d.key))
    .selectAll("rect")
    .data((d) => d)
    .enter()
    .append("rect")
    .attr("x", (d) => scaleX(d.data.timeStamp))
    .attr("y", (d) => scaleY(d[1]))
    .attr("width", scaleX.bandwidth())
    .attr("height", 0) // set height 0 for the transition
    .transition()
    .duration(800)
    .attr("height", (d) => scaleY(d[0]) - scaleY(d[1]));
}

const checkInput = function () {
  // SOURCE FOR GENERAL IDEA FROM LAURENS AARNOUDSE: https://vizhub.com/Razpudding/c2a9c9b4fde84816931c404951c79873?edit=files&file=index.js
  const bigBarFilter = d3.select("#filterBigBars").on("click", filterBigBars);
  const unknownFilter = d3
    .select("#filterUnknown")
    .on("click", filterUnknownProvince);
};

// ## Update function for removing the bigest bar ##
const filterBigBars = function () {
  let filterOn = d3.select("#filterBigBars")._groups[0][0].checked;
  console.log(filterOn);
  if (filterOn) {
    let total = 0;
    data.forEach((route) => {
      total =
        total + route.longDuration + route.mediumDuration + route.shortDuration;
    });
    let average = total / timeStampsList.length;

    filteredData = data.filter((route) => {
      const total =
        route.shortDuration + route.mediumDuration + route.longDuration;
      return total <= average;
    });
  } else {
    filteredData = data;
    if (d3.select("#filterUnknown")._groups[0][0].checked) {
      filterUnknownProvince();
    }
    // checkInput()
  }
  updateBars();
};

// ## Update function for removing the unknown province bar ##
const filterUnknownProvince = function () {
  let filterOn = d3.select("#filterUnknown")._groups[0][0].checked;
  if (filterOn) {
    filteredData = filteredData.filter(
      (province) => province.province !== "onbekend"
    ); // return array without that highestCapacity
    console.log("filter", filteredData);
  } else {
    filteredData = data;
    if (d3.select("#filterBigBars")._groups[0][0].checked) {
      filterBigBars();
    }
    // checkInput()
  }
  updateBars();
};

// ## General update function ##
const updateBars = function () {
  stackedBars = stackGenerator(filteredData);
  setScales(filteredData);

  // Save the layers and collection of bars into variables
  const layers = svg.selectAll(".layer").data(stackedBars);
  const bars = layers.selectAll("rect").data((d) => d);

  // Update the layers and rectangles
  bars
    .attr("x", (d) => scaleX(d.data.timeStamp))
    .attr("y", (d) => scaleY(d[1]))
    .attr("width", scaleX.bandwidth())
    .attr("height", 0) // set height 0 for the transition
    .transition()
    .duration(800)
    .attr("height", (d) => scaleY(d[0]) - scaleY(d[1]));

  // Create new rectangles inside the layers
  bars
    .enter()
    .append("rect")
    .attr("x", (d) => scaleX(d.data.timeStamp))
    .attr("y", (d) => scaleY(d[1]))
    .attr("width", scaleX.bandwidth())
    .attr("height", 0) // set height 0 for the transition
    .transition()
    .duration(800)
    .attr("height", (d) => scaleY(d[0]) - scaleY(d[1]));

  // Remove non existing retangles
  bars.exit().remove();

  // Call the x-axis
  const callXAxis = svg.select(".xAxis").call(d3.axisBottom(scaleX));

  callXAxis
    .selectAll(".tick>text")
    .attr("transform", "rotate(55)")
    .attr("text-anchor", "start");

  callXAxis.selectAll(".domain, .tick line").remove();

  // Call the y-axis
  svg.select(".yAxis").call(d3.axisLeft(scaleY).tickSize(-innerWidth));
};

setupData();

// const svg = d3.select("svg");
// const g = svg.append("g");
// const projection = d3.geoMercator().center([5, 52.35]).scale(70000); //

// const pathGenerator = d3.geoPath().projection(projection); // convert datapath into svg stringpath

// d3.json("https://cartomap.github.io/nl/wgs84/gemeente_2020.topojson").then(
//   (data) => {
//     const community = topojson.feature(data, data.objects.gemeente_2020); //import the general data and the communities from the data while converting the topojson

//     g.selectAll("path")
//       .data(community.features)
//       .enter()
//       .append("path")
//       .attr("d", pathGenerator)
//       .attr("fill", (d) => {
//         if (d.properties.statnaam == "Amsterdam") {
//           return "#DADADA";
//         } else {
//           return "#F6F6F6";
//         }
//       })
//       .attr("stroke", "black")
//       .attr("stroke-width", 0.5)
//       .append("title")
//       .text((d) => d.properties.statnaam);
//   }
// );

let map;

function initMap(geoJson) {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 0, lng: 0 },
  });
  map.data.loadGeoJson(
    "https://cors-anywhere.herokuapp.com/http://ringring.jorrr.nl/geojson-data-ringring.json"
  );
}

function goBack() {
  window.history.back();
}
