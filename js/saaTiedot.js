let pos;

navigator.geolocation.getCurrentPosition(
  (position) => {
    pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    SaaTiedot()
  });

async function SaaTiedot() {
  try{
    const vastaus = await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+pos.lat+'&lon='+pos.lng+'&appid=14059927d263d5687eba5d18f990a49d&units=metric&lang=fi');
    if (!vastaus.ok) {
      return Promise.reject(Error("Hups, rikki meni."));
    }
    const saaTiedot = await vastaus.json();
    console.log('saaTiedot', saaTiedot);

    document.getElementById('saaNimi').innerHTML =
    saaTiedot.name;

    document.getElementById('container').innerHTML =

      '<div id="ikoni">'+
      '<img src="http://openweathermap.org/img/wn/'+saaTiedot.weather[0].icon+'@2x.png" alt="'+saaTiedot.weather[0].description+'">'+
      '<p>'+saaTiedot.weather[0].description+'</p>'+
      '</div>'+

      '<div id="saaTiedot">'+
      '<p> Lämpötila: '+saaTiedot.main.temp+' C</p>'+
      '<p> Kosteus: '+saaTiedot.main.humidity+' %</p>'+
      '<p> Tuuli: '+saaTiedot.wind.speed+' m/s</p>'+
      '<p> Paine: '+saaTiedot.main.pressure+' hPa</p>'+
      '</div>';


  } catch (error2) {
    console.log(error2)
  }
}

