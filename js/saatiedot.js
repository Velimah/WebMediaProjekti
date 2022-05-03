"use strict";

let sijainti;

//hakee nykyisen sijainnin.
navigator.geolocation.getCurrentPosition(
  (position) => {
    sijainti = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    // Käynnistää säätietojen haun. Sijoitettu koordinaattien haun sisälle, koska muuten async funktio hakee tietoja ennen kuin koordinaatit ovat haettu.
    Saatiedot()
  });

// Hakee reaaliaikaiset säätiedot openweather API:sta. Sijoittaa osoitteeseen ylempänä haetut koordinaatit, että saadaan paikalliset säätiedot.
async function Saatiedot() {
  try{
    const vastaus = await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+sijainti.lat+'&lon='+sijainti.lng+
      '&appid=14059927d263d5687eba5d18f990a49d&units=metric&lang=fi');
    if (!vastaus.ok) {
      return Promise.reject(Error("Hups, rikki meni."));
    }
    const saaTiedot = await vastaus.json();

    //Tulostaa säätiedot lokiin.
    console.log('saaTiedot', saaTiedot);

    //Luo aikamuuttujan.
    const aika = new Date().toLocaleTimeString('fi', {day:"numeric", month: 'numeric', hour12 : false, hour: '2-digit', minute:'2-digit',
      weekday: 'short'});

    // luo html elementin, johon sijoitetaan aikamuuttuja, säätiedot, sijainti ja kuva.
    document.getElementById('saa').innerHTML =
      '<h2 id="saaNimi">'+saaTiedot.name+'&nbsp&nbsp&nbsp&nbsp'+aika+'</h2>'+
      '<div id="container">'+
      '<div id="ikoni">'+
      '<img src="https://openweathermap.org/img/wn/'+saaTiedot.weather[0].icon+'@2x.png" alt="'+saaTiedot.weather[0].description+'">'+
      '<p>'+saaTiedot.weather[0].description+'</p>'+
      '</div>'+
      '<div id="saaTiedot">'+
      '<p> Lämpötila: '+saaTiedot.main.temp+' C</p>'+
      '<p> Kosteus: '+saaTiedot.main.humidity+' %</p>'+
      '<p> Tuuli: '+saaTiedot.wind.speed+' m/s</p>'+
      '<p> Paine: '+saaTiedot.main.pressure+' hPa</p>'+
      '</div>'+
      '</div>';

  } catch (error2) {
    console.log(error2)
  }
}

