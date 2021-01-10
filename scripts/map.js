mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyY29maWphbiIsImEiOiJja2pvN3N2ZHkwemE3MnRsOWRpb25pOTkyIn0.TsX82sLIJbvYddLYHphDbA";
let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  center: [4.89, 52.371], // starting position [lng, lat]
  zoom: 12.8, // starting zoom
});
