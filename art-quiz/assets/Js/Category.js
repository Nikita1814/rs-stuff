
import images from "./images.js"
/*async function genData(){
    let images = 'assets/Js/images.json'
    const res = await fetch(images)
    const data = await res.json()
    return data
 }
 */
 const splitArr = function(array, size){
    let newArr = []
    for (let i = 0; i< array.length; i+=size){
        let chunk = array.slice(i, i+ size)
        newArr.push(chunk)
    } 
    return newArr
     }
    


     const genAnswers = function(srcArr){
        let newArr = []
        srcArr.forEach((el) => {newArr.push(el.author)})
        return newArr
     }
    
     const artistQuestions = splitArr(images,120)[0] 
     const pictureQuestions = splitArr(images,120)[1]
    

    
    const artistAnswers = genAnswers(artistQuestions)
    const pictureAnswers = genAnswers(pictureQuestions)
    
     const answers = {
        artistAnswers:  artistAnswers,
        pictureAnswers: pictureAnswers
     }
     /*splitArr(authorQuestions,12),*/
     const questions = {
       
       artistQuestions: splitArr(artistQuestions,10),
       pictureQuestions: splitArr(pictureQuestions,10),

     }
    

    class Category {
        constructor(catType){
            this.catType = catType
            this.questions = questions
            this.answers = answers
            this.html = `<div class="categories">
            <div class="categories-wrapper">
                <div class="settings-top">
                    <div class="logo">
                    </div>
                    <h1>Categories</h1>
                    <div class="setting-button home-btn"><i class="fas fa-home"></i>Home</div>
                </div>

                <div class="category-item ">
                    <div class="category-image cat-item-1" style="background-image: url(assets/img/${this.questions[this.catType][0][0].imageNum}.jpg);"></div>
                    <h2>Portrait</h2>
                </div>
                <div class="category-item ">
                    <div class="category-image cat-item-2" style="background-image: url(assets/img/${this.questions[this.catType][1][0].imageNum}.jpg);"></div>
                    <h2>Landcape</h2>
                </div>
                <div class="category-item">
                    <div class="category-image cat-item-3" style="background-image: url(assets/img/${this.questions[this.catType][2][0].imageNum}.jpg);"></div>
                    <h2>Still Life</h2>
                </div>
                <div class="category-item">
                    <div class="category-image cat-item-4" style="background-image: url(assets/img/${this.questions[this.catType][3][0].imageNum}.jpg);"></div>
                    <h2>Graphic</h2>
                </div>
                <div class="category-item">
                    <div class="category-image cat-item-5" style="background-image: url(assets/img/${this.questions[this.catType][4][0].imageNum}.jpg);"></div>
                    <h2>Antique</h2>
                </div>
                <div class="category-item">
                    <div class="category-image cat-item-6" style="background-image: url(assets/img/${this.questions[this.catType][5][0].imageNum}.jpg);"></div>
                    <h2>Avant-Garde</h2>
                </div>
                <div class="category-item">
                    <div class="category-image cat-item-7" style="background-image: url(assets/img/${this.questions[this.catType][6][0].imageNum}.jpg);"></div>
                    <h2>Renaissance</h2>
                </div>
                <div class="category-item">
                    <div class="category-image cat-item-8" style="background-image: url(assets/img/${this.questions[this.catType][7][0].imageNum}.jpg);"></div>
                    <h2>Surrealism</h2>
                </div>
                <div class="category-item ">
                    <div class="category-image cat-item-9" style="background-image: url(assets/img/${this.questions[this.catType][8][0].imageNum}.jpg);"></div>
                    <h2>Kitsch</h2>
                </div>
                <div class="category-item ">
                    <div class="category-image cat-item-10" style="background-image: url(assets/img/${this.questions[this.catType][9][0].imageNum}.jpg);"></div>
                    <h2>Minimalism</h2>
                </div>
                <div class="category-item">
                    <div class="category-image cat-item-11" style="background-image: url(assets/img/${this.questions[this.catType][10][0].imageNum}.jpg);"></div>
                    <h2>Avangard</h2>
                </div>
                <div class="category-item">
                    <div class="category-image cat-item-12" style="background-image: url(assets/img/${this.questions[this.catType][11][0].imageNum}.jpg);""></div>
                    <h2>Industrial</h2>
                </div>
            </div>
        </div>`
     
        }
        testfun (){

            /*console.log(questions.paintingQuestions)*/

        }
    }
    export default Category