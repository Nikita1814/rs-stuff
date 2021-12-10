//iports
import Home from "./Home.js";
import Settings from "./Settings.js";
import { Category, Question } from "./Category.js";
import Score from "./Score.js";
console.log(`Отзыв по пунктам ТЗ:\n

Не выполненные/не засчитанные пункты:

1) дополнительными баллами оценивается очень высокое качество оформления приложения, продуманность отдельных деталей интерфейса, улучшающие внешний вид приложения и удобство пользования им, а также выполненный на высоком уровне и сложный в реализации свой собственный дополнительный функционал, существенно улучшающий качество и/или возможности приложения

Частично выполненные пункты:

1) варианты ответов на вопросы генерируются случайным образом. В вариантах ответов на вопросы викторины должен быть правильный ответ и только один. Правильный ответ в разных вопросах должен находиться на разных местах, а не, например, всегда быть только первым. Варианты ответов должны быть разными. В вариантах ответов не должны повторяться картины одного и того же художника.

feedback: повторяются картины/художники

Выполненные пункты:

1) вёрстка, дизайн, UI стартовой страницы приложения. Выполняются требования к вёрстке и оформлению приложения. На стартовой странице есть кнопка, при клике по которой открываются настройки викторины, и две кнопки, при кликах по которым можно выбрать тип вопроса: угадать художника по картине, угадать картину по имени её автора

2) реализована навигация по страницам приложения. Со стартовой страницы при клике по кнопке с типом вопроса пользователь попадает на страницу категорий выбранного типа вопросов. Со страницы категорий пользователь может вернуться на стартовую страницу приложения. Со страницы категорий при клике по карточке категории пользователь попадает на страницу с вопросами категории. На карточке сыгранной категории есть кнопка или ссылка, при клике по которой пользователь попадает на страницу с результатами прохождения раунда. Со страницы с вопросами и со страницы с результатами пользователь может вернуться на страницу категорий или на стартовую страницу приложения

3) в настройках есть возможность включать/выключать звук, есть регулятор громкости звука. Если звук включён, есть звуковая индикация правильных и неправильных ответов, звуковое сопровождение окончания раунда

4) в настройках есть возможность включать/выключать игру на время. Если выбрана игра на время, на странице с вопросами викторины отображается таймер, отсчитывающий время, которое отведено для ответа на вопрос

5) в настройках можно указать время для ответа на вопрос в интервале от 5 до 30 секунд с шагом в 5 секунд. Если время истекает, а ответа нет, это засчитывается как неправильный ответ на вопрос

6) при перезагрузке страницы приложения настройки сохраняются

7) вёрстка, дизайн, UI страницы категории. Выполняются требования к вёрстке и оформлению приложения. На странице категорий размещаются карточки категорий. Карточки категорий могут иметь названия, или их можно просто пронумеровать.

8) карточка сыгранной категории внешне отличается от карточки категории, которая ещё не игралась

9) на карточке сыгранной категории отображается результат прохождения раунда - количество вопросов, на которые был дан правильный ответ

10) вёрстка, дизайн, UI страницы с вопросами. Выполняются требования к вёрстке и оформлению приложения. Вопросы в викторине идут в том порядке, в каком информация про картины и их авторов размещается в коллекции исходных данных.

11) правильным и неправильным ответам пользователя соответствуют индикаторы разного цвета

12) после того, как ответ выбран, появляется модальное окно с правильным ответом на вопрос и кнопкой "Продолжить". При клике по кнопке "Продолжить" пользователь переходит к следующему вопросу категории

13) после окончания раунда выводится уведомление об окончании раунда и отображается результат прохождения раунда - количество вопросов, на которые был дан правильный ответ. Есть кнопка "Продолжить" при клике по которой пользователь перенаправляется на страницу категорий данного типа вопросов

14) вёрстка, дизайн, UI страницы с результатами. Выполняются требования к вёрстке и оформлению приложения

15) страница с результатами содержит превью всех картин категории

16) картины, на вопросы про которые или про их авторов был дан правильный ответ, цветные; картины, на вопросы про которые или про их авторов был дан неправильный ответ, черно-белые

17) при клике по картине выводится информация о ней - название, автор, год создания

18) если раунд проигрывался повторно и результаты изменились, эти изменения отображаются на странице с результатами

19) Плавная смена изображений, картинки сначала загружаются, потом отображаются, нет ситуации, когда пользователь видит частично загрузившиеся изображения. Плавную смену изображений не проверяем: 1) при загрузке и перезагрузке приложения 2) при открытой консоли браузера

20) 5 баллов за каждую уникальную сложную анимацию, улучшающую интерфейс и удобство использования приложения, но не больше 20 баллов

feedback: 1. Смена страниц - всплывание 2. плавное появление дивов с ответами на вопрос/результатом категории 3. смена цвета текста и бекграунда при наведении на интерактивные элементы 4.прокрутка колесика на кнопке с настройками 5.увеличение при ховере на элементы домашней страницы, категорий и результатов по категории( у последней выделение цветом при наведении на черно-белые картины)`);
//variables
let state = {
  settingValues: {
    volume: "checked",
    vVal: 1,
    timer: "checked",
    tVal: 30,
  },
  qTracker: {
    artistQuestions: [...Array(12)].map((e) => new Array()),
    pictureQuestions: [...Array(12)].map((e) => new Array()),
  },
};
const home = new Home();
let settings = new Settings(state);
const artistsCat = new Category("artistQuestions", state);
const picturesCat = new Category("pictureQuestions", state);
let app = document.querySelector(".app");
let catType;
let score;
let interval;

