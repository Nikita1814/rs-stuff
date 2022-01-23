import { GarageGrid } from './garage-grid/garage-grid'
import GarageMenu from './garage-page-menu/garage-page-menu'

class GaragePage {
    garageMenu: GarageMenu
    garageGrid: GarageGrid
    constructor() {
        this.garageGrid = new GarageGrid()
        this.garageMenu = new GarageMenu(this.garageGrid)
    }
    render() {
        ;(document.querySelector('.main') as HTMLElement).innerHTML = `
        <div class="announcement-overlay hidden">
        <div class="announcement">
        <div class = "announcement-flag"></div>
         <h1 class="announcement-name">Car Won!</h1>
         <h2 class="announcement-seconds">(s)</h2>
         <button class="garage-button button-green close-announcement">Close</button>
        </div>
        </div>
      <div class="garage-page" >
        <div class="garage-menu">
            <div>
                <input type="text" class="create-name"> <input type="color" class="create-color"> <button class="garage-button button-white create-btn">Create</button>
            </div>
            <div>
                <input type="text" class="update-name" disabled> <input type="color" class="update-color"> <button class="garage-button button-white update-btn disabled">Update</button>
            </div>
            <div>
                <button class="garage-button race-btn button-green">Race</button> 
                <button class="garage-button reset-btn button-green">Reset</button> 
                <button class="garage-button generate-btn">Generate Cars</button>
            </div>
        </div>
        <h1 class="car-count">Garage(7)</h1>
        <div class="garage-grid">
        <div data-page-num="1" class="garage-grid-page">
            <h2>Page #1</h2>
            <div data-track-name="Tesla" data-track-id=""class="car-track">
                <div class="car-track-top">
                    <button class="garage-button car-select button-white">Select</button>
                    <button class="garage-button car-remove button-white">Remove</button>
                    <h3 class="car-title">Tesla</h3>
                </div>
                <div class="car-track-bottom">
                    <div class="activation-btns">
                        <button class="activation-btn start-btn">A</button>
                        <button class="activation-btn stop-btn">B</button>
                        </div>
                        <div class="race-car"></div>
                </div>
            </div>
        </div>
        </div>
        <div class="garage-page-controls">
        <button data-direction="prev" class ="garage-button button-green">Previous</button>
        <button data-direction="next" class ="garage-button button-green">Next</button>
        </div>
    </div>
      `
        this.garageGrid.render()
        this.addListeners()
    }
    addListeners() {
        this.garageGrid.addListeners()
        this.garageMenu.addListeners()
        document.querySelector('.generate-btn')?.addEventListener('click', this.getCars)
        document.querySelector('.close-announcement')?.addEventListener('click', ()=>{
            document.querySelector('.announcement-overlay')?.classList.add('hidden')
        })
    }
    async getCars() {
        console.log('i work')
        const res = await fetch(`http://127.0.0.1:3000/garage?_page=1&_limit=7`)
        console.log([...res.headers.entries()].find((el) => el[0] === 'x-total-count')?.[1])
        if (res.ok) {
            const arr = await res.json()
            console.log(arr)
        } else {
            console.log('an error occured')
        }
    }
    switchPage(direction: string) {
        direction === 'next' && this.garageGrid.currentPage
    }
}
export default GaragePage
