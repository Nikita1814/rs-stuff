import { Toy, TreePageSettingsObj, ToyBoxInterface} from '../../interfaces/interfaces'

class ToyBox implements ToyBoxInterface {
    favs: Set<string | undefined>
    data: Toy[]
    treePageSettings: TreePageSettingsObj
    constructor(data: Toy[], favs: Set<string | undefined>, treePageSettings: TreePageSettingsObj) {
        this.favs = favs
        this.data = data
        this.treePageSettings = treePageSettings
    }
    setToyPosition(toy: HTMLElement, e: DragEvent) {
        toy.setAttribute('style', `top:${e.clientY - 25}px; left:${e.clientX - 25}px`)
    }
    drawBox() {
        const toyGrid = document.querySelector('.toy-select') as HTMLElement
        toyGrid.innerHTML = ''
        let toysToShow: Toy[]
        if (this.favs.size === 0) {
            toysToShow = this.data.slice(0, 20)
        } else {
            toysToShow = []
            this.favs.forEach((n) => {
                const toy = this.data.find((el) => el.num === n)
                toysToShow.push(toy as Toy)
            })
        }
        toysToShow.forEach((el) => {
            const toyItem = document.createElement('div')
            const toyAmount = document.createElement('div')
            const toyImg = document.createElement('img')
            /*for (let i = Number(el.count); i > 0; i--) {
               
            }*/

            toyImg.classList.add('tree-toy-image')
            toyImg.src = `assets/toys/${el.num}.png`
            toyImg.draggable = true
            toyImg.setAttribute('data-amount', `${el.num}-${el.count}`)
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
            // check if currentToy is from tree
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
            // handle drop if currentToy from settings panel
            if (currentToy?.closest('.toy-select')) {
                const label = currentToy.nextSibling as HTMLElement
                // check if we need to remove the image from settings panel
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
                // handle drop if currentToy from drop area
            } else if (currentToy && currentToy.closest('.drop-area')) {
                this.setToyPosition(currentToy, e)
            }
            currentToy = null
            // add it to disable handling events on toy page if we handled it here
            e.stopPropagation()
        })
    }
}
export default ToyBox
