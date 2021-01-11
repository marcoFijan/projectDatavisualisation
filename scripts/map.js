mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyY29maWphbiIsImEiOiJja2pvN3N2ZHkwemE3MnRsOWRpb25pOTkyIn0.TsX82sLIJbvYddLYHphDbA";
let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  center: [4.89, 52.371], // starting position [lng, lat]
  zoom: 12.8, // starting zoom
});

map.on("load", function () {
  map.addSource("route", {
    type: "geojson",
    data:
      "https://cors-anywhere.herokuapp.com/http://ringring.jorrr.nl/geojson-data-ringring.json",
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
      "line-color": "#be3027",
      "line-width": 1,
    },
  });
});