
async function initMap() {
  try{

    const map = new google.maps.Map(document.getElementById("map"), {
      mapTypeId: 'hybrid',
      zoom: 14,
      controlSize: 32,
      options: {
        gestureHandling: 'greedy'
      }
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const locationMark = 'img/redMarker.png';

        const merkki = new google.maps.Marker({
          position: new google.maps.LatLng(pos),
          icon: locationMark,
          map: map
        });

        const popupIkkuna = new google.maps.InfoWindow({
          content: '<h3>Olet tässä</h3>'
        });

        merkki.addListener("mouseover", () => {
          popupIkkuna.open({
            anchor: merkki,
            map,
            shouldFocus: false,
          });
        });

        merkki.addListener("mouseout", () => {
          popupIkkuna.close({
            anchor: merkki,
            map,
            shouldFocus: false,
          });
        });

        map.setCenter(pos);
      });

    const vastaus = await fetch('data/asemat.geojson');
    if (!vastaus.ok) throw new Error('Hups, joku hajosi');
    const asemat = await vastaus.json();

    console.log('KaupunkipyoraAsemat', asemat);

    for (let i = 0; i < asemat.features.length; i++) {

      const stationMark = 'img/stationMarker.png';

      const merkki = new google.maps.Marker({
        position: new google.maps.LatLng(asemat.features[i].properties.y, asemat.features[i].properties.x),
        icon: stationMark,
        map: map
      });

      const asemanTiedot =
        '<div>' +
        '<h2>'+asemat.features[i].properties.Nimi+'</h2>' +
        '<h3>Osoite: '+asemat.features[i].properties.Osoite+'</h3>' +
        '<h3>Kapasiteetti: '+asemat.features[i].properties.Kapasiteet+'</h3>' +
        '</div>';

      const popupIkkuna = new google.maps.InfoWindow({
        content: asemanTiedot,
      });

      merkki.addListener("mouseover", () => {
        popupIkkuna.open({
          anchor: merkki,
          map,
          shouldFocus: false,
        });
      });

      merkki.addListener("mouseout", () => {
        popupIkkuna.close({
          anchor: merkki,
          map,
          shouldFocus: false,
        });
      });

    }

  } catch (error) {
    console.log(error)
  }
}

window.initMap = initMap;
