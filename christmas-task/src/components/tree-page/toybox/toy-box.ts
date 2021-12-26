import { DataItem, TreePageSettingsObj, TreeToyGrid } from '../../interfaces/interfaces'

class ToyBox implements TreeToyGrid {
    favs: Set<string | undefined>
    data: DataItem[]
    treePageSettings: TreePageSettingsObj
    constructor(data: DataItem[], favs: Set<string | undefined>, treePageSettings: TreePageSettingsObj) {
        this.favs = favs
        this.data = data
        this.treePageSettings = treePageSettings
    }
    drawBox() {
        const toyGrid = document.querySelector('.toy-select') as HTMLElement
        toyGrid.innerHTML = ''
        let toysToShow: DataItem[]
        if (this.favs.size === 0) {
            toysToShow = this.data.slice(0, 20)
        } else {
            toysToShow = []
            this.favs.forEach((n) => {
                let toy = this.data.find((el) => el.num === n)
                toysToShow.push(toy as DataItem)
            })
        }
        toysToShow.forEach((el) => {
            let toyItem = document.createElement('div')
            toyItem.classList.add('toy-item')
            toyItem.setAttribute('style', ` background-image: url(assets/toys/${el.num}.png);`)
            let toyAmount = document.createElement('div')
            toyAmount.innerHTML = `${el.count}`
            toyAmount.classList.add('toy-count')
            toyItem.append(toyAmount)
            toyGrid.append(toyItem)
        })
    }
}
export default ToyBox
