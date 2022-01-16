class WinnersPage {
    constructor() {}
    render() {
        ;(document.querySelector('.main') as HTMLElement).innerHTML = `
      <div class="winners-page"">
            <h1>Winners!</h1>

            <div class="winners-table">
                <div class="winners-table-top winners-table-row">
                    <p>Number</p>
                    <p>Car</p>
                    <p>Name</p>
                    <p>Wins</p>
                    <p>Best Time(seconds)</p>
                </div>
                <div data-winning-car="idk-yet" class="winners-table-winner winners-table-row">
                    <p>1</p>
                    <div class="car winner-car"></div>
                    <p>Tesla</p>
                    <p>1</p>
                    <p>10</p>
                </div>
                <div data-winning-car="idk-yet" class="winners-table-winner winners-table-row">
                    <p>2</p>
                    <div class="car winner-car"></div>
                    <p>Tesla</p>
                    <p>1</p>
                    <p>10</p>
                </div>
                <div data-winning-car="idk-yet" class="winners-table-winner winners-table-row">
                    <p>3</p>
                    <div class="car winner-car"></div>
                    <p>Tesla</p>
                    <p>1</p>
                    <p>10</p>
                </div>
                <div data-winning-car="idk-yet" class="winners-table-winner winners-table-row">
                    <p>4</p>
                    <div class="car winner-car"></div>
                    <p>Tesla</p>
                    <p>1</p>
                    <p>10</p>
                </div>
                <div data-winning-car="idk-yet" class="winners-table-winner winners-table-row">
                    <p>5</p>
                    <div class="car winner-car"></div>
                    <p>Tesla</p>
                    <p>1</p>
                    <p>10</p>
                </div>
                <div data-winning-car="idk-yet" class="winners-table-winner winners-table-row">
                    <p>6</p>
                    <div class="car winner-car"></div>
                    <p>Tesla</p>
                    <p>1</p>
                    <p>10</p>
                </div>
                <div data-winning-car="idk-yet" class="winners-table-winner winners-table-row">
                    <p>7</p>
                    <div class="car winner-car"></div>
                    <p>Tesla</p>
                    <p>1</p>
                    <p>10</p>
                </div>
                <div class="winners-table-row">
                    <button class="garage-button previous button-green"> Prev</button>
                    <h2 class="winner-page-header">Page #1</h2>
                    <button class="garage-button previous button-green">Next</button>
                </div>
            </div>
        </div>
      `
    }
    addListneners() {
        return
    }
}
export default WinnersPage
