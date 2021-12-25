import { TreeLeft, TreePageSettingsObj } from '../../interfaces/interfaces'

class Decorations implements TreeLeft {
    treePageSettings: TreePageSettingsObj
    constructor(treePageSettings: TreePageSettingsObj) {
        this.treePageSettings = treePageSettings
    }
    addListeners() {
        document.querySelector('.tree-select')?.addEventListener('click', (e) => {
            console.log('click')
            let evTarget = e.target as HTMLElement
            if (evTarget.classList.contains('tree-select-type')) {
                this.treePageSettings.treeImg = Number(evTarget.dataset.tree)
                document.querySelectorAll('.tree-select-type').forEach((el) => {
                    el.classList.remove('tree-select-active')
                })
                evTarget.classList.add('tree-select-active')
                document
                    .querySelector('.tree-image')
                    ?.setAttribute('src', `assets/tree/${Number(evTarget.dataset.tree)}.png`)
            }
        })

        document.querySelector('.bg-select')?.addEventListener('click', (e) => {
            let evTarget = e.target as HTMLElement
            if (evTarget.classList.contains('tree-select-bg')) {
                this.treePageSettings.bg = Number(evTarget.dataset.bg)
                document.querySelectorAll('.tree-select-bg').forEach((el) => {
                    el.classList.remove('tree-select-bg-active')
                })
                evTarget.classList.add('tree-select-bg-active')
                ;(document.querySelector('.tree-div') as HTMLElement).setAttribute(
                    'style',
                    `background-image:url(assets/bg/${Number(evTarget.dataset.bg)}.jpg);`
                )
            }
        })
    }
}

export default Decorations
