// const proxyUrl = "https://cors-anywhere.herokuapp.com/";
// const url = "../resources/export-details-amsterdam-binnenring.json";

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
let shortDuration = [];
let mediumDuration = [];
let longDuration = [];

function setupData() {
  const ringRingRawData = d3
    .json(proxyURL + ringRingApi)
    .then((ringRingFetchedData) => {
      console.log("done");
      const ringRingFeatures = ringRingFetchedData[0].features;
      console.log(ringRingFeatures);
      durationInMinutes(ringRingFeatures);
      const timeStamps = getTimeStamp(ringRingFeatures);
      console.log(timeStamps);
      createDiagram();
    });
}

function durationInMinutes(ringRingFeatures) {
  ringRingFeatures.forEach((feature) => {
    const duration = feature.properties.duration;
    if (duration <= 5) {
      shortDuration.push(feature);
    } else if (duration > 5 && duration <= 30) {
      mediumDuration.push(feature);
    } else {
      longDuration.push(feature);
    }
  });
}

function getTimeStamp(ringRingFeatures) {
  return ringRingFeatures.map((feature) => {
    const startTime = feature.properties.start;
    const startTimestamp = startTime.substr(11, 2);
    const startTimestampInteger = parseInt(startTimestamp, 10);
    console.log(startTimestampInteger);
    if (startTimestampInteger >= 00 && startTimestampInteger < 2) {
      return "00:00-02:00";
    } else if (startTimestampInteger >= 2 && startTimestampInteger < 6) {
      return "02:00-06:00";
    } else if (startTimestampInteger >= 6 && startTimestampInteger < 8) {
      return "06:00-08:00";
    } else if (startTimestampInteger >= 8 && startTimestampInteger < 10) {
      return "08:00-10:00";
    } else if (startTimestampInteger >= 10 && startTimestampInteger < 12) {
      return "10:00-12:00";
    } else if (startTimestampInteger >= 12 && startTimestampInteger < 14) {
      return "12:00-14:00";
    } else if (startTimestampInteger >= 14 && startTimestampInteger < 16) {
      return "14:00-16:00";
    } else if (startTimestampInteger >= 16 && startTimestampInteger < 18) {
      return "16:00-18:00";
    } else if (startTimestampInteger >= 18 && startTimestampInteger < 20) {
      return "18:00-20:00";
    } else if (startTimestampInteger >= 20 && startTimestampInteger < 22) {
      return "20:00-22:00";
    } else if (startTimestampInteger >= 22 && startTimestampInteger < 24) {
      return "22:00-24:00";
    }
  });
}

function createDiagram() {
  const svg = d3.select("svg");
  const g = svg.append("g");
}

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
