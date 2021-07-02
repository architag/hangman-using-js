const words = [
  [`ATTEMPT`, `ACT OF TRYING`],
  [`DOLL`, `CHILDREN'S TOY`],
  [`FLOATING`, `SUSPENDED IN WATER OR AIR`],
  [`PRIDE`, `FEELING OF SELF-RESPECT AND PERSONAL WORTH`],
  [`FILM`, `MOTION PICTURE`],
  [`KIDS`, `CHILDREN`],
  [`MONKEY`, `PRIMATE FOUND IN TROPICAL REGIONS`],
  [`LUNGS`, `RESPIRATORY ORGANS`],
  [`HABIT`, `ROUTINE`],
  [`SPIN`, `RAPID WHIRLING MOTION`],
  [`DISCUSSION`, `CONVERSATION`],
  // OFFICIAL: '',
  // PHILADELPHIA: '',
  // FACING: '',
  // MARTIN: '',
  // NORWAY: '',
  // POLICEMAN: '',
  // TOBACCO: '',
  // VESSELS: '',
  // TALES: '',
  // VAPOR: '',
  // INDEPENDENT: '',
  // COOKIES: '',
  // WEALTH: '',
  // PENNSYLVANIA: '',
  // EXPLANATION: '',
  // DAMAGE: '',
  // OCCASIONALLY: '',
  // EXIST: '',
  // SIMPLEST: '',
  // PLATES: '',
  // CANAL: '',
  // NEIGHBORHOOD: '',
  // PALACE: '',
  // ADVICE: '',
  // LABEL: '',
  // DANNY: '',
  // CLAWS: '',
  // RUSH: '',
  // CHOSE: '',
  // EGYPT: '',
  // POETRY: '',
  // BREEZE: '',
  // WOLF: '',
  // MANUFACTURING: '',
  // OURSELVES: '',
  // SCARED: '',
  // ARRANGEMENT: '',
  // POSSIBLY: '',
  // PROMISED: '',
  // BRICK: '',
  // ACRES: '',
  // TREATED: '',
  // SELECTION: '',
  // POSITIVE: '',
  // CONSTANTLY: '',
  // SATISFIED: '',
  // ZOO: '',
  // CUSTOMS: '',
  // UNIVERSITY: '',
  // FIREPLACE: '',
  // SHALLOW: '',
  // INSTANT: '',
  // SALE: '',
  // PRACTICAL: '',
  // SILLY: '',
  // SATELLITES: '',
  // SHAKING: '',
  // ROCKY: '',
  // SLOPE: '',
  // CASEY: '',
  // REMARKABLE: '',
  // RUBBED: '',
  // HAPPILY: '',
  // MISSION: '',
  // CAST: '',
  // SHAKE: '',
  // REQUIRE: '',
  // DONKEY: '',
  // EXCHANGE: '',
  // JANUARY: '',
  // MOUNT: '',
  // AUTUMN: '',
  // SLIP: '',
  // BORDER: '',
  // LEE: '',
  // MELTED: '',
  // TRAP: '',
  // SOLAR: '',
  // RECALL: '',
  // MYSTERIOUS: '',
  // SWUNG: '',
  // CONTRAST: '',
  // TOY: '',
  // GRABBED: '',
  // AUGUST: '',
  // RELATIONSHIP: '',
  // HUNTER: '',
  // DEPTH: '',
  // FOLKS: '',
  // DEEPLY: '',
  // IMAGE: '',
  // STIFF: '',
  // RHYME: '',
  // ILLINOIS: '',
  // SPECIES: '',
  // ADULT: '',
  // FINEST: '',
  // THUMB: '',
  // SLIGHT: '',
  // GRANDMOTHER: '',
  // SHOUT: '',
  // HARRY: '',
  // MATHEMATICS: '',
  // MILL: '',
  // ESSENTIAL: '',
  // TUNE: '',
  // FORT: '',
  // COACH: '',
  // NUTS: '',
  // GARAGE: '',
  // CALM: '',
  // MEMORY: '',
  // SOAP: '',
];
let word;
let hint;
let count;
let highScore = 0;
let currScore = 0;
let lives;

function randomWord(arr) {
  const index = Math.floor(Math.random() * arr.length);
  const item = arr[index];
  arr.splice(index, 1);
  return item;
}

$(document).ready(function () {
  $('#wordGuess').css('opacity', 1);

  if (!localStorage.getItem('highScore')) {
    localStorage.setItem('highScore', JSON.stringify(highScore));
  }
  highScore = JSON.parse(localStorage.getItem('highScore'));

  function getNewWord() {
    lives = 9;
    $('#hangman').attr(`src`, `images/${lives}.png`);
    $('#word').html('');
    $('.letters').removeClass('disabled correct wrong');
    $('#hscore').text(`HIGH SCORE: ${highScore}`);
    $('#score').text(`SCORE: ${currScore}`);
    $('#lives').text(`CHANCES LEFT: ${lives}`);
    [word, hint] = randomWord(words);
    count = word.length;
    $.each(word.split(''), function (index, val) {
      $('#word').append(`<span class="character" id=${val}1>${val}</span>`);
    });
    $('#sub2').text(`HINT: ${hint}`).css({
      color: 'rgb(254, 91, 91)',
      fontSize: '24px',
    });
  }
  getNewWord();

  function clickHandle(val) {
    if (!$(`#${val}`).hasClass('disabled')) {
      $(`#${val}`)
        .animate(
          {
            fontSize: '+=10px',
          },
          150
        )
        .animate(
          {
            fontSize: '-=10px',
          },
          150
        );

      if (word.includes(val)) {
        $(`#${val}`).addClass('disabled correct');
        const num = $(`[id=${val}1`).css('color', 'rgb(41, 10, 10)').length;
        count -= num;
        if (count === 0) {
          currScore += 1;
          $('#word').children().css('color', 'rgb(0, 184, 52)');
          setTimeout(getNewWord, 1000);
        }
      } else {
        $(`#${val}`).addClass('disabled wrong');
        lives -= 1;
        $('#hangman').attr(`src`, `images/${lives}.png`);
        if (lives === 0) {
          $('#modal-text').html(`YOUR SCORE: ${currScore}`);
          if (currScore > highScore) {
            highScore = currScore;
            $('#modal-text').html(
              `YOUR SCORE: ${currScore}<br><br>YOU SET A NEW HIGH SCORE!`
            );
            localStorage.setItem('highScore', JSON.stringify(highScore));
          }
          currScore = 0;
          $('#word').children().css('color', 'red');
          setTimeout(function () {
            $('.modal').css('display', 'block');
          }, 1000);
          setTimeout(function () {
            $('.modal').css('display', 'none');
            getNewWord();
          }, 2500);
        }
      }
    }
  }

  $('.letters').click(function (event) {
    clickHandle(event.target.id);
  });
  $(window).keydown(function (event) {
    if (event.which >= 65 && event.which <= 90) {
      clickHandle(String.fromCharCode(event.which));
    }
  });
});
