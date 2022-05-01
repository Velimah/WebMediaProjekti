"use strict";

// Google maps initialisaatio.
async function initMap() {
  try{

    // Luo kartan ja asettaa perusasetukset.
    const map = new google.maps.Map(document.getElementById("map"), {
      mapTypeId: 'hybrid',
      zoom: 14,
      controlSize: 32,

    });

    // Hakee käyttäjän koordinaatit, asettaa merkin infoikkunalla kartalle ja luo listenerit hiirelle,
    // että infoikkuna aukeaa hiiren ollessa merkin päällä.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const sijainti = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const locationMark = 'img/redMarker.png';

        const merkki = new google.maps.Marker({
          position: new google.maps.LatLng(sijainti),
          icon: locationMark,
          map: map
        });

        const popupIkkuna = new google.maps.InfoWindow({
          content: '<h3>Olet tässä</h3>'
        });

        google.maps.event.addListener(merkki,'mouseover',function() {
          popupIkkuna.open({
            anchor: merkki,
            map,
            shouldFocus: false,
          });
        });

        google.maps.event.addListener(merkki,'mouseout',function() {
          popupIkkuna.close({
            anchor: merkki,
            map,
            shouldFocus: false,
          });
        });

        map.setCenter(sijainti);
      });

    // Hakee asemat.geojson tiedostosta kaupunkipyöräasemien tiedot, luo merkit ja infoikkunat jokaiselle asemalle
    // ja luo listenerit hiirelle, että infoikkunat aukeaa hiiren ollessa merkkien päällä.
    const vastaus = await fetch('data/asemat.geojson');
    if (!vastaus.ok)  {
      return Promise.reject(Error("Hups, rikki meni."));
    }
    const asemat = await vastaus.json();
    console.log('KaupunkipyoraAsemat', asemat);
    for (let i = 0; i < asemat.features.length; i++) {

      const asemaMerkki = 'img/stationMarker.png';
      const merkki = new google.maps.Marker({
        position: new google.maps.LatLng(asemat.features[i].properties.y, asemat.features[i].properties.x),
        icon: asemaMerkki,
        map: map
      });

      const asemanTiedot =
        '<div>' +
        '<h2>'+asemat.features[i].properties.Nimi+'</h2>' +
        '<h3>Osoite: '+asemat.features[i].properties.Osoite+'</h3>' +
        '<h3>Kapasiteetti: '+asemat.features[i].properties.Kapasiteet+'</h3>' +
        '</div>';

      const infoIkkuna = new google.maps.InfoWindow({
        content: asemanTiedot,
      });

      google.maps.event.addListener(merkki,'mouseover',function() {
        infoIkkuna.open({
          anchor: merkki,
          map,
          shouldFocus: false,
        });
      });

      google.maps.event.addListener(merkki,'mouseout',function() {
        infoIkkuna.close({
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

/*const apiUrl = 'https://cdn.digitransit.fi/map/v2/:finland-citybike-map/:14/';

const getBikeData = async () => {
  try {
    let x = position.coords.longitude;
    let y = potition.coords.latitude;
    const response = await fetch(apiUrl +':' + x + '/:' + y + '.pbf');

    if (!response.ok){
      throw new Error(response.status + response.statusText);
    }

    console.log('bike', response);
    const data = await response.json();
    console.log('bikeData', data);

  } catch (error){
    console.error('fetch failed', error);
  } 
}

getBikeData();*/

