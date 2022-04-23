
async function initMap() {
  try{

    const map = new google.maps.Map(document.getElementById("map"), {
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

        const locationMark = 'blueMarker.png';

        const merkki = new google.maps.Marker({
          position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          icon: locationMark,
          map: map
        });

        const popupIkkuna = new google.maps.InfoWindow({
          content: '<h3>Oma sijainti</h3>'
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

    const vastaus = await fetch('asemat.geojson');
    if (!vastaus.ok) throw new Error('Hups, joku hajosi');
    const tiedot = await vastaus.json();
    console.log('KaupunkipyoraAsemat', tiedot);

    for (let i = 0; i < tiedot.features.length; i++) {

      const merkki = new google.maps.Marker({
        position: new google.maps.LatLng(tiedot.features[i].properties.y, tiedot.features[i].properties.x),
        map: map
      });

      const asemanTiedot =
        '<div>' +
        '<h2>'+tiedot.features[i].properties.Nimi+'</h2>' +
        '<h3>Osoite: '+tiedot.features[i].properties.Osoite+'</h3>' +
        '<h3>Kapasiteetti: '+tiedot.features[i].properties.Kapasiteet+'</h3>' +
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
