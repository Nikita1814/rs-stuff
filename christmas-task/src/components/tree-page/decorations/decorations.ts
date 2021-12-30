import { DecorationsInterface, TreePageSettingsObj } from '../../interfaces/interfaces'

class Decorations implements DecorationsInterface {
    constructor(public treePageSettings: TreePageSettingsObj) {
        this.treePageSettings = treePageSettings
    }
    addListeners() {
        document.querySelector('.tree-select')?.addEventListener('click', (e) => {
            this.handleTree(e)
        })
        document.querySelector('.bg-select')?.addEventListener('click', (e) => {
            this.handleBg(e)
        })
        document.querySelector('.music')?.addEventListener('click', () => {
            this.handleMusic()
        })
        document.querySelector('.snow-btn')?.addEventListener('click', () => {
            this.handleSnow()
        })
        document.querySelector('.ornaments-box')?.addEventListener('click', (e) => {
            this.handleOrnament(e)
        })
    }
    handleMusic() {
        const music = document.querySelector('.music') as HTMLElement
        const sound = document.querySelector('.jingle-bells') as HTMLAudioElement
        if (music.classList.contains('play')) {
            this.treePageSettings.music = true
            sound.play()
        } else {
            sound.pause()
            sound.currentTime = 0
            this.treePageSettings.music = false
        }
        music.classList.toggle('play')
        music.classList.toggle('mute')
    }
    handleTree(e: Event) {
        const evTarget = e.target as HTMLElement
        if (evTarget.classList.contains('tree-select-type')) {
            this.treePageSettings.treeImg = evTarget.dataset.tree as string
            document.querySelectorAll('.tree-select-type').forEach((el) => {
                el.classList.remove('tree-select-active')
            })
            evTarget.classList.add('tree-select-active')
            ;(
                document.querySelector('.tree-image') as HTMLImageElement
            ).src = `assets/tree/${evTarget.dataset.tree}.png`
        }
    }
    handleBg(e: Event) {
        const evTarget = e.target as HTMLElement
        if (evTarget.classList.contains('tree-select-bg')) {
            this.treePageSettings.bg = evTarget.dataset.bg as string
            document.querySelectorAll('.tree-select-bg').forEach((el) => {
                el.classList.remove('tree-select-bg-active')
            })
            evTarget.classList.add('tree-select-bg-active')
            ;(
                document.querySelector('.tree-div') as HTMLElement
            ).style.backgroundImage = `url(assets/bg/${evTarget.dataset.bg}.jpg)`
        }
    }
    handleOrnament(e: Event) {
        const evTarget = e.target as HTMLElement
        if (evTarget.classList.contains('ornament-item')) {
            const lightsContainer = document.querySelector('.lights-container') as HTMLElement
            if (evTarget.classList.contains('ornament-active')) {
                evTarget.classList.remove('ornament-active')
                lightsContainer.innerHTML = ''
                lightsContainer.classList.add('hidden')
                this.treePageSettings.lightsOn = false
            } else {
                document.querySelectorAll('.ornament-item').forEach((el) => el.classList.remove('ornament-active'))
                evTarget.classList.add('ornament-active')
                lightsContainer.classList.remove('hidden')
                this.treePageSettings.lightsOn = true
                this.treePageSettings.lightsColor = evTarget.dataset.ornament as string
                this.generateLights(evTarget.dataset.ornament as string)
            }
        }
    }
    handleSnow() {
        const snowDiv = document.querySelector('.snow') as HTMLElement
        const snowBtn = document.querySelector('.snow-btn') as HTMLElement
        if (snowBtn.classList.contains('snow-on')) {
            snowDiv.classList.toggle('hidden')
            snowDiv.innerHTML = ''
            this.treePageSettings.snow = false
        } else {
            this.generateSnow()
            this.treePageSettings.snow = true
        }
        snowBtn.classList.toggle('snow-on')
    }
    tieLights(elem: HTMLElement, anim: string, color: string, num: number) {
        elem.style.marginTop = `${num * 5 * 0.56}px`
        elem.style.backgroundColor = `${color}`
        elem.style.animation = `3s ${anim} ease-in-out infinite`
    }
    generateLights(color: string) {
        const lightsContainer = document.querySelector('.lights-container') as HTMLElement
        lightsContainer.innerHTML = ''
        for (let i = 0; i < 32; i += 4) {
            const rope = document.createElement('div')
            rope.classList.add('lights-rope')
            rope.innerHTML += `<div></div>`.repeat(i + 5)
            for (let k = 0; k < Math.ceil(rope.children.length / 2); k++) {
                if (color !== 'mix') {
                    this.tieLights(rope.children[k] as HTMLElement, 'blink', color, k)
                    this.tieLights(rope.children[rope.children.length - (k + 1)] as HTMLElement, 'blink', color, k)
                } else {
                    this.tieLights(rope.children[k] as HTMLElement, 'mix', 'white', k)
                    this.tieLights(rope.children[rope.children.length - (k + 1)] as HTMLElement, 'mix', 'white', k)
                }
            }

            lightsContainer.append(rope)
        }
    }
    generateSnow() {
        const snowDiv = document.querySelector('.snow') as HTMLElement
        snowDiv.classList.toggle('hidden')
        for (let i = 0; i < 40; i++) {
            const snowflake = document.createElement('i')
            const timingFunctions = ['ease-in', 'ease-out', 'linear', 'ease-in-out']
            snowDiv.append(snowflake)
            snowflake.animate([{ transform: `translateY(-120px)` }, { transform: `translateY(1020px)` }], {
                duration: (Math.floor(Math.random() * (9 - 3)) + 3) * 1000,
                delay: Math.floor(Math.random() * 3) * 1000,
                easing: timingFunctions[Math.floor(Math.random() * 3)],
                iterations: Infinity,
            })
        }
    }
    handleStorage() {
        const { treeImg, bg, snow, music, lightsColor, lightsOn } = this.treePageSettings
        function playMusic() {
            ;(document.querySelector('.jingle-bells') as HTMLAudioElement).play()
            document.removeEventListener('click', playMusic)
        }
        document.querySelector(`[data-tree = '${String(treeImg)}']`)?.classList.add('tree-select-active')
        ;(document.querySelector('.tree-image') as HTMLImageElement).src = `assets/tree/${treeImg}.png`
        document.querySelector(`[data-bg ="${bg}"]`)?.classList.add('tree-select-bg-active')
        ;(document.querySelector('.tree-div') as HTMLElement).style.backgroundImage = `url(assets/bg/${bg}.jpg)`

        if (lightsOn) {
            document.querySelector(`[data-ornament ="${lightsColor}"]`)?.classList.add('ornament-active')
            ;(document.querySelector('.lights-container') as HTMLElement).classList.remove('hidden')
            this.generateLights(`${lightsColor}`)
        }
        if (snow) {
            ;(document.querySelector('.snow-btn') as HTMLElement).classList.toggle('snow-on')
            this.generateSnow()
        }
        if (music) {
            const music = document.querySelector('.music') as HTMLElement
            music.classList.remove('play')
            music.classList.add('mute')
            document.addEventListener('click', playMusic)
        }
    }
}
export default Decorations
