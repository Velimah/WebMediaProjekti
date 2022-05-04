"use strict";

// Google maps initialisaatio.
async function initMap() {
  try {

    // Luo kartan ja asettaa lähtöasetukset.
    const map = new google.maps.Map(document.getElementById("map"), {
      mapTypeId: 'hybrid',
      zoom: 14,
      controlSize: 32,

    });

    // Hakee käyttäjän koordinaatit.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const sijainti = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const locationMark = 'img/redMarker.png';

        // Luo nykyisen sijainnin merkin karttaan käyttäen ylempänä haettuja koordinaatteja.
        const merkki = new google.maps.Marker({
          position: new google.maps.LatLng(sijainti),
          icon: locationMark,
          map: map
        });

        // Luo nykyisen sijainnin merkille infoikkunan.
        const popupIkkuna = new google.maps.InfoWindow({
          content: '<h3 class="infoteksti">Olet tässä</h3>'
        });

        // Luo kuuntelijan, joka avaa infoikkunan hiiren mennessä merkin päälle.
        google.maps.event.addListener(merkki, 'mouseover', function () {
          popupIkkuna.open({
            anchor: merkki,
            map,
            shouldFocus: false,
          });
        });

        // Luo kuuntelijan, joka sulkee infoikkunan hiiren mennessä pois merkin päältä.
        google.maps.event.addListener(merkki, 'mouseout', function () {
          popupIkkuna.close({
            anchor: merkki,
            map,
            shouldFocus: false,
          });
        });

        // Kohdistaa kartan nykyiseen sijaintiin.
        map.setCenter(sijainti);
      });

    // Hakee rajapinnoista yhdistetystä asemat.geojson tiedostosta kaupunkipyöräasemien tiedot.
    // API lähde: https://www.opendata.fi/data/fi/dataset/vantaan-kaupunkipyoraasemat,
    //            https://www.opendata.fi/data/fi/dataset/hsl-n-kaupunkipyoraasemat
    const vastaus = await fetch('data/asemat.geojson');
    if (!vastaus.ok) {
      return Promise.reject(Error("Hups, rikki meni."));
    }
    const asemat = await vastaus.json();

    // Tulostaa lokiin asemien tiedot.
    console.log('KaupunkipyoraAsemat', asemat);

    // Käy läpi asemalistan koko pituuden.
    for (let i = 0; i < asemat.features.length; i++) {

      const asemaMerkki = 'img/stationMarker.png';

      // Luo asemamerkin karttaan käyttäen asemalistalta löytyviä koordinaatteja.
      const merkki = new google.maps.Marker({
        position: new google.maps.LatLng(asemat.features[i].properties.y, asemat.features[i].properties.x),
        icon: asemaMerkki,
        map: map
      });

      // Asemamerkkien infoikkunoiden tekstisisältö.
      const asemanTiedot =
        '<div>' +
        '<h2 class="infoteksti">' + asemat.features[i].properties.Nimi + '</h2>' +
        '<h3 class="infoteksti">Osoite: ' + asemat.features[i].properties.Osoite + '</h3>' +
        '<h3 class="infoteksti">Kapasiteetti: ' + asemat.features[i].properties.Kapasiteet + '</h3>' +
        '</div>';

      // Luo infoikkunan asemamerkille.
      const infoIkkuna = new google.maps.InfoWindow({
        content: asemanTiedot,
      });

      // Luo kuuntelijan, joka avaa infoikkunan hiiren mennessä merkin päälle.
      google.maps.event.addListener(merkki, 'mouseover', function () {
        infoIkkuna.open({
          anchor: merkki,
          map,
          shouldFocus: false,
        });
      });

      // Luo kuuntelijan, joka sulkee infoikkunan hiiren mennessä pois merkin päältä.
      google.maps.event.addListener(merkki, 'mouseout', function () {
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

// Käynnistää kartan.
window.initMap = initMap;