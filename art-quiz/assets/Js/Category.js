import images from "./images.js";

const splitArr = function (array, size) {
  let newArr = [];
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size);
    newArr.push(chunk);
  }
  return newArr;
};

const genAnswers = function (srcArr) {
  let newArr = [];
  srcArr.forEach((el) => {
    newArr.push(el.author);
  });
  return newArr;
};

const artistQuestions = splitArr(images, 120)[0];
const pictureQuestions = splitArr(images, 120)[1];

const artistAnswers = genAnswers(artistQuestions);
const pictureAnswers = genAnswers(pictureQuestions);

const answers = {
  artistAnswers: splitArr(artistAnswers, 10),
  pictureAnswers: splitArr(pictureAnswers, 10),
};

const questions = {
  artistQuestions: splitArr(artistQuestions, 10),
  pictureQuestions: splitArr(pictureQuestions, 10),
};

class Category {
  constructor(catType, state) {
    this.state = state;
    this.qTracker = [...Array(12)].map((e) => new Array());
    this.catType = catType;
    this.questions = questions;
    this.answers = answers;
    this.catId = 0;
    this.qid = 0;
    this.html = `<div class="categories conceal-elem">
            <div class="categories-wrapper">
                <div class="settings-top">
                    <div class="logo">
                    </div>
                    <h1>Categories</h1>
                    <div class="setting-button home-btn"><i class="fas fa-home"></i>Home</div>
                </div>

                <div class="category-item ">
                    <h2 class="score-total" id="0">Score</h2>
                    <div class="category-image" id="0" style="background-image: url(assets/img/${
                      this.questions[this.catType][0][0].imageNum
                    }.jpg);"></div>
                    <h2>${
                      state.qTracker[this.catType][0].filter(
                        (x) => x === "correct"
                      ).length
                    } Portrait</h2>
                </div>
                <div class="category-item ">
                    <h2 class="score-total" id="1">Score</h2>
                    <div class="category-image" id="1" style="background-image: url(assets/img/${
                      this.questions[this.catType][1][0].imageNum
                    }.jpg);"></div>
                    <h2>${
                      state.qTracker[this.catType][1].filter(
                        (x) => x === "correct"
                      ).length
                    } Landcape</h2>
                </div>
                <div class="category-item">
                    <h2 class="score-total" id="2">Score</h2>
                    <div class="category-image" id="2" style="background-image: url(assets/img/${
                      this.questions[this.catType][2][0].imageNum
                    }.jpg);"></div>
                    <h2>${
                      state.qTracker[this.catType][2].filter(
                        (x) => x === "correct"
                      ).length
                    } Still Life</h2>
                </div>
                <div class="category-item">
                    <h2 class="score-total" id="3">Score</h2>
                    <div class="category-image" id="3" style="background-image: url(assets/img/${
                      this.questions[this.catType][3][0].imageNum
                    }.jpg);"></div>
                    <h2>${
                      state.qTracker[this.catType][3].filter(
                        (x) => x === "correct"
                      ).length
                    } Graphic</h2>
                </div>
                <div class="category-item">
                    <h2 class="score-total" id="4">Score</h2>
                    <div class="category-image" id="4" style="background-image: url(assets/img/${
                      this.questions[this.catType][4][0].imageNum
                    }.jpg);"></div>
                    <h2>${
                      state.qTracker[this.catType][4].filter(
                        (x) => x === "correct"
                      ).length
                    } Antique</h2>
                </div>
                <div class="category-item">
                    <h2 class="score-total" id="5">Score</h2>
                    <div class="category-image" id="5" style="background-image: url(assets/img/${
                      this.questions[this.catType][5][0].imageNum
                    }.jpg);"></div>
                    <h2>${
                      state.qTracker[this.catType][5].filter(
                        (x) => x === "correct"
                      ).length
                    } Avant-Garde</h2>
                </div> 
                <div class="category-item">
                    <h2 class="score-total" id="6">Score</h2>
                    <div class="category-image" id="6" style="background-image: url(assets/img/${
                      this.questions[this.catType][6][0].imageNum
                    }.jpg);"></div>
                    <h2>${
                      state.qTracker[this.catType][6].filter(
                        (x) => x === "correct"
                      ).length
                    } Renaissance</h2>
                </div>
                <div class="category-item">
                     <h2 class="score-total" id="7">Score</h2>
                    <div class="category-image" id="7" style="background-image: url(assets/img/${
                      this.questions[this.catType][7][0].imageNum
                    }.jpg);"></div>
                    <h2>${
                      state.qTracker[this.catType][7].filter(
                        (x) => x === "correct"
                      ).length
                    } Surrealism</h2>
                </div>
                <div class="category-item ">
                    <h2 class="score-total" id="8">Score</h2>
                    <div class="category-image" id="8" style="background-image: url(assets/img/${
                      this.questions[this.catType][8][0].imageNum
                    }.jpg);"></div>
                    <h2>${
                      state.qTracker[this.catType][8].filter(
                        (x) => x === "correct"
                      ).length
                    } Kitsch</h2>
                </div>
                <div class="category-item ">
                    <h2 class="score-total" id="9">Score</h2>
                    <div class="category-image" id="9" style="background-image: url(assets/img/${
                      this.questions[this.catType][9][0].imageNum
                    }.jpg);"></div>
                    <h2>${
                      state.qTracker[this.catType][9].filter(
                        (x) => x === "correct"
                      ).length
                    } Minimalism</h2>
                </div>
                <div class="category-item">
                    <h2 class="score-total" id="10">Score</h2>
                    <div class="category-image" id="10" style="background-image: url(assets/img/${
                      this.questions[this.catType][10][0].imageNum
                    }.jpg);"></div>
                    <h2>${
                      state.qTracker[this.catType][10].filter(
                        (x) => x === "correct"
                      ).length
                    } Avangard</h2>
                </div>
                <div class="category-item">
                    <h2 class="score-total" id="11">Score</h2>
                    <div class="category-image" id="11" style="background-image: url(assets/img/${
                      this.questions[this.catType][11][0].imageNum
                    }.jpg);""></div>
                    <h2>${
                      state.qTracker[this.catType][11].filter(
                        (x) => x === "correct"
                      ).length
                    } Industrial</h2>
                </div>
            </div>
        </div>`;
  }
  testfun() {
    console.log(this.questions.pictureQuestions);
    console.log(this.answers.pictureAnswers);
    console.log(this.questions.artistQuestions);
    console.log(this.answers.artistAnswers);
    /*console.log(questions.paintingQuestions)*/
  }
  updQtracker(id, answer) {
    console.log(this.state.qTracker);
    this.state.qTracker[this.catType][id].push(answer);
  }
  colorCat(){
   let catImages = document.querySelectorAll('.category-image')
   this.state.qTracker[this.catType].forEach((el, index)=> {if (el.length === 0){
   catImages[index].classList.toggle('grey-Bg')
   }})   
  }
}

