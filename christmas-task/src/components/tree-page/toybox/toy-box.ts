import { Toy, TreePageSettingsObjInterface } from '../../interfaces/interfaces'

class ToyBox {
    constructor(
        public data: Toy[],
        public favs: Set<string | undefined>,
        public treePageSettings: TreePageSettingsObjInterface
    ) {
        this.favs = favs
        this.data = data
        this.treePageSettings = treePageSettings
    }

    drawBox() {
        const toyGrid = document.querySelector('.toy-select') as HTMLElement
        toyGrid.innerHTML = ''
        let toysToShow: Toy[]
        if (this.favs.size === 0) {
            toysToShow = this.data.slice(0, 20)
        } else {
            toysToShow = this.data.filter((el) => this.favs.has(el.num))
        }
        toysToShow.forEach((el) => {
            const toyItem = document.createElement('div')
            const toyAmount = document.createElement('div')
            const toyImg = document.createElement('img')
            toyImg.classList.add('tree-toy-image')
            toyImg.src = `assets/toys/${el.num}.png`
            toyImg.draggable = true
            /*toyImg.setAttribute('data-amount', `${el.num}-${el.count}`)*/
            toyImg.setAttribute('data-num', `${el.num}`)
            toyItem.append(toyImg)
            toyAmount.innerHTML = `${el.count}`
            toyAmount.classList.add('toy-count')
            toyItem.classList.add('toy-item')
            toyItem.setAttribute('data-toy-label', `${el.num}`)
            toyItem.id = `${el.num}`
            toyItem.append(toyAmount)
            toyGrid.append(toyItem)
        })
    }
    setToyPosition(toy: HTMLElement, e: DragEvent) {
        toy.setAttribute('style', `top:${e.clientY - 25}px; left:${e.clientX - 25}px`)
    }
    addListeners() {
        const toyPage = document.querySelector('.page.tree-page') as HTMLElement
        const dropzone = document.querySelector('.drop-area') as HTMLAreaElement
        let currentToy: HTMLImageElement | null
        toyPage.addEventListener('dragstart', (e) => {
            const target = e.target as HTMLElement
            if (target.matches('.tree-toy-image')) {
                currentToy = e.target as HTMLImageElement
            }
        })
        toyPage.addEventListener('dragover', (e) => {
            e.preventDefault()
        })
        toyPage.addEventListener('drop', () => {
            if (currentToy?.closest('.drop-area')) {
                const toyContainer = document.querySelector(
                    `[data-toy-label="${currentToy.dataset.num}"].toy-item`
                ) as HTMLElement
                if (!toyContainer.querySelector('.tree-toy-image')) {
                    currentToy.setAttribute('style', '')
                    dropzone.removeChild(currentToy)
                    toyContainer.prepend(currentToy)
                } else {
                    dropzone.removeChild(currentToy)
                }

                ;(toyContainer.querySelector('.toy-count') as HTMLElement).textContent = `${
                    Number(toyContainer.querySelector('.toy-count')?.textContent) + 1
                }`
            }
            currentToy = null
        })

        dropzone.addEventListener('drop', (e) => {
            if (currentToy?.closest('.toy-select')) {
                const label = currentToy.nextSibling as HTMLElement
                if (Number(label.textContent) > 1) {
                    const newToy = currentToy.cloneNode(true) as HTMLElement
                    dropzone.append(newToy)
                    this.setToyPosition(newToy, e)
                    label.textContent = String(Number(label.textContent) - 1)
                } else {
                    dropzone.append(currentToy)
                    this.setToyPosition(currentToy, e)
                    label.textContent = '0'
                }
            } else if (currentToy && currentToy.closest('.drop-area')) {
                this.setToyPosition(currentToy, e)
            }
            currentToy = null
            e.stopPropagation()
        })
    }
}
export default ToyBox
