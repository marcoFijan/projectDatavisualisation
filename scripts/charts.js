// URLs
const proxyURL = "https://cors-anywhere.herokuapp.com/";
const ringRingApi = "http://ringring.jorrr.nl/geojson-data-ringring.json";

// Lists
const typesOfDayList = ["weekend", "werkdagen"];
const daysList = [
  "Maandag",
  "Dinsdag",
  "Woensdag",
  "Donderdag",
  "Vrijdag",
  "Zaterdag",
  "Zondag",
];
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
// General
const svg = d3.select("svg");
let data;
let filteredData;
let pieChartData;
let cyclingRoutesPerDayData;
let g;

// Position & Size
const width = 700;
const height = 400;
const margin = { left: 70, right: 20, bottom: 100, top: 50 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Labels
let xAxisLabel = "Tijdstippen";
let chartLabel = "Fietsritten per tijdstip";

// Set yValues
let stackGenerator = d3
  .stack()
  .keys([
    "veryShortDistance",
    "shortDistance",
    "mediumDistance",
    "longDistance",
    "veryLongDistance",
  ]);

// Standard domain keys
const domainKeys = [
  "veryShortDistance",
  "shortDistance",
  "mediumDistance",
  "longDistance",
  "veryLongDistance",
];

// Standard range keys
const rangeKeys = ["#054488", "#026031", "#BE3027", "#792987", "#F48A14"];

// Editable domain keys
let filteredDomainKeys = [
  "veryShortDistance",
  "shortDistance",
  "mediumDistance",
  "longDistance",
  "veryLongDistance",
];

// Editable range keys
let filteredRangeKeys = ["#054488", "#026031", "#BE3027", "#792987", "#F48A14"];
let oldFilteredDomainKeys = [
  "veryShortDistance",
  "shortDistance",
  "mediumDistance",
  "longDistance",
  "veryLongDistance",
];

// Set xValues
const valueX = (d) => d.timeStamp;
const valueX2 = (d) => d.day;
let stackedBars;
//-- Scales --
let colorScale;
let scaleY;
let scaleX;

durationPerTimestamp = [];

// setup the data
function setupData() {
  // fetch the data with d3
  durationPerTimestamp = d3
    .json(proxyURL + ringRingApi)
    .then((ringRingFetchedData) => {
      // navigate to features
      const ringRingFeatures = ringRingFetchedData.features;

      // Create first simple datavisualisation
      amountCyclingRoutes(ringRingFeatures);
      amountCyclingDistance(ringRingFeatures);

      // Create object with daytypes - weekend or workday
      const typeOfDay = getTypeOfDay(ringRingFeatures);
      const typeOfDayCyclingRoutes = typesOfDayList.map((dayType) => {
        const filteredTypeOfDay = filterDaytype(typeOfDay, dayType);

        return {
          dayType: dayType,
          amountCyclingRoutes: getCycleRoutePerWeekend(
            filteredTypeOfDay,
            dayType
          ),
        };
      });

      // Add the day
      const days = getDays(ringRingFeatures);

      // Add the timestamp
      const timeStamps = getTimeStamp(days);
      const timeStampsAndDistance = getDistance(timeStamps);

      // Create object with days - monday, tuesday etc
      const cyclingRoutesPerDay = daysList.map((day) => {
        const filterDays = filterDay(timeStampsAndDistance, day);

        return {
          day: day,
          veryShortDistance: getVeryShortDistancePerTimestamp(filterDays),
          veryShortDistance: getVeryShortDistancePerTimestamp(filterDays),
          shortDistance: getShortDistancePerTimestamp(filterDays),
          mediumDistance: getMediumDistancePerTimestamp(filterDays),
          longDistance: getLongDistancePerTimestamp(filterDays),
          veryLongDistance: getVeryLongDistancePerTimestamp(filterDays),
        };
      });

      const distancePerTimestamp = timeStampsList.map((timeStamp) => {
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
      data = distancePerTimestamp;
      filteredData = distancePerTimestamp;
      pieChartData = typeOfDayCyclingRoutes;
      cyclingRoutesPerDayData = cyclingRoutesPerDay;
      console.log(ringRingFeatures);
      createDiagram();
      createPieChart();
    });
}

function amountCyclingRoutes(featuresData) {
  const amountBikeRoutes = document.querySelector(".amountBikeRoutes");
  const header = document.createElement("h3");
  const para = document.createElement("p");

  header.textContent = featuresData.length;
  para.textContent = "fietsritten in totaal";

  amountBikeRoutes.appendChild(header);
  amountBikeRoutes.appendChild(para);
}

function amountCyclingDistance(featuresData) {
  const totalDistance = featuresData.reduce((sum, route) => {
    return sum + route.properties.distance;
  }, 0);

  const amountDistance = document.querySelector(".amountDistance");
  const header = document.createElement("h3");
  const para = document.createElement("p");

  header.textContent = Math.round(totalDistance) + "km";
  para.textContent = "In totaal gefietst deze maand";

  amountDistance.appendChild(header);
  amountDistance.appendChild(para);
}

function filterTimestamp(timeStampsAndDurationArray, timeStamp) {
  return timeStampsAndDurationArray.filter((route) => {
    return route.timeStamp === timeStamp;
  });
}

function filterDaytype(typeOfDayList, typeOfDay) {
  return typeOfDayList.filter((day) => {
    return day === typeOfDay;
  });
}

function filterDay(dayList, dayName) {
  return dayList.filter((day) => {
    return day.day === dayName;
  });
}

function getDays(ringRingList) {
  return ringRingList.map((feature) => {
    const convertedData = new Date(feature.properties.start);
    const day = convertedData.getDay();
    let dayName;

    if (day === 1) {
      dayName = "Maandag";
    } else if (day === 2) {
      dayName = "Dinsdag";
    } else if (day === 3) {
      dayName = "Woensdag";
    } else if (day === 4) {
      dayName = "Donderdag";
    } else if (day === 5) {
      dayName = "Vrijdag";
    } else if (day === 6) {
      dayName = "Zaterdag";
    } else {
      dayName = "Zondag";
    }
    return {
      day: dayName,
      properties: feature.properties,
    };
  });
}

function getTypeOfDay(ringRingList) {
  return ringRingList.map((feature) => {
    const convertedData = new Date(feature.properties.start);
    const day = convertedData.getDay();
    let typeOfDay;
    if (day === 6 || day === 0) {
      typeOfDay = "weekend";
    } else {
      typeOfDay = "werkdagen";
    }
    return typeOfDay;
  });
}

function getCycleRoutePerWeekend(typeOfDayList, typeOfDay) {
  return typeOfDayList.reduce((sum, day) => {
    if (day === typeOfDay) {
      return sum + 1;
    }
    return sum;
  }, 0);
}

function getDistance(ringRingFeatures) {
  return ringRingFeatures.map((feature) => {
    const distance = feature.properties.distance;
    if (distance <= 1) {
      return {
        properties: feature.properties,
        timeStamp: feature.timeStamp,
        day: feature.day,
        distance: "veryShort",
      };
    } else if (distance > 1 && distance <= 2) {
      return {
        properties: feature.properties,
        timeStamp: feature.timeStamp,
        day: feature.day,
        distance: "short",
      };
    } else if (distance > 2 && distance <= 4) {
      return {
        properties: feature.properties,
        timeStamp: feature.timeStamp,
        day: feature.day,
        distance: "medium",
      };
    } else if (distance > 4 && distance <= 10) {
      return {
        properties: feature.properties,
        timeStamp: feature.timeStamp,
        day: feature.day,
        distance: "long",
      };
    } else {
      return {
        properties: feature.properties,
        timeStamp: feature.timeStamp,
        day: feature.day,
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
        day: feature.day,
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 6 && startTimestampInteger < 7) {
      return {
        timeStamp: "06:00-07:00",
        day: feature.day,
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 7 && startTimestampInteger < 8) {
      return {
        timeStamp: "07:00-08:00",
        day: feature.day,
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 8 && startTimestampInteger < 9) {
      return {
        timeStamp: "08:00-09:00",
        day: feature.day,
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 9 && startTimestampInteger < 10) {
      return {
        timeStamp: "09:00-10:00",
        day: feature.day,
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 10 && startTimestampInteger < 11) {
      return {
        timeStamp: "10:00-11:00",
        day: feature.day,
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 11 && startTimestampInteger < 12) {
      return {
        timeStamp: "11:00-12:00",
        day: feature.day,
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 12 && startTimestampInteger < 13) {
      return {
        timeStamp: "12:00-13:00",
        day: feature.day,
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 13 && startTimestampInteger < 14) {
      return {
        timeStamp: "13:00-14:00",
        day: feature.day,
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 14 && startTimestampInteger < 15) {
      return {
        timeStamp: "14:00-15:00",
        day: feature.day,
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 15 && startTimestampInteger < 16) {
      return {
        timeStamp: "15:00-16:00",
        day: feature.day,
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 16 && startTimestampInteger < 17) {
      return {
        timeStamp: "16:00-17:00",
        day: feature.day,
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 17 && startTimestampInteger < 18) {
      return {
        timeStamp: "17:00-18:00",
        day: feature.day,
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 18 && startTimestampInteger < 19) {
      return {
        timeStamp: "18:00-19:00",
        day: feature.day,
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 19 && startTimestampInteger < 20) {
      return {
        timeStamp: "19:00-20:00",
        day: feature.day,
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 20 && startTimestampInteger < 21) {
      return {
        timeStamp: "20:00-21:00",
        day: feature.day,
        properties: feature.properties,
      };
    } else if (startTimestampInteger >= 21 && startTimestampInteger < 24) {
      return {
        timeStamp: "21:00-24:00",
        day: feature.day,
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
  setColorScale();
  setScales(data, "Tijdsvak", "Aantal Fietsritten per tijdstip");
  setAxises();
  drawBar();
  checkInput();
}

function setColorScale() {
  colorScale = d3
    .scaleOrdinal()
    .domain([
      "veryShortDistance",
      "shortDistance",
      "mediumDistance",
      "longDistance",
      "veryLongDistance",
    ])
    .range(["#054488", "#026031", "#BE3027", "#792987", "#F48A14"]);
}

// Set the scales for the chart
function setScales(data) {
  // colorScale = d3
  //   .scaleOrdinal()
  //   .domain([
  //     "veryLongDistance",
  //     "shortDistance",
  //     "mediumDistance",
  //     "longDistance",
  //     "veryLongDistance",
  //   ])
  //   .range(["#F48A14", "#792987", "#BE3027", "#026031", "#054488"]);
  // colorScale = d3
  //   .scaleOrdinal()
  //   .domain(["shortDuration", "mediumDuration", "longDuration"])
  //   .range(["#F48A14", "#BE3027", "#054488"]);

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

function setScalesDays(data) {
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
    .domain(data.map(valueX2)) // Select all the provinces for the domain
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
    .text(xAxisLabel);

  g.append("text")
    .text(chartLabel)
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

// ## Check the filterInput
function checkInput() {
  // SOURCE FOR GENERAL IDEA FROM LAURENS AARNOUDSE: https://vizhub.com/Razpudding/c2a9c9b4fde84816931c404951c79873?edit=files&file=index.js
  // const bigBarFilter = d3.select("#filterBigBars").on("click", filterBigBars);
  const daysFilter = d3.select("#filterDays").on("click", filterOnDays);
  const veryShortFilter = d3
    .select("#filterVeryShortDistance")
    .on("click", filterVeryShortDistance);
  const shortFilter = d3
    .select("#filterShortDistance")
    .on("click", filterShortDistance);
  const mediumFilter = d3
    .select("#filterMediumDistance")
    .on("click", filterMediumDistance);
  const longFilter = d3
    .select("#filterLongDistance")
    .on("click", filterLongDistance);
  const veryLongFilter = d3
    .select("#filterVeryLongDistance")
    .on("click", filterVeryLongDistance);
}

// ## Update function for removing the bigest bar ##
// const filterBigBars = function () {
//   let filterOn = d3.select("#filterBigBars")._groups[0][0].checked;
//   console.log(filterOn);
//   if (filterOn) {
//     let total = 0;
//     data.forEach((route) => {
//       total =
//         total +
//         route.veryLongDistance +
//         route.longDistance +
//         route.mediumDistance +
//         route.shortDistance +
//         route.veryShortDistance;
//     });
//     let average = total / timeStampsList.length;

//     filteredData = data.filter((route) => {
//       const total =
//         route.veryLongDistance +
//         route.longDistance +
//         route.mediumDistance +
//         route.shortDistance +
//         route.veryShortDistance;
//       return total <= average;
//     });
//   } else {
//     filteredData = data;
//     console.log(d3.select("#filterUnknown")._groups[0][0].checked);
//     if (d3.select("#filterUnknown")._groups[0][0].checked) {
//       filterOnDays();
//     }
//     // checkInput()
//   }
//   updateBars();
// };

// ## Update function for removing the unknown province bar ##
function filterOnDays() {
  let filterOn = d3.select("#filterDays")._groups[0][0].checked;
  if (filterOn) {
    updateBarsDays();
  } else {
    updateBars();
  }
}

function filterVeryShortDistance() {
  let filterOn = d3.select("#filterVeryShortDistance")._groups[0][0].checked;
  if (filterOn) {
    let index = filteredDomainKeys.indexOf("veryShortDistance");
    if (index > -1) {
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
  } else {
    oldFilteredDomainKeys = filteredDomainKeys;
    filteredDomainKeys = domainKeys.map((key) => key);
    filteredRangeKeys = rangeKeys.map((key) => key);
    if (!oldFilteredDomainKeys.includes("shortDistance")) {
      let index = filteredDomainKeys.indexOf("veryShortDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
    if (!oldFilteredDomainKeys.includes("mediumDistance")) {
      let index = filteredDomainKeys.indexOf("mediumDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
    if (!oldFilteredDomainKeys.includes("longDistance")) {
      let index = filteredDomainKeys.indexOf("longDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
    if (!oldFilteredDomainKeys.includes("veryLongDistance")) {
      let index = filteredDomainKeys.indexOf("veryLongDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }

    // let index = filteredDomainKeys.indexOf("veryShortDistance")
  }
  colorScale = d3
    .scaleOrdinal()
    .domain(filteredDomainKeys)
    .range(filteredRangeKeys);

  stackGenerator = d3.stack().keys(filteredDomainKeys);
  stackedBars = stackGenerator(filteredData);

  let filterDays = d3.select("#filterDays")._groups[0][0].checked;
  if (filterDays) {
    updateBarsDays();
  } else {
    updateBars();
  }
}

function filterShortDistance() {
  let filterOn = d3.select("#filterShortDistance")._groups[0][0].checked;
  if (filterOn) {
    let index = filteredDomainKeys.indexOf("shortDistance");
    if (index > -1) {
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
  } else {
    oldFilteredDomainKeys = filteredDomainKeys;
    filteredDomainKeys = domainKeys.map((key) => key);
    filteredRangeKeys = rangeKeys.map((key) => key);
    if (!oldFilteredDomainKeys.includes("veryShortDistance")) {
      let index = filteredDomainKeys.indexOf("veryShortDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
    if (!oldFilteredDomainKeys.includes("mediumDistance")) {
      let index = filteredDomainKeys.indexOf("mediumDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
    if (!oldFilteredDomainKeys.includes("longDistance")) {
      let index = filteredDomainKeys.indexOf("longDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
    if (!oldFilteredDomainKeys.includes("veryLongDistance")) {
      let index = filteredDomainKeys.indexOf("veryLongDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }

    // let index = filteredDomainKeys.indexOf("veryShortDistance")
  }
  colorScale = d3
    .scaleOrdinal()
    .domain(filteredDomainKeys)
    .range(filteredRangeKeys);

  stackGenerator = d3.stack().keys(filteredDomainKeys);
  stackedBars = stackGenerator(filteredData);

  let filterDays = d3.select("#filterDays")._groups[0][0].checked;
  if (filterDays) {
    updateBarsDays();
  } else {
    updateBars();
  }
}

function filterMediumDistance() {
  let filterOn = d3.select("#filterMediumDistance")._groups[0][0].checked;
  if (filterOn) {
    let index = filteredDomainKeys.indexOf("mediumDistance");
    if (index > -1) {
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
  } else {
    oldFilteredDomainKeys = filteredDomainKeys.map((domain) => domain);
    filteredDomainKeys = domainKeys.map((key) => key);
    filteredRangeKeys = rangeKeys.map((key) => key);
    if (!oldFilteredDomainKeys.includes("veryShortDistance")) {
      let index = filteredDomainKeys.indexOf("veryShortDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
    if (!oldFilteredDomainKeys.includes("shortDistance")) {
      let index = filteredDomainKeys.indexOf("mediumDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
    if (!oldFilteredDomainKeys.includes("longDistance")) {
      let index = filteredDomainKeys.indexOf("longDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
    if (!oldFilteredDomainKeys.includes("veryLongDistance")) {
      let index = filteredDomainKeys.indexOf("veryLongDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }

    // let index = filteredDomainKeys.indexOf("veryShortDistance")
  }
  colorScale = d3
    .scaleOrdinal()
    .domain(filteredDomainKeys)
    .range(filteredRangeKeys);

  stackGenerator = d3.stack().keys(filteredDomainKeys);
  stackedBars = stackGenerator(filteredData);

  let filterDays = d3.select("#filterDays")._groups[0][0].checked;
  if (filterDays) {
    updateBarsDays();
  } else {
    updateBars();
  }
}

function filterLongDistance() {
  let filterOn = d3.select("#filterLongDistance")._groups[0][0].checked;
  if (filterOn) {
    let index = filteredDomainKeys.indexOf("longDistance");
    if (index > -1) {
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
  } else {
    oldFilteredDomainKeys = filteredDomainKeys;
    filteredDomainKeys = domainKeys.map((key) => key);
    filteredRangeKeys = rangeKeys.map((key) => key);
    if (!oldFilteredDomainKeys.includes("veryShortDistance")) {
      let index = filteredDomainKeys.indexOf("veryShortDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
    if (!oldFilteredDomainKeys.includes("mediumDistance")) {
      let index = filteredDomainKeys.indexOf("mediumDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
    if (!oldFilteredDomainKeys.includes("shortDistance")) {
      let index = filteredDomainKeys.indexOf("shortDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
    if (!oldFilteredDomainKeys.includes("veryLongDistance")) {
      let index = filteredDomainKeys.indexOf("veryLongDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }

    // let index = filteredDomainKeys.indexOf("veryShortDistance")
  }
  colorScale = d3
    .scaleOrdinal()
    .domain(filteredDomainKeys)
    .range(filteredRangeKeys);

  stackGenerator = d3.stack().keys(filteredDomainKeys);
  stackedBars = stackGenerator(filteredData);

  let filterDays = d3.select("#filterDays")._groups[0][0].checked;
  if (filterDays) {
    updateBarsDays();
  } else {
    updateBars();
  }
}

function filterVeryLongDistance() {
  let filterOn = d3.select("#filterVeryLongDistance")._groups[0][0].checked;
  if (filterOn) {
    let index = filteredDomainKeys.indexOf("veryLongDistance");
    if (index > -1) {
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
  } else {
    oldFilteredDomainKeys = filteredDomainKeys;
    filteredDomainKeys = domainKeys.map((key) => key);
    filteredRangeKeys = rangeKeys.map((key) => key);
    if (!oldFilteredDomainKeys.includes("veryShortDistance")) {
      let index = filteredDomainKeys.indexOf("veryShortDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
    if (!oldFilteredDomainKeys.includes("mediumDistance")) {
      let index = filteredDomainKeys.indexOf("mediumDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
    if (!oldFilteredDomainKeys.includes("longDistance")) {
      let index = filteredDomainKeys.indexOf("longDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }
    if (!oldFilteredDomainKeys.includes("shortDistance")) {
      let index = filteredDomainKeys.indexOf("shortDistance");
      filteredDomainKeys.splice(index, 1);
      filteredRangeKeys.splice(index, 1);
    }

    // let index = filteredDomainKeys.indexOf("veryShortDistance")
  }
  colorScale = d3
    .scaleOrdinal()
    .domain(filteredDomainKeys)
    .range(filteredRangeKeys);

  stackGenerator = d3.stack().keys(filteredDomainKeys);
  stackedBars = stackGenerator(filteredData);

  let filterDays = d3.select("#filterDays")._groups[0][0].checked;
  if (filterDays) {
    updateBarsDays();
  } else {
    updateBars();
  }
}

// ## General update function ##
function updateBars() {
  stackedBars = stackGenerator(filteredData);
  setScales(filteredData);

  // Save the layers and collection of bars into variables
  const layers = svg
    .selectAll(".layer")
    .data(stackedBars)
    .attr("fill", (d) => colorScale(d.key));
  const bars = layers.selectAll("rect").data((d) => d);

  // Create new layers with retangles
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
  layers.exit().remove();

  // Call the x-axis
  const callXAxis = svg.select(".xAxis").call(d3.axisBottom(scaleX));

  callXAxis
    .selectAll(".tick>text")
    .attr("transform", "rotate(55)")
    .attr("text-anchor", "start");

  callXAxis.selectAll(".domain, .tick line").remove();

  // Call the y-axis
  svg.select(".yAxis").call(d3.axisLeft(scaleY).tickSize(-innerWidth));
}

function updateBarsDays() {
  stackedBars = stackGenerator(cyclingRoutesPerDayData);
  setScalesDays(cyclingRoutesPerDayData);

  // Save the layers and collection of bars into variables
  const layers = svg
    .selectAll(".layer")
    .data(stackedBars)
    .attr("fill", (d) => colorScale(d.key));
  const bars = layers.selectAll("rect").data((d) => d);

  // Create new layers
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
    .attr("x", (d) => scaleX(d.data.day))
    .attr("y", (d) => scaleY(d[1]))
    .attr("width", scaleX.bandwidth())
    .attr("height", 0) // set height 0 for the transition
    .transition()
    .duration(800)
    .attr("height", (d) => scaleY(d[0]) - scaleY(d[1]));

  // Update the layers and rectangles
  bars
    .attr("x", (d) => scaleX(d.data.day))
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
    .attr("x", (d) => scaleX(d.data.day))
    .attr("y", (d) => scaleY(d[1]))
    .attr("width", scaleX.bandwidth())
    .attr("height", 0) // set height 0 for the transition
    .transition()
    .duration(800)
    .attr("height", (d) => scaleY(d[0]) - scaleY(d[1]));

  // Remove non existing retangles
  bars.exit().remove();
  layers.exit().remove();

  // Call the x-axis
  const callXAxis = svg.select(".xAxis").call(d3.axisBottom(scaleX));

  callXAxis
    .selectAll(".tick>text")
    .attr("transform", "rotate(55)")
    .attr("text-anchor", "start");

  callXAxis.selectAll(".domain, .tick line").remove();

  // Call the y-axis
  svg.select(".yAxis").call(d3.axisLeft(scaleY).tickSize(-innerWidth));
}

// CREATE THE PIECHART FUNCTION
function createPieChart() {
  // SOURCE FOR CODE: http://kodhus.com/kodnest/codify/2484651f86b34e8cda4e80100e7b06f2/layout/1

  // select the svg
  const pieChartSVG = d3.select(".weekendChart"),
    width = svg.attr("width"),
    height = svg.attr("height");

  // set radius
  const radius = 120;

  // create group element
  const g = pieChartSVG
    .append("g")
    .attr("transform", `translate(${250 / 2}, ${250 / 2})`);

  // set colorscale
  const color = d3.scaleOrdinal(["#d87a73", "#c05048"]);

  // set the data and turn sorting off
  const pie = d3
    .pie()
    .sort(null)
    .value((d) => d.amountCyclingRoutes);

  // set the radius of the chart
  const path = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(radius - 40);

  // position the label
  const label = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(radius - 20);

  // data join the piechart
  const pies = g
    .selectAll(".arc")
    .data(pie(pieChartData))
    .enter()
    .append("g")
    .attr("class", "arc");

  // fill the paths
  pies
    .append("path")
    .attr("d", path)
    .attr("fill", (d) => color(d.data.amountCyclingRoutes));

  // position labels
  pies
    .append("text")
    .attr("transform", function (d) {
      return `translate(${label.centroid(d)})`;
    })
    .text((d) => d.data.dayType);
}

// FUNCTION TO NAVIGATE TO PREVIOUS PAGE
function goBack() {
  window.history.back();
}

// RUN THE MAIN FUNCTION
setupData();
