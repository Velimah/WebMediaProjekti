"use strict";
// Hakee huhtikuun matkatiedot 2021-04.json tiedostosta. Tulostaa lokiin tulokset.
async function HaeTilastot() {
  try{

    const vastaus = await fetch('data/2021-04.json');
    if (!vastaus.ok) {
      return Promise.reject(Error("Hups, rikki meni."));
    }
    const tiedot = await vastaus.json();
    console.log('Ajotiedot', tiedot);

    let kokonaisMatka = 0;
    let kokonaisKesto = 0;

    for (let i = 0; i < tiedot.length; i++) {
      kokonaisMatka = kokonaisMatka + tiedot[i]["Covered distance (m)"];
      kokonaisKesto = kokonaisKesto + tiedot[i]["Duration (sec.)"];
    }

    const kilometrit = Math.trunc(kokonaisMatka/1000);

    const tunnit = Math.trunc(kokonaisKesto/3600);

    const maara = tiedot.length;

    const keskimMatka = Math.trunc(kokonaisMatka / maara);

    const keskimAika = Math.trunc(kokonaisKesto / 60 / maara);

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

HaeTilastot();

// luodaan graafi jokaiselle kuukaudelle käyttäen apuna plot.ly kirjastoja. Graafien tiedot sijoitettu valmiiksi
// yllä olevalla koodilla lasketuista tuloksista. Tiedostot vievät yhteensä 800Mt tilaa ja täten reaaliaikainen
// lataaminen vie aivan liikaa kaistaa ja aikaa.
const xArray = ["Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu"];
const yArray = [680300, 995542, 1484674, 1452262, 978603, 663766, 416101];

const data = [{
  x:xArray,
  y:yArray,
  type:"bar"
}];

const layout = {title:"Poljetut kilometrit", plot_bgcolor:"rgba(255, 255, 255, 0)",
  paper_bgcolor:"#rgba(255, 255, 255, 0)"};

Plotly.newPlot("graafi1", data, layout);


const xArray2 = ["Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu"];
const yArray2 = [83839, 115206, 185796, 179194, 115546, 82208, 0];

const data2 = [{
  x:xArray2,
  y:yArray2,
  type:"bar"
}];

const layout2 = {title:"Poljetut tunnit", plot_bgcolor:"rgba(255, 255, 255, 0)",
  paper_bgcolor:"#rgba(255, 255, 255, 0)"};

Plotly.newPlot("graafi2", data2, layout2);


const xArray3 = ["Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu"];
const yArray3 = [274174, 407338, 611741, 604422, 435784, 319402, 209240];

const data3 = [{
  x:xArray3,
  y:yArray3,
  type:"bar"
}];

const layout3 = {title:"Poljetut matkat", plot_bgcolor:"rgba(255, 255, 255, 0)",
  paper_bgcolor:"#rgba(255, 255, 255, 0)"};

Plotly.newPlot("graafi3", data3, layout3);


const xArray4 = ["Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu"];
const yArray4 = [2481 , 2444, 2426, 2402, 2245, 2078, 1988];

const data4 = [{
  x:xArray4,
  y:yArray4,
  type:"bar"
}];

const layout4 = {title:"Keskimääräinen matkan pituus (m)", plot_bgcolor:"rgba(255, 255, 255, 0)",
  paper_bgcolor:"#rgba(255, 255, 255, 0)"};

Plotly.newPlot("graafi4", data4, layout4);


const xArray5 = ["Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu"];
const yArray5 = [18, 16, 18, 17, 15, 15, 0];

const data5 = [{
  x:xArray5,
  y:yArray5,
  type:"bar"
}];

const layout5 = {title:"Keskimääräinen matkan kesto (min)", plot_bgcolor:"rgba(255, 255, 255, 0)",
  paper_bgcolor:"#rgba(255, 255, 255, 0)"};

Plotly.newPlot("graafi5", data5, layout5);