//Functions

//setting Local storage and loading it

function setStorage() {
  localStorage.setItem("state", JSON.stringify(state));
}

function loadStorage() {
  if (localStorage.getItem("state")) {
    state = JSON.parse(localStorage.getItem("state"));
  }
}

window.addEventListener("beforeunload", setStorage);
window.addEventListener("load", () => {
  loadStorage();
  settings.updSound();

  switchPage(home);
});

//page switching

function switchPage(curPage) {
  app.children[0].style = "opacity:0.01;";

  app.innerHTML = curPage.html;
  addListeners();
  app.children[0].style = "opacity:0.01;";

  setTimeout(() => {
    app.children[0].style = "opacity:1;";
  }, 1000);

  clearInterval(interval);
}

//audio playing
function playAudio(name) {
  document.querySelector(`.${name}`).play();
}

//timer fuction

function timer() {
  if (state.settingValues.timer === "checked") {
    let counter = state.settingValues.tVal;
    interval = setInterval(() => {
      document.querySelector(".timer-tracker").innerHTML = "00:" + counter;
      counter--;

      if (counter === 0 && document.querySelector(`question`)) {
        clearInterval(interval);
        catType.updQtracker(catType.catId, "wrong");
        if (settings.settingValues.volume === "checked") {
          playAudio(`wrong-sound`);
        }
        document.querySelector(".answer-result").classList.toggle("hide-elem");
        document.querySelector(
          ".answer-symbol"
        ).innerHTML = `<i class="ans-icon fas fa-times"></i>`;
        document.querySelector(
          ".answer-result"
        ).style = `z-index:2; opacity:1;`;
      }

      if (
        document.querySelector(`.answer-result`).classList.contains("done") ||
        document.querySelector(".total-result").classList.contains("done")
      ) {
        clearInterval(interval);
      }
      if (!document.querySelector(".question")) {
        clearInterval(interval);
      }
    }, 1000);
  }
}

