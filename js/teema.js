"use strict";

const themeMemory = localStorage.getItem('theme');

const theme = document.querySelector('#theme-link');

if (themeMemory === 'vaalea') {
    theme.href = 'css/style.css';
}
if (themeMemory === 'tumma') {
    theme.href = 'css/tumma.css';
}

function darkMode(){

    if (theme.getAttribute('href') === 'css/style.css'){
        theme.href = 'css/tumma.css';
        localStorage.setItem('theme', 'tumma');

    } else {
        theme.href = 'css/style.css';
        localStorage.setItem('theme', 'vaalea');

    }

}