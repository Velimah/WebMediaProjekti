/*function darkMode(){
    let element = document.body;
    
    element.classList.toggle("dark-mode");
   
}*/

const theme = document.querySelector('#theme-link');

function darkMode(){

    if (theme.getAttribute('href') == 'css/style.css'){
        theme.href = 'css/tumma.css';

    } else {
        theme.href = 'css/style.css';
    }

}