class Question {
  constructor(Category, catId, qid, state) {
    this.category = Category;
    this.catId = catId;
    this.qid = qid;
    this.state = state;
    this.correctAnswer = Math.floor(Math.random() * (3 - 0 + 1) + 0);

    if (Category.catType === "pictureQuestions") {
      this.html = `<div class="question conceal-elem conceal-elem ">
          <div class="answer-result hide-elem">
                    <div class="answer-symbol"><i class="ans-icon fas fa-check"></i></div>
                    <div class="question-image" style="background-image:url(assets/img/${
                      Category.questions[Category.catType][catId][qid].imageNum
                    }.jpg);"></div>
                    <p> ${
                      Category.questions[Category.catType][catId][qid].name
                    }</p>
                    <p> ${
                      Category.questions[Category.catType][catId][qid].author
                    }</p>
                    <p> ${
                      Category.questions[Category.catType][catId][qid].year
                    }</p>
                    <div class="question-btn"><i class="fas fa-arrow-right"></i></div>
                </div>
                <div class="total-result hide-elem ">
                    <p>Поздравляем</p>
                    <i class=" star-icon fas fa-star"></i>
                    <p class = result-num>${
                      document.querySelectorAll(".right").length
                    }/10</p>
                    <div class="question-btn"> <i class="fas fa-arrow-right"></i> </div>
                </div>
               
          <div class="buttons-div">
              <div class="question-btn home-btn"><i class="fas fa-home"></i></div>
              <h1 class="timer-tracker"></h1>
              <div class="question-btn cat-btn"><i class="fas fa-bars"></i></div>
          </div>
          <h1>Кто автор этой картины?</h1>
          <div class="question-wrapper">
              <div class="question-image" style="background-image:url(assets/img/${
                Category.questions[Category.catType][catId][qid].imageNum
              }.jpg);"></div>
              <div class="score">
                  <div class="score-point"></div>
                  <div class="score-point"></div>  
                  <div class="score-point"></div>
                  <div class="score-point"></div>  
                  <div class="score-point"></div>
                  <div class="score-point"></div>  
                  <div class="score-point"></div>
                  <div class="score-point"></div> 
                  <div class="score-point"></div> 
                  <div class="score-point"></div> 
              </div>
              <div class="answer-grid">
                 <div class="name-answer" id ="ans-0">${
                   Category.answers.pictureAnswers[
                     Math.floor(Math.random() * (11 - 0 + 1) + 0)
                   ][Math.floor(Math.random() * (9 - 0 + 1) + 0)]
                 }</div>
                 <div class="name-answer" id ="ans-1">${
                   Category.answers.pictureAnswers[
                     Math.floor(Math.random() * (11 - 0 + 1) + 0)
                   ][Math.floor(Math.random() * (9 - 0 + 1) + 0)]
                 }</div>
                 <div class="name-answer" id ="ans-2">${
                   Category.answers.pictureAnswers[
                     Math.floor(Math.random() * (11 - 0 + 1) + 0)
                   ][Math.floor(Math.random() * (9 - 0 + 1) + 0)]
                 }</div>
                 <div class="name-answer" id ="ans-3">${
                   Category.answers.pictureAnswers[
                     Math.floor(Math.random() * (11 - 0 + 1) + 0)
                   ][Math.floor(Math.random() * (9 - 0 + 1) + 0)]
                 }</div>
              </div>
          </div>
      </div>`;
    }
    if (Category.catType === "artistQuestions") {
      this.html = ` <div class="content-container conceal-elem">
            <div class="question picture-question ">
            <div class="answer-result hide-elem" >
            <div class="answer-symbol"><i class="ans-icon fas fa-check"></i></div>
            <div class="question-image" style="background-image:url(assets/img/${
              this.category.questions.artistQuestions[this.catId][this.qid]
                .imageNum
            }.jpg);"></div>
            <p> ${Category.questions[Category.catType][catId][qid].name}</p>
            <p> ${Category.questions[Category.catType][catId][qid].author}</p>
            <p> ${Category.questions[Category.catType][catId][qid].year}</p>
            <div class="question-btn next-question"><i class="fas fa-arrow-right"></i></div>
        </div>
        <div class="total-result hide-elem ">
            <p>Поздравляем</p>
            <i class=" star-icon fas fa-star"></i>
            <p class = result-num>${
              document.querySelectorAll(".right").length
            }/10</p>
           
            <div class="question-btn"> <i class="fas fa-arrow-right"></i> </div>
        </div>
            <div class="buttons-div">
                <div class="question-btn home-btn"> <i class="fas fa-home"></i></div>
                <h1 class="timer-tracker"></h1>
                <div class="question-btn cat-btn"><i class="fas fa-bars"></i></div>
            </div>
            <div class="question-wrapper">
                <h1>Какую Картину написал ${
                  Category.answers.artistAnswers[catId][qid]
                }?</h1>
                <div class="score">
                    <div class="score-point"></div>
                    <div class="score-point"></div>
                    <div class="score-point"></div>
                    <div class="score-point"></div>
                    <div class="score-point"></div>
                    <div class="score-point"></div>
                    <div class="score-point"></div>
                    <div class="score-point"></div>
                    <div class="score-point"></div>
                    <div class="score-point"></div>
                </div>
                <div class="answer-grid">
                    <div class="picture-answer" style="background-image:url(assets/img/${
                      Category.questions[Category.catType][
                        Math.floor(Math.random() * (11 - 0 + 1) + 0)
                      ][Math.floor(Math.random() * (9 - 0 + 1) + 0)].imageNum
                    }.jpg);" id ="ans-0"></div>
                    <div class="picture-answer" style="background-image:url(assets/img/${
                      Category.questions[Category.catType][
                        Math.floor(Math.random() * (11 - 0 + 1) + 0)
                      ][Math.floor(Math.random() * (9 - 0 + 1) + 0)].imageNum
                    }.jpg);" id ="ans-1"></div>
                    <div class="picture-answer" style="background-image:url(assets/img/${
                      Category.questions[Category.catType][
                        Math.floor(Math.random() * (11 - 0 + 1) + 0)
                      ][Math.floor(Math.random() * (9 - 0 + 1) + 0)].imageNum
                    }.jpg);" id ="ans-2"></div>
                    <div class="picture-answer" style="background-image:url(assets/img/${
                      Category.questions[Category.catType][
                        Math.floor(Math.random() * (11 - 0 + 1) + 0)
                      ][Math.floor(Math.random() * (9 - 0 + 1) + 0)].imageNum
                    }.jpg);" id ="ans-3"></div>
                </div>
            </div>
        </div>
        </div>`;
    }
  }

  setCorrect() {
    let correctOption = document.getElementById(`ans-${this.correctAnswer}`);
    console.log(correctOption);
    correctOption.classList.toggle(`correct`);

    if (this.category.catType === `pictureQuestions`) {
      correctOption.innerHTML = `${
        this.category.answers.pictureAnswers[this.catId][this.qid]
      }`;
    }

    if (this.category.catType === `artistQuestions`) {
      correctOption.style = `background-image:url(assets/img/${
        this.category.questions.artistQuestions[this.catId][this.qid].imageNum
      }.jpg);`;
    }
  }

  updPagination() {
    let pagCollection = document.querySelectorAll(`.score-point`);
    this.state.qTracker[this.category.catType][this.catId].forEach(
      (el, index) => {
        if (el === "correct") {
          console.log(pagCollection[index]);
          pagCollection[index].classList.add("right");
        }
        if (el === "wrong") {
          console.log(pagCollection[index]);
          pagCollection[index].classList.add("wrong");
        }
        return el;
      }
    );
  }
}
export { Category, Question };
