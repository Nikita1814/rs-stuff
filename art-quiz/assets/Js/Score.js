class Score {
    constructor(Category, catId, state){
        this.category = Category
        this.catId = catId
        this.state = state
        this.html = `
        <div class="total ">
                <div class="buttons-div">
                    <div class="question-btn home-btn"> <i class="fas fa-home"></i></div>
                    <div class="question-btn cat-btn"><i class="fas fa-bars"></i></div>
                </div>
                <h1>Score</h1>
                <div class="total-wrapper">
                    <div class="total-image grey-Bg" style="background-image:url(assets/img/${Category.questions[Category.catType][catId][0].imageNum}.jpg);">
                        <p>${Category.questions[Category.catType][catId][0].name}</p>
                    </div>
                    <div class="total-image grey-Bg" style="background-image:url(assets/img/${Category.questions[Category.catType][catId][1].imageNum}.jpg);">
                       <p>${Category.questions[Category.catType][catId][1].name}</p>

                    </div>
                    <div class="total-image grey-Bg " style="background-image:url(assets/img/${Category.questions[Category.catType][catId][2].imageNum}.jpg);">
                        <p>${Category.questions[Category.catType][catId][2].name}</p>

                    </div>
                    <div class="total-image grey-Bg " style="background-image:url(assets/img/${Category.questions[Category.catType][catId][3].imageNum}.jpg);">
                        <p>${Category.questions[Category.catType][catId][3].name}</p>

                   
                    </div>
                    <div class="total-image grey-Bg " style="background-image:url(assets/img/${Category.questions[Category.catType][catId][4].imageNum}.jpg);">
                        <p>${Category.questions[Category.catType][catId][4].name}</p>
 
                    </div>
                    <div class="total-image grey-Bg " style="background-image:url(assets/img/${Category.questions[Category.catType][catId][5].imageNum}.jpg);">
                        <p>${Category.questions[Category.catType][catId][5].name}</p>
 
                    </div>
                    <div class=" total-image grey-Bg " style="background-image:url(assets/img/${Category.questions[Category.catType][catId][6].imageNum}.jpg);">
                        <p>${Category.questions[Category.catType][catId][6].name}</p>

                    </div>
                    <div class=" total-image grey-Bg  " style="background-image:url(assets/img/${Category.questions[Category.catType][catId][7].imageNum}.jpg);">
                        <p>${Category.questions[Category.catType][catId][7].name}</p>

                    </div>
                    <div class=" total-image grey-Bg  " style="background-image:url(assets/img/${Category.questions[Category.catType][catId][8].imageNum}.jpg);">
                        <p>${Category.questions[Category.catType][catId][8].name}</p>

                    </div>
                    <div class=" total-image grey-Bg " style="background-image:url(assets/img/${Category.questions[Category.catType][catId][9].imageNum}.jpg);">
                        <p>${Category.questions[Category.catType][catId][9].name}</p>
  
                    </div>

                </div>
        `
    }
    colorIn(){
        let totalImages = document.querySelectorAll('.total-image')
        console.log(totalImages)
        this.state.qTracker[this.category.catType][this.catId].forEach((el, index)=>{
            if(el ==='correct'){
             totalImages[index].classList.toggle('grey-Bg')
            }
        })
    }
}
export default Score