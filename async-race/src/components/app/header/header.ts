class Header {
    curPage: string
    constructor() {
        this.curPage = '#garage-page'
    }
    render() {
        ;(document.querySelector(`.body`) as HTMLElement).innerHTML = `
    <header>
    <nav class="page-navigation">
        <a href="blank" class="page-link button-green to-garage">To Garage</a>
        <a href="blank" class="page-link button-green to-winners"> To Winners</a>
    </nav>
</header>
<main class="main"></main>
    `
    }
    addListeners() {
        return
    }
}
