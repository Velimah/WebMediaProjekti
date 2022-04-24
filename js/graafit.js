
// Ohjelma laskee vain huhtikuun tiedot, loput kuukaudet ovat laskettu
// etukäteen ja sijoitettu graafeihin. Koko vuoden tiedot vievät yli 800Mt tilaa ja
// 2.6M objektin laskeminen hidastaa nettisivua aika paljon.

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

    // luodaan graafi jokaiselle kuukaudelle käyttäen apuna plot.ly kirjastoja.
    const xArray = ["Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu"];
    const yArray = [kilometrit, 995542, 1484674, 1452262, 978603, 663766, 416101];

    const data = [{
      x:xArray,
      y:yArray,
      type:"bar"
    }];

    const layout = {title:"Ajetut kilometrit"};

    Plotly.newPlot("graafi1", data, layout);


    const xArray2 = ["Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu"];
    const yArray2 = [tunnit, 115206, 185796, 179194, 115546, 82208, 0];

    const data2 = [{
      x:xArray2,
      y:yArray2,
      type:"bar"
    }];

    const layout2 = {title:"Ajetut tunnit"};

    Plotly.newPlot("graafi2", data2, layout2);


    const xArray3 = ["Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu"];
    const yArray3 = [maara, 407338, 611741, 604422, 435784, 319402, 209240];

    const data3 = [{
      x:xArray3,
      y:yArray3,
      type:"bar"
    }];

    const layout3 = {title:"Ajetut matkat"};

    Plotly.newPlot("graafi3", data3, layout3);


    const xArray4 = ["Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu"];
    const yArray4 = [keskimMatka, 2444, 2426, 2402, 2245, 2078, 1988];

    const data4 = [{
      x:xArray4,
      y:yArray4,
      type:"bar"
    }];

    const layout4 = {title:"Keskimääräinen matkan pituus (m)"};

    Plotly.newPlot("graafi4", data4, layout4);


    const xArray5 = ["Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu"];
    const yArray5 = [keskimAika, 16, 18, 17, 15, 15, 0];

    const data5 = [{
      x:xArray5,
      y:yArray5,
      type:"bar"
    }];

    const layout5 = {title:"Keskimääräinen matkan kesto (min)"};

    Plotly.newPlot("graafi5", data5, layout5);

  } catch (error) {
    console.log(error)
  }
}

HaeTilastot();