// listener set-up
function addListeners() {
  /*Menu*/
  document.querySelector(".app").addEventListener("click", () => {
    if (settings.settingValues.volume === "checked") {
      playAudio(`menu-click`);
    }
  });
  if (document.querySelector(".open-settings")) {
    document.querySelector(".open-settings").addEventListener("click", () => {
      settings = new Settings(state);
      switchPage(settings);
      settings.updValues();
    });
  }

  if (document.querySelector(".save-btn")) {
    document.querySelector(".save-btn").addEventListener("click", () => {
      switchPage(home);
    });
  }
  if (document.querySelector(".artists")) {
    document.querySelector(".artists").addEventListener("click", () => {
      catType = new Category("artistQuestions", state);
      switchPage(catType);
      catType.colorCat();
    });
  }

  if (document.querySelector(".pictures")) {
    document.querySelector(".pictures").addEventListener("click", () => {
      catType = new Category("pictureQuestions", state);
      switchPage(catType);
      catType.colorCat();
    });
  }

  /*Setting listeners*/

  if (document.querySelector(".volume-range")) {
    document
      .querySelector(".volume-range")
      .addEventListener("mousemove", () => {
        settings.updSound();
      });
  }
  if (document.querySelector(".volume-check")) {
    document.querySelector(".volume-check").addEventListener("click", () => {
      settings.mute();
    });
  }
  if (document.querySelector(".timer-range")) {
    document.querySelector(".timer-range").addEventListener("mousemove", () => {
      settings.updTimer();
    });
  }
  if (document.querySelector(".timer-check")) {
    document.querySelector(".timer-check").addEventListener("click", () => {
      settings.turnTimer();
    });
  }

  /*Categories*/

  if (document.querySelector(".home-btn")) {
    document.querySelector(".home-btn").addEventListener("click", () => {
      switchPage(home);
    });
  }
  if (document.querySelector(".cat-btn")) {
    document.querySelector(".cat-btn").addEventListener("click", () => {
      catType.qid = 0;
      let temp = catType.catType;
      catType = new Category(temp, state);
      switchPage(catType);
    });
  }
  if (document.querySelector(".categories-wrapper")) {
    document
      .querySelector(".categories-wrapper")
      .addEventListener("click", (e) => {
        if (e.target.id && e.target.classList.contains("category-image")) {
          catType.catId = e.target.id;
          state.qTracker[catType.catType][e.target.id] = [];
          let question = new Question(catType, e.target.id, 0, state);
          switchPage(question);
          question.setCorrect();
          timer();
        }
        if (e.target.id && e.target.classList.contains("score-total")) {
          catType.catId = e.target.id;
          score = new Score(catType, e.target.id, state);
          switchPage(score);
          score.colorIn();
        }
      });
  }

  /*Questions*/

  if (document.querySelector(".question-wrapper")) {
    document
      .querySelector(".question-wrapper")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("correct")) {
          catType.updQtracker(catType.catId, "correct");

          if (settings.settingValues.volume === "checked") {
            playAudio(`good-sound`);
          }
          document
            .querySelector(".answer-result")
            .classList.toggle("hide-elem");
          document.querySelector(".answer-result").classList.add("done");
          document.querySelector(
            ".answer-symbol"
          ).innerHTML = `<i class="ans-icon fas fa-check"></i>`;
          document.querySelector(
            ".answer-result"
          ).style = `z-index:2; opacity:1;`;
        } else if (
          e.target.classList.contains("picture-answer") ||
          e.target.classList.contains("name-answer")
        ) {
          catType.updQtracker(catType.catId, "wrong");
          if (settings.settingValues.volume === "checked") {
            playAudio(`wrong-sound`);
          }
          document
            .querySelector(".answer-result")
            .classList.toggle("hide-elem");
          document.querySelector(".answer-result").classList.add("done");
          document.querySelector(
            ".answer-symbol"
          ).innerHTML = `<i class="ans-icon fas fa-times"></i>`;
          document.querySelector(
            ".answer-result"
          ).style = `z-index:2; opacity:1;`;
        }
      });
  }
  if (
    document.querySelector(".answer-result") &&
    document.querySelector(".question")
  ) {
    document.querySelector(".answer-result").addEventListener("click", () => {
      catType.qid += 1;
      if (catType.qid === 10) {
        document.querySelector(".result-num").innerHTML = `${
          document.querySelectorAll(".right").length
        }/10`;
        if (settings.settingValues.volume === "checked") {
          playAudio(`cheering`);
        }

        document.querySelector(".total-result").classList.toggle("hide-elm");
        document.querySelector(".answer-result").classList.add("done");
        document.querySelector(".total-result").style = "z-index:3; opacity:1;";
      } else {
        let question = new Question(catType, catType.catId, catType.qid, state);
        switchPage(question);
        question.setCorrect();
        question.updPagination();
        timer();
      }
    });
  }
  if (document.querySelector(".total-result")) {
    document.querySelector(".total-result").addEventListener("click", () => {
      catType.qid = 0;
      let temp = catType.catType;
      catType = new Category(temp, state);
      switchPage(catType);
      catType.colorCat();
    });
  }
  /*Total*/

  if (document.querySelector(".total")) {
    document.querySelector(".total").addEventListener("click", (e) => {
      if (e.target.id) {
        document.querySelector(
          ".question-image"
        ).style = `background-image:url(assets/img/${
          catType.questions[catType.catType][catType.catId][e.target.id]
            .imageNum
        }.jpg);`;
        document.querySelector(".picture-name").innerHTML = `${
          catType.questions[catType.catType][catType.catId][e.target.id].name
        }`;
        document.querySelector(".picture-author").innerHTML = `${
          catType.questions[catType.catType][catType.catId][e.target.id].author
        }`;
        document.querySelector(".picture-year").innerHTML = `${
          catType.questions[catType.catType][catType.catId][e.target.id].year
        }`;
        document.querySelector(".answer-result").classList.toggle("hide-elem");
        document.querySelector(
          ".answer-result"
        ).style = `z-index:2; opacity:1;`;
      }
      if (document.querySelector(".answer-result")) {
        document
          .querySelector(".answer-result")
          .addEventListener("click", () => {
            document.querySelector(".answer-result").style =
              "z-index:2; opacity:0;";
            document.querySelector(".answer-result").style = "z-index:-1;";
            document
              .querySelector(".answer-result")
              .classList.toggle("hide-elem");
          });
      }
    });
  }
}
