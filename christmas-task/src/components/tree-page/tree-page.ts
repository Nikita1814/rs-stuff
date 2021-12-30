import { DataItem, TreeDecoration, TreeLeft, TreePageSettingsObj, TreeToyGrid } from '../interfaces/interfaces'
import Decorations from './decorations/decorations'
import ToyBox from './toybox/toy-box'

class TreeSettings implements TreePageSettingsObj {
    treeImg: string
    bg: string
    snow: boolean
    music: boolean
    lightsColor: string
    lightsOn: boolean
    constructor() {
        this.treeImg = '1'
        this.bg = '1'
        this.snow = false
        this.music = false
        this.lightsColor = 'yellow'
        this.lightsOn = false
    }
}
class TreePage implements TreeDecoration {
    data: DataItem[]
    favs: Set<string | undefined>
    treePageSettings: TreePageSettingsObj
    decorations: TreeLeft
    toyBox: TreeToyGrid
    constructor(data: DataItem[], favs: Set<string | undefined>) {
        this.treePageSettings = new TreeSettings()
        if (localStorage.getItem('treeSettings')) {
            this.treePageSettings = JSON.parse(localStorage.getItem('treeSettings') as string)
        }
        this.data = data
        this.favs = favs
        this.decorations = new Decorations(this.treePageSettings)
        this.toyBox = new ToyBox(this.data, this.favs, this.treePageSettings)
    }
    render() {
        ;(document.querySelector('.main') as HTMLElement).innerHTML = `
        <div class="page tree-page">
        <div class="tree-left">
        <div class="tree-buttons">
        <div class="music play"></div>
        <div class="snow-btn"></div>
        <button class="reset-all">Сбросить Хранилище</button>
        </div>
            <div class="tree-select">
                <h4>Выберите елку</h4>
                <div class="select-grid">
                    <div data-tree="1" class="tree-select-type tr1"></div>
                    <div data-tree="2" class="tree-select-type tr2"></div>
                    <div data-tree="3" class="tree-select-type tr3"></div>
                    <div data-tree="4" class="tree-select-type tr4"></div>
                    <div data-tree="5" class="tree-select-type tr5"></div>
                    <div data-tree="6" class="tree-select-type tr6"></div>
                </div>
            </div>
            <div class="bg-select">
                <h4>Выберите фон</h4>
                <div class="select-grid ">
                    <div data-bg="1" class="tree-select-bg bg1"></div>
                    <div data-bg="2" class="tree-select-bg bg2"></div>
                    <div data-bg="3" class="tree-select-bg bg3"></div>
                    <div data-bg="4" class="tree-select-bg bg4"></div>
                    <div data-bg="5" class="tree-select-bg bg5"></div>
                    <div data-bg="6" class="tree-select-bg bg6"></div>
                    <div data-bg="7" class="tree-select-bg bg7"></div>
                    <div data-bg="8" class="tree-select-bg bg8"></div>
                    <div data-bg="9" class="tree-select-bg bg9"></div>
                    <div data-bg="10" class="tree-select-bg bg10"></div>
                </div>
            </div>
            <div class="ornament-select">
                <h4>Гирлянда</h4>
                <div class="ornaments-box">
                    <div data-ornament="mix" class="ornament-item or1"></div>
                    <div data-ornament="palevioletred" class="ornament-item or2"></div>
                    <div data-ornament="lime" class="ornament-item or3"></div>
                    <div data-ornament="cyan" class="ornament-item or4"></div>
                    <div data-ornament="yellow" class="ornament-item or5"></div>
                </div>
            </div>
        </div>
        <div class="tree-div">
        <div class="snow hidden"></div>
        <div class="lights-container hidden">
        </div>
        <img class="tree-image" src ="assets/tree/1.png" usemap="#tree-map"></img>
        <map name="tree-map">
        <area class="drop-area" shape="poly" coords="1,550,102,210,250,1,402,233,499,550,250,699">
        </map>
        </div>
        <div class="tree-right">
            <h4>Игрушки</h4>
            <div class="toy-select">
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
                <div class="toy-item">
                    <div class="toy-count"></div>
                </div>
            </div>
            <div class="tree-load"></div>
        </div>
    </div>
        `

        this.toyBox.drawBox()
        this.addListeners()
        this.handleStorage()
    }
    addListeners() {
        this.decorations.addListeners()
        this.toyBox.addListeners()
        document.querySelector(`.reset-all`)?.addEventListener('click', () => {
            localStorage.clear()
            this.treePageSettings = new TreeSettings()
            location.reload()
        })
    }
    setStorage() {
        localStorage.setItem('treeSettings', JSON.stringify(this.treePageSettings))
    }
    handleStorage() {
        this.decorations.handleStorage()
    }
}

export default TreePage
