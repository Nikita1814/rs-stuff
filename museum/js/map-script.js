mapboxgl.accessToken = 'pk.eyJ1Ijoic2luZW5vbWluZSIsImEiOiJja3VoYWdtMHMwYXl6Mm9vemNkcnV1NG1hIn0.P1aMX8bp5Zcz1N8cxoBh2g'

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom:16,
    center: [2.336374, 48.860914]

})


let marker1 = new mapboxgl.Marker({color: 'black'})
.setLngLat([2.336374, 48.860914])
.addTo(map);

let marker2 = new mapboxgl.Marker({color: 'grey'})
.setLngLat([2.339707, 48.860691])
.addTo(map);

let marker3 = new mapboxgl.Marker({color: 'gray'})
.setLngLat([2.336517, 48.862525])
.addTo(map);

let marker4 = new mapboxgl.Marker({color: 'gray'})
.setLngLat([2.333276, 48.860203])
.addTo(map);

let marker5 = new mapboxgl.Marker({color: 'gray'})
.setLngLat([ 2.333049, 48.861936])
.addTo(map);
