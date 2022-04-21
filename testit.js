const merkki = new google.maps.Marker({
  position: new google.maps.LatLng(tiedot.features[i].properties.y, tiedot.features[i].properties.x),
  title: tiedot.features[i].properties.Nimi + '\n' + 'Osoite: ' + tiedot.features[i].properties.Osoite + '\n' + 'Kapasiteetti: ' + tiedot.features[i].properties.Kapasiteet,
  map: map
});