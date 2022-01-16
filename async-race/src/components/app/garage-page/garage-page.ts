import GarageGrid from './garage-grid/garage-grid'

class GaragePage {
    garageMenu: Object
    garageGrid: GarageGrid
    constructor() {
        this.garageMenu = {}
        this.garageGrid = new GarageGrid()
    }
    render() {
        ;(document.querySelector('.main') as HTMLElement).innerHTML = `
      <div class="garage-page" >
        <div class="garage-menu">
            <div>
                <input type="text"> <input type="color"> <button class="garage-button button-white">Create</button>
            </div>
            <div>
                <input type="text"> <input type="color"> <button class="garage-button button-white">Update</button>
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
        document.querySelector('.generate-btn')?.addEventListener('click', this.getCars)
    }
    async getCars() {
        console.log('i work')
        const res = await fetch(`http://127.0.0.1:3000/garage?_page=2&_limit=2`)
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
