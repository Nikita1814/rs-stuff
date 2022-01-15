class GaragePage {
    garageMenu: Object
    garageGrid: Object
    constructor() {
        this.garageMenu = {}
        this.garageGrid = {}
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
        <h1>Garage(7)</h1>
        <div data-page-num="1" class="garage-page">
            <h2>Page #1</h2>
            <div data-track-name="Tesla" data-track-car=""class="car-track">
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
      `
    }
    addListeners() {
        console.log('I add listeners to page')
    }
}
export default GaragePage
