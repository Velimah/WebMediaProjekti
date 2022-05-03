'use strict';

const themeMemory = localStorage.getItem('theme');
// noutaa avaimen/itemin 'theme'

const theme = document.querySelector('#theme-link');

if (themeMemory === 'vaalea') {
    theme.href = 'css/style.css';
    // style.css sisältää normaalin/vaalean teeman muotoilun
}
if (themeMemory === 'tumma') {
    theme.href = 'css/tumma.css';
}
// localStoragen avulla sivusto muistaa asetuksen/nykyisen teeman vaikka sivun päivittäisi. 

function darkMode(){
    // darkMode -funktio on suoraan linkitetty teema -nappiin html -koodissa, onClick -illä. 
    // Jos theme -nimisen linkin href :iksi on määritelty css/style.css eli vaalea/normaali css -scripti,
    // niin teema -napin painalluksella scriptin href vaihtuukin tummaksi ja localStorageen tallennetaan theme -avaimeen arvo tumma.
    

    if (theme.getAttribute('href') === 'css/style.css'){
        theme.href = 'css/tumma.css';
        localStorage.setItem('theme', 'tumma');

    } else {
        theme.href = 'css/style.css';
        localStorage.setItem('theme', 'vaalea');

    }

}