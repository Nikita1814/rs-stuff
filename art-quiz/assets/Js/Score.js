class Score {
  constructor(category, catId, state) {
    this.category = category;
    this.catId = catId;
    this.state = state;
    this.html = `
        <div class="total conceal-elem">
        <div class="answer-result hide-elem">
        <div class="question-image"></div>
        <p class="picture-name"></p>
        <p class="picture-author"></p>
        <p class="picture-year"></p>
    </div>
                <div class="buttons-div">
                    <div class="question-btn home-btn"> <i class="fas fa-home"></i></div>
                    <div class="question-btn cat-btn"><i class="fas fa-bars"></i></div>
                </div>
                <h1>Score</h1>
                <div class="total-wrapper">
                    <div class="total-image grey-bg" id="0" style="background-image:url(assets/img/${
                      category.questions[category.catType][catId][0].imageNum
                    }.jpg);">
                        <p>${
                          category.questions[category.catType][catId][0].name
                        }</p>
                    </div>
                    <div class="total-image grey-bg" id="1" style="background-image:url(assets/img/${
                      category.questions[category.catType][catId][1].imageNum
                    }.jpg);">
                       <p>${
                         category.questions[category.catType][catId][1].name
                       }</p>

                    </div>
                    <div class="total-image grey-bg" id="2" style="background-image:url(assets/img/${
                      category.questions[category.catType][catId][2].imageNum
                    }.jpg);">
                        <p>${
                          category.questions[category.catType][catId][2].name
                        }</p>

                    </div>
                    <div class="total-image grey-bg" id="3" style="background-image:url(assets/img/${
                      category.questions[category.catType][catId][3].imageNum
                    }.jpg);">
                        <p>${
                          category.questions[category.catType][catId][3].name
                        }</p>

                   
                    </div>
                    <div class="total-image grey-bg" id="4" style="background-image:url(assets/img/${
                      category.questions[category.catType][catId][4].imageNum
                    }.jpg);">
                        <p>${
                          category.questions[category.catType][catId][4].name
                        }</p>
 
                    </div>
                    <div class="total-image grey-bg" id="5" style="background-image:url(assets/img/${
                      category.questions[category.catType][catId][5].imageNum
                    }.jpg);">
                        <p>${
                          category.questions[category.catType][catId][5].name
                        }</p>
 
                    </div>
                    <div class=" total-image grey-bg" id="6" style="background-image:url(assets/img/${
                      category.questions[category.catType][catId][6].imageNum
                    }.jpg);">
                        <p>${
                          category.questions[category.catType][catId][6].name
                        }</p>

                    </div>
                    <div class=" total-image grey-bg" id="7" style="background-image:url(assets/img/${
                      category.questions[category.catType][catId][7].imageNum
                    }.jpg);">
                        <p>${
                          category.questions[category.catType][catId][7].name
                        }</p>

                    </div>
                    <div class=" total-image grey-bg" id="8" style="background-image:url(assets/img/${
                      category.questions[category.catType][catId][8].imageNum
                    }.jpg);">
                        <p>${
                          category.questions[category.catType][catId][8].name
                        }</p>

                    </div>
                    <div class=" total-image grey-bg" id="9" style="background-image:url(assets/img/${
                      category.questions[category.catType][catId][9].imageNum
                    }.jpg);">
                        <p>${
                          category.questions[category.catType][catId][9].name
                        }</p>
  
                    </div>

                </div>
        `;
  }
  colorIn() {
    let totalImages = document.querySelectorAll(".total-image");
    this.state.qTracker[this.category.catType][this.catId].forEach(
      (el, index) => {
        if (el === "correct") {
          totalImages[index].classList.toggle("grey-bg");
        }
      }
    );
  }
}
export default Score;
