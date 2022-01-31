import { GaragePage } from '../garage-page/garage-page'
import WinnersPage from '../winners-page/winners-page'

class PageHeader {
  garage: GaragePage
  winners: WinnersPage
  activePage: WinnersPage | GaragePage
  constructor(garage: GaragePage, winners: WinnersPage) {
    this.garage = garage
    this.winners = winners
    this.activePage = this.garage
  }
  render(): void {
    const header = document.createElement('header')
    header.innerHTML = `
        <div class="header-cover hidden"></div>
    <nav class="page-navigation">
        <a href="#garage" class="page-link button-green active-link">To Garage</a>
        <a href="#winners" class="page-link button-green "> To Winners</a>
    </nav>
    `
    const main = document.createElement('main')
    main.classList.add('main')
    document.querySelector('.body').append(header)
    document.querySelector('.body').append(main)
    this.addListeners()
  }
  addListeners(): void {
    window.addEventListener('hashchange', (e) => {
      this.garage.garageGrid.controller.winner = null
      if (this.activePage === this.garage) {
        this.garage.garageGrid.controller.resetRace()
      }
      this.switchPage(e)
    })
  }
  switchPage(e: HashChangeEvent): void {
    document.querySelectorAll('.page-link')?.forEach((link) => {
      link.classList.remove('active-link')
    })
    document.querySelector(`[href='#${e.newURL.split('#')[1]}']`)?.classList.toggle('active-link')
    switch (e.newURL.split('#')[1]) {
      case 'garage':
        this.garage.render()
        break
      case 'winners':
        this.winners.render()
        break
    }
  }
}
export default PageHeader
