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
                const toy = this.data.find((el) => el.num === n)
                toysToShow.push(toy as DataItem)
            })
        }
        toysToShow.forEach((el) => {
            const toyItem = document.createElement('div')
            const toyAmount = document.createElement('div')
            for (let i = Number(el.count); i > 0; i--) {
                const toyImg = document.createElement('img')
                toyImg.classList.add('tree-toy-image')
                toyImg.src = `assets/toys/${el.num}.png`
                toyImg.draggable = true
                toyImg.setAttribute('data-amount', `${el.num}-${i}`)
                toyItem.append(toyImg)
            }

            toyAmount.innerHTML = `${el.count}`
            toyAmount.classList.add('toy-count')
            toyItem.classList.add('toy-item')
            toyItem.setAttribute('data-toy-label', `${el.num}`)
            toyItem.id = `${el.num}`

            toyItem.append(toyAmount)
            toyGrid.append(toyItem)
        })
    }
    addListeners() {
        let elem: HTMLImageElement | undefined
        const dropzone = document.querySelector('.drop-area') as HTMLAreaElement
        let elemIn: boolean

        document.querySelectorAll('.tree-toy-image').forEach((el) => {
            ;(el as HTMLElement).addEventListener('dragstart', (e: DragEvent) => {
                elem = e.target as HTMLImageElement
            })
            ;(el as HTMLElement).addEventListener('dragend', (e: DragEvent) => {
                const label: string | undefined = (e.target as HTMLElement)?.dataset?.amount?.split('-')[0]
                const container = document.querySelector(`[data-toy-label = "${label}"]`) as HTMLElement as HTMLElement
                if (!elemIn) {
                    dropzone.removeChild(elem as Node)
                    elem?.setAttribute('style', '')
                    container.appendChild(elem as HTMLImageElement)
                }
                ;(container.querySelector('.toy-count') as HTMLElement).textContent = String(
                    container.children.length - 1
                )
            })
        })

        document.querySelector('.drop-area')?.addEventListener('dragover', (e) => {
            e.preventDefault()
        })

        document.querySelector('.drop-area')?.addEventListener('dragenter', () => {
            elemIn = true
        })
        document.querySelector('.drop-area')?.addEventListener('dragleave', () => {
            elemIn = false
        })
        ;(document.querySelector('.drop-area') as HTMLAreaElement).addEventListener('drop', (e) => {
            document.querySelector('.drop-area')?.append(elem as HTMLElement)
            elem?.classList.add('dropped-elem')
            ;(elem as HTMLElement).setAttribute('style', `position: absolute; top:${e.clientY}px; left:${e.clientX}px`)
        })
    }
}
export default ToyBox
