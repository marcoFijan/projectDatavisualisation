const ringRingDataset =
  "https://cors-anywhere.herokuapp.com/http://ringring.jorrr.nl/geojson-data-ringring.json";

async function setupMapData() {
  let rawData = await getData();
  drawMap(rawData);
}

async function getData() {
  const response = await fetch(ringRingDataset);
  const json = await response.json();
  return await json;
}

function drawMap(fetchedRingRingData) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWFyY29maWphbiIsImEiOiJja2pvN3N2ZHkwemE3MnRsOWRpb25pOTkyIn0.TsX82sLIJbvYddLYHphDbA";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [4.89, 52.371], // starting position [lng, lat]
    zoom: 12.8, // starting zoom
  });

  map.on("load", function () {
    map.addSource("route", {
      type: "geojson",
      data: fetchedRingRingData,
    });
    map.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#c42116",
        "line-width": 2,
      },
    });
  });
}

setupMapData();
