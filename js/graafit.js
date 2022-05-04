"use strict";


// Hakee huhtikuun matkatiedot 2021-04.json tiedostosta. Tulostaa lokiin tulokset.
async function HaeTilastot() {
  try {

    // API lähde: https://www.opendata.fi/data/fi/dataset/helsingin-ja-espoon-kaupunkipyorilla-ajatut-matkat
    const vastaus = await fetch('data/2021-04.json');
    if (!vastaus.ok) {
      return Promise.reject(Error("Hups, rikki meni."));
    }
    const tiedot = await vastaus.json();
    console.log('Ajotiedot', tiedot);

    let kokonaisMatka = 0;
    let kokonaisKesto = 0;

    // Käy läpi koko listan pituuden ja summaa matkat ja kestot.
    for (let i = 0; i < tiedot.length; i++) {
      kokonaisMatka = kokonaisMatka + tiedot[i]["Covered distance (m)"];
      kokonaisKesto = kokonaisKesto + tiedot[i]["Duration (sec.)"];
    }

    // Laskee halutut tulokset ja muuttaa ne järkevään muotoon.
    const kilometrit = Math.trunc(kokonaisMatka / 1000);

    const tunnit = Math.trunc(kokonaisKesto / 3600);

    const maara = tiedot.length;

    const keskimMatka = Math.trunc(kokonaisMatka / maara);

    const keskimAika = Math.trunc(kokonaisKesto / 60 / maara);

    // Tulostaa lokiin tulokset.
    console.log("Huhtikuu:");
    console.log("  Ajetut kilometrit: " + kilometrit + " km");
    console.log("  Ajetut tunnit: " + tunnit + " h");
    console.log("  Matkojen määrä: " + maara + " kpl");
    console.log("  Matkojen keskimääräinen pituus: " + keskimMatka + " m");
    console.log("  Matkojen keskimääräinen kesto: " + keskimAika + " min");

  } catch (error) {
    console.log(error)
  }
}

// Käynnistää tilastojen hakemisfunktion. Kommentoitu pois listan suuren koon takia.
// HaeTilastot();

// Luodaan graafi jokaiselle kuukaudelle käyttäen apuna plot.ly kirjastoja. Graafien tiedot sijoitettu valmiiksi
// yllä olevalla koodilla lasketuista jokaisen kuukauden tuloksista.

// Luodaan listat kuukausista ja arvoista.
const xArray = ["Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu"];
const yArray = [680300, 995542, 1484674, 1452262, 978603, 663766, 416101];

// Sijoitetaan arvot graafiin.
const data = [{
  x: xArray,
  y: yArray,
  type: "bar"
}];

// Valitaan oikea graafin ulkoasu nykyisen teeman mukaan ja luodaan graafi.
if (theme.getAttribute('href') === 'css/style.css') {

  const layout = {
    title: "Poljetut kilometrit", plot_bgcolor: "rgba(255, 255, 255, 0)",
    paper_bgcolor: "#rgba(255, 255, 255, 0)"
  };
  Plotly.newPlot("graafi1", data, layout);

} else {

  const layout = {
    title: "Poljetut kilometrit", plot_bgcolor: "rgba(255, 255, 255, 0)",
    paper_bgcolor: "#rgba(255, 255, 255, 0)", font: {color: "#FFFFFF"}
  };
  Plotly.newPlot("graafi1", data, layout);
}

// Luodaan listat kuukausista ja arvoista.
const xArray2 = ["Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu"];
const yArray2 = [83839, 115206, 185796, 179194, 115546, 82208, 0];

// Sijoitetaan arvot graafiin.
const data2 = [{
  x: xArray2,
  y: yArray2,
  type: "bar"
}];

// Valitaan oikea graafin ulkoasu nykyisen teeman mukaan ja luodaan graafi.
if (theme.getAttribute('href') === 'css/style.css') {
  const layout2 = {
    title: "Poljetut tunnit", plot_bgcolor: "rgba(255, 255, 255, 0)",
    paper_bgcolor: "#rgba(255, 255, 255, 0)"
  };

  Plotly.newPlot("graafi2", data2, layout2);
} else {
  const layout2 = {
    title: "Poljetut tunnit", plot_bgcolor: "rgba(255, 255, 255, 0)",
    paper_bgcolor: "#rgba(255, 255, 255, 0)", font: {color: "#FFFFFF"}
  };
  Plotly.newPlot("graafi2", data2, layout2);

}

// Luodaan listat kuukausista ja arvoista.
const xArray3 = ["Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu"];
const yArray3 = [274174, 407338, 611741, 604422, 435784, 319402, 209240];

// Sijoitetaan arvot graafiin.
const data3 = [{
  x: xArray3,
  y: yArray3,
  type: "bar"
}];

// Valitaan oikea graafin ulkoasu nykyisen teeman mukaan ja luodaan graafi.
if (theme.getAttribute('href') === 'css/style.css') {

  const layout3 = {
    title: "Poljetut matkat", plot_bgcolor: "rgba(255, 255, 255, 0)",
    paper_bgcolor: "#rgba(255, 255, 255, 0)"
  };
  Plotly.newPlot("graafi3", data3, layout3);

} else {

  const layout3 = {
    title: "Poljetut matkat", plot_bgcolor: "rgba(255, 255, 255, 0)",
    paper_bgcolor: "#rgba(255, 255, 255, 0)", font: {color: "#FFFFFF"}
  };
  Plotly.newPlot("graafi3", data3, layout3);

}

// Luodaan listat kuukausista ja arvoista.
const xArray4 = ["Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu"];
const yArray4 = [2481, 2444, 2426, 2402, 2245, 2078, 1988];

// Sijoitetaan arvot graafiin.
const data4 = [{
  x: xArray4,
  y: yArray4,
  type: "bar"
}];

// Valitaan oikea graafin ulkoasu nykyisen teeman mukaan ja luodaan graafi.
if (theme.getAttribute('href') === 'css/style.css') {

  const layout4 = {
    title: "Keskimääräinen matkan pituus (m)",
    plot_bgcolor: "rgba(255, 255, 255, 0)",
    paper_bgcolor: "#rgba(255, 255, 255, 0)"
  };
  Plotly.newPlot("graafi4", data4, layout4);

} else {

  const layout4 = {
    title: "Keskimääräinen matkan pituus (m)",
    plot_bgcolor: "rgba(255, 255, 255, 0)",
    paper_bgcolor: "#rgba(255, 255, 255, 0)", font: {color: "#FFFFFF"}
  };
  Plotly.newPlot("graafi4", data4, layout4);

}

// Luodaan listat kuukausista ja arvoista.
const xArray5 = ["Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu"];
const yArray5 = [18, 16, 18, 17, 15, 15, 0];

// Sijoitetaan arvot graafiin.
const data5 = [{
  x: xArray5,
  y: yArray5,
  type: "bar"
}];

// Valitaan oikea graafin ulkoasu nykyisen teeman mukaan ja luodaan graafi.
if (theme.getAttribute('href') === 'css/style.css') {

  const layout5 = {
    title: "Keskimääräinen matkan kesto (min)",
    plot_bgcolor: "rgba(255, 255, 255, 0)",
    paper_bgcolor: "#rgba(255, 255, 255, 0)"
  };
  Plotly.newPlot("graafi5", data5, layout5);

} else {

  const layout5 = {
    title: "Keskimääräinen matkan kesto (min)",
    plot_bgcolor: "rgba(255, 255, 255, 0)",
    paper_bgcolor: "#rgba(255, 255, 255, 0)", font: {color: "#FFFFFF"}
  };
  Plotly.newPlot("graafi5", data5, layout5);

}