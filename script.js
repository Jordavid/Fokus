
const html = document.querySelector('html');
const buttonCorto = document.querySelector('.app__card-button--corto');
const buttonEnfoque = document.querySelector('.app__card-button--enfoque');
const buttonLargo = document.querySelector('.app__card-button--largo');

const banner = document.querySelector('.app__image');

const txtTitle = document.querySelector('.app__title');

const btnPush = document.querySelectorAll('.app__card-button');

const inputMusic = document.querySelector('#alternar-musica');
const music = new Audio('./sonidos/luna-rise-part-one.mp3');

const buttonIniciar = document.querySelector('#start-pause');
const textIniciarPausar = document.querySelector('#start-pause span');
const timerPantalla = document.querySelector('#timer');

const musicPlay = new Audio('./sonidos/play.wav');
const musicPause = new Audio('./sonidos/pause.mp3');
const musicFin = new Audio('./sonidos/beep.mp3');

const imgPausePlay = document.querySelector('.app__card-primary-butto-icon');



let tiempo = 1500;
let idIntervalo = null;

music.loop = true;
inputMusic.addEventListener('change', () =>{
    if(music.paused){
        music.play();
    } else{
        music.pause();
    }
})

buttonEnfoque.addEventListener('click', () => {
    tiempo = 1500;
    cambiarContexto('enfoque');
    // Inserta la clase 'active' al botón de enfoque
    buttonEnfoque.classList.add('active');
});

buttonCorto.addEventListener('click', () => {
    tiempo = 300;
    cambiarContexto('descanso-corto');
    // Inserta la clase 'active' al botón de descanso corto
    buttonCorto.classList.add('active');
    
});

buttonLargo.addEventListener('click', () =>{
    tiempo = 900;
    cambiarContexto('descanso-largo');
    // Inserta la clase 'active' al botón de descanso largo
    buttonLargo.classList.add('active');
});


function cambiarContexto(contexto){
    mostrarTiempo();

    // Remueve la clase active de todos los botones
    btnPush.forEach(function(contexto){
        contexto.classList.remove('active');
    });

    // Cambia el color de la aplicación
    html.setAttribute('data-contexto', contexto);
    // Cambia la imagen del banner
    banner.setAttribute('src', `./imagenes/${contexto}.png`);

    // Dependiendo del boton que se presione, se cambia el texto del titulo
    switch(contexto){
        case 'enfoque':
            txtTitle.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>
        </h1>`
        break;

        case 'descanso-corto':
            txtTitle.innerHTML = `¿Qué tal tomar un respirp?<br>
            <strong class="app__title-strong">¡Haz una pausa corta!.</strong>
        </h1>` 
        break;

        case 'descanso-largo':
            txtTitle.innerHTML = `Hora de volver a la superficie,<br>
            <strong class="app__title-strong">Haz una pausa larga.</strong>
        </h1>`
        break;
    }

    
}


const cuentaRegresiva = () =>{
    if(tiempo <= 0){
        musicFin.play();
        alert('Tiempo final');
        reiniciar();
        return;
    }

    textIniciarPausar.textContent = "Pausar";
    imgPausePlay.src = './imagenes/pause.png'
    tiempo -= 1;
    mostrarTiempo();
}

buttonIniciar.addEventListener('click', iniciarPausar);


function iniciarPausar(){
    if(idIntervalo){
       musicPause.play();
       
       reiniciar();
       return;
    }
    musicPlay.play();
    
    // setInterval metodo de JavaScript
    idIntervalo = setInterval(cuentaRegresiva, 1000);
}


function reiniciar(){
    clearInterval(idIntervalo);
    textIniciarPausar.textContent = "Iniciar";
    imgPausePlay.src = './imagenes/play_arrow.png'
    idIntervalo = null;
}


function mostrarTiempo(){
    const tiempoTranscurrido = new Date(tiempo * 1000);
    // El tiempo lo transforma en la region escogida('es-MX')Mexico (los minutos y segundos lo muestra con dos digitos)
    const timpoFormateado = tiempoTranscurrido.toLocaleTimeString('es-MX',{minute:'2-digit', second:'2-digit'});
    //Muestra el tiempo formateado en la pantalla
    timerPantalla.innerHTML = `${timpoFormateado}`
}

mostrarTiempo();