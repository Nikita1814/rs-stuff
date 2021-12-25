import { DataItem, TreeDecoration, TreeLeft, TreePageSettingsObj } from '../interfaces/interfaces'
import Decorations from './decorations/decorations'

class TreePage implements TreeDecoration {
    data: DataItem[]
    favs: Set<string | undefined>
    treePageSettings: TreePageSettingsObj
    decorations: TreeLeft
    firTree: Object
    toyBox: Object
    constructor(data: DataItem[], favs: Set<string | undefined>) {
        this.treePageSettings = {
            treeImg: 1,
            bg: 1,
            snow: false,
            music: false,
        }
        this.data = data
        this.favs = favs
        this.decorations = new Decorations(this.treePageSettings)
        this.firTree = {}
        this.toyBox = {}
    }
    render(data: DataItem[]) {
        ;(document.querySelector('.main') as HTMLElement).innerHTML = `
        <div class="page tree-page">
        <div class="tree-left">
        <div class="tree-buttons">
        <div class="music play"></div>
        <div class="snow"></div>
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
                    <div data-ornament="red" class="ornament-item or2"></div>
                    <div data-ornament="green" class="ornament-item or3"></div>
                    <div data-ornament="blue" class="ornament-item or4"></div>
                    <div data-ornament="yellow" class="ornament-item or5"></div>
                    <input type="radio">
                </div>
            </div>
        </div>
        <div class="tree-div">
        <img class="tree-image" src ="assets/tree/1.png"></img>
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
        this.addListeners()
    }
    addListeners() {
        this.decorations.addListeners()
    }
    setStorage() {}
}

export default TreePage
