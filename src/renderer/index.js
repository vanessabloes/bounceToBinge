require('./style.css');

export default {};

const {Board, Proximity} = require('johnny-five');
const board = new Board({
  repl: false
});

const $result = document.querySelector(`.result`);
const $spring = document.querySelector(`.spring`);
const $counter = document.querySelector(`.counter`);

const values = [];
let counter = 0;
const action = [];



//const $start = document.querySelector(`.btn`);
const $gewicht = document.querySelector(`.gewicht`);
const $dokter = document.querySelector(`.dokter`);
const $geld = document.querySelector(`.geld`);
const $leven = document.querySelector(`.leven`);
const $geluk = document.querySelector(`.geluk`);

const init = () => {
  clicker();
};



const clicker = () => {
  //$start.addEventListener(`click`, handleClickButton);
  document.querySelectorAll(`a`).forEach(link => {
    link.addEventListener(`click`, handleClickLink);
  });
};

/*const handleClickButton = e => {
  if (e.target.value === 'KLIK HIER OM TE STARTEN') {
    e.target.value = 'RESET';
    $video.classList.remove('hidden');
  }

};*/

const handleClickLink = e => {
  const $class = e.target.className;
  console.log($class);
  //const $className = `${$class}__vid`;

  //const $video = document.querySelector(`.${$className}`);
  //playlist.push($video.className);
  const $links = document.querySelectorAll(`a`);

  $links.forEach($link => {
    if ($link.id === e.target.id) {
      $link.classList.remove('hidden');
      $link.classList.add('active__link');
    } else {
      $link.classList.add('hidden');
      $link.classList.remove('active__link');
    }
  });

  const $status = document.querySelector(`.springstatus`);
  $status.classList.remove('hidden');

  const $filmwrapper = document.querySelectorAll(`.filmwrapper`);
  $filmwrapper.forEach($film => {
    $film.classList.add('hidden');
  });

  const $filmcontainer = document.querySelector(`.filmcontainer`);
  $filmcontainer.classList.add('hidden');

  const $spring = document.querySelector(`.spring`);
  $spring.classList.remove('hidden');

  const $levels = document.querySelector(`.levels`);
  $levels.classList.remove('hidden');

  const $springwrapper = document.querySelector(`.springwrapper`);
  $springwrapper.classList.remove('hidden');

  const $filmText = document.querySelector(`.film__text`);

  let type = '';
  if (e.target.id === 'friends' || e.target.id === 'stranger') {
    type = 'Serie';

  } else {
    type = 'Film';

  }

  $filmText.textContent = `${type}: ${e.target.name}`;

  const $videos = document.querySelectorAll(`video`);

  $videos.forEach($video => {
    console.log($video.id);

    if ($video.id === `${e.target.id}__vid`) {
      $video.classList.remove('hidden');
      $video.classList.add('active');

    } else {
      $video.classList.add('hidden');
      $video.classList.remove('active');

    }

  });

  const $backButton = document.querySelector(`.btn`);

  $backButton.classList.remove('hidden');
  $backButton.addEventListener(`click`, handleClickButton);

};





board.on('ready', () => {
  const proximity = new Proximity({
    controller: 'HCSR04',
    pin: 7
  });

  proximity.on('change', () => {
    const {centimeters} = proximity;
    //console.log('  cm  : ', centimeters);
    if (centimeters) {

      $result.textContent = centimeters;
      values.push(centimeters);
      console.log(action.slice(1).slice(- 8));

      if (values.length === 4) {
        values.shift();
      }

      const status = {};
      for (let i = 0;i < action.slice(1).slice(- 50).length;i ++) {
        const num = action.slice(1).slice(- 50)[i];
        status[num] = status[num] ? status[num] + 1 : 1;
        //console.log(status[1]);
      }

      const statusprocent = status[1] / 50 * 100;
      const $status = document.querySelector(`.springstatus`);
      console.log(statusprocent);

      if (isNaN(statusprocent)) {
        $status.style.width = `0px`;


      }
      $status.style.width = `${statusprocent * 10}px`;
      $status.style.backgroundColor = 'white';

      //console.log(values[1]);
      //console.log(values[2]);

      const dif = Math.abs(values[1] - values[2]);
      //console.log(dif);

      if (dif > 5) {
        counter += 1;
        $counter.textContent = `Aantal sprongen: ${counter}`;
        action.push(1);
      } else {
        action.push(0);
      }
    }

    const gewicht = counter / 1000;



    const vidToPlay = document.querySelector(`.active`);

    if (vidToPlay) {

      $gewicht.textContent = `${(Math.round(gewicht * 100) / 100).toFixed(2)}`;
      $dokter.textContent = `${Math.ceil(counter / 50)}`;
      $geluk.textContent = `${Math.ceil(counter / 20)}`;
      $geld.textContent = `${(Math.round(counter / 70 * 100) / 100).toFixed(2)}`;
      $leven.textContent = `${Math.ceil(counter / 80)}`;

      if (action.slice(1).slice(- 50).includes(1)) {
        vidToPlay.play();
        $spring.textContent = 'Goed bezig! Blijven gaan!';
      } else {
        vidToPlay.pause();
        $spring.textContent = 'Allehup springen! Je moet nog 34 andere videofragmenten zien';
      }

    }




  });


});

const handleClickButton = e => {
  //console.log(e.target);
  e.target.classList.add('hidden');

  const vidToPlay = document.querySelector(`.active`);
  vidToPlay.pause();
  vidToPlay.classList.add('hidden');
  vidToPlay.classList.remove('active');

  const $filmText = document.querySelector(`.film__text`);
  $filmText.textContent = 'Kies je film of serie:';

  const $filmwrapper = document.querySelectorAll(`.filmwrapper`);
  $filmwrapper.forEach($film => {
    $film.classList.remove('hidden');
  });


  const $status = document.querySelector(`.springstatus`);
  $status.classList.add('hidden');

  const $filmcontainer = document.querySelector(`.filmcontainer`);
  $filmcontainer.classList.remove('hidden');

  const $spring = document.querySelector(`.spring`);
  $spring.classList.add('hidden');

  const $levels = document.querySelector(`.levels`);
  $levels.classList.add('hidden');

  const $springwrapper = document.querySelector(`.springwrapper`);
  $springwrapper.classList.add('hidden');


  const $links = document.querySelectorAll(`a`);
  $links.forEach($link => {
    $link.classList.remove('hidden');
    $link.classList.remove('active__link');
  });


};

init();









