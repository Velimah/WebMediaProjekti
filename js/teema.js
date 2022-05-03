"use strict";

const themeMemory = localStorage.getItem('theme');
// noutaa/määrittelee avaimen 'theme'

const theme = document.querySelector('#theme-link');

if (themeMemory === 'vaalea') {
    theme.href = 'css/style.css';
    // style.css sisältää normaalin/vaalean teeman muotoilun
}
if (themeMemory === 'tumma') {
    theme.href = 'css/tumma.css';
}

// localStoragen avulla sivusto muistaa nykyisen teeman/asetuksen vaikka sivun päivittäisi.

function darkMode(){
    // darkMode -funktio on suoraan linkitetty teema-nappiin html -koodissa, onClick -illä. 
    // Jos theme -linkin href :iksi on määritelty css/style.css niin teema- napin painalluksella scriptin href vaihtuu css/tumma.css :ksi ja
    // localStore 'theme' -avaimeen tallentuu arvo tumma. Toimii samoin tummasta vaaleaan teemaan.
    if (theme.getAttribute('href') === 'css/style.css'){
        theme.href = 'css/tumma.css';
        localStorage.setItem('theme', 'tumma');

    } else {
        theme.href = 'css/style.css';
        localStorage.setItem('theme', 'vaalea');

    }

}