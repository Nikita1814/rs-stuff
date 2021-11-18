import Home from './Home.js'
import Settings from './Settings.js'

let curPage = Home

const app = document.querySelector('.app')
function SwitchPage(){
app.innerHTML = curPage.html
addListeners()
}

SwitchPage()



function addListeners(){
    if(document.querySelector('.open-settings')){
    document.querySelector('.open-settings').addEventListener('click', () =>{
       curPage = Settings
       SwitchPage() 
    })
    }

    if(document.querySelector('.save-btn')){
        document.querySelector('.save-btn').addEventListener('click', () =>{
           curPage = Home
           SwitchPage() 
        })
        }
}



  

