import { TreeLeft, TreePageSettingsObj } from '../../interfaces/interfaces'

class Decorations implements TreeLeft {
    treePageSettings: TreePageSettingsObj
    constructor(treePageSettings: TreePageSettingsObj) {
        this.treePageSettings = treePageSettings
    }
    addListeners() {
        document.querySelector('.tree-select')?.addEventListener('click', (e) => {
            const evTarget = e.target as HTMLElement
            if (evTarget.classList.contains('tree-select-type')) {
                this.treePageSettings.treeImg = evTarget.dataset.tree as string
                document.querySelectorAll('.tree-select-type').forEach((el) => {
                    el.classList.remove('tree-select-active')
                })
                evTarget.classList.add('tree-select-active')
                document.querySelector('.tree-image')?.setAttribute('src', `assets/tree/${evTarget.dataset.tree}.png`)
            }
        })

        document.querySelector('.bg-select')?.addEventListener('click', (e) => {
            const evTarget = e.target as HTMLElement
            if (evTarget.classList.contains('tree-select-bg')) {
                this.treePageSettings.bg = evTarget.dataset.bg as string
                document.querySelectorAll('.tree-select-bg').forEach((el) => {
                    el.classList.remove('tree-select-bg-active')
                })
                evTarget.classList.add('tree-select-bg-active')
                ;(document.querySelector('.tree-div') as HTMLElement).setAttribute(
                    'style',
                    `background-image:url(assets/bg/${evTarget.dataset.bg}.jpg);`
                )
            }
        })

        document.querySelector('.music')?.addEventListener('click', () => {
            const music = document.querySelector('.music') as HTMLElement
            const sound = document.querySelector('.jingle-bells') as HTMLAudioElement
            if (music.classList.contains('play')) {
                music.classList.remove('play')
                music.classList.add('mute')
                this.treePageSettings.music = true
                sound.play()
            } else {
                music.classList.remove('mute')
                music.classList.add('play')
                sound.pause()
                sound.currentTime = 0
                this.treePageSettings.music = false
            }
        })

        document.querySelector('.snow-btn')?.addEventListener('click', () => {
            const snowDiv = document.querySelector('.snow') as HTMLElement
            const snowBtn = document.querySelector('.snow-btn') as HTMLElement
            if (snowBtn.classList.contains('snow-on')) {
                snowBtn.classList.toggle('snow-on')
                snowDiv.classList.toggle('hidden')
                snowDiv.innerHTML = ''
                this.treePageSettings.snow = false
            } else {
                snowBtn.classList.toggle('snow-on')
                this.generateSnow()
                this.treePageSettings.snow = true
            }
        })
        document.querySelector('.ornaments-box')?.addEventListener('click', (e) => {
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
        })
    }

    generateLights(color: string) {
        const lightsContainer = document.querySelector('.lights-container') as HTMLElement
        lightsContainer.innerHTML = ''
        for (let i = 0; i < 32; i += 4) {
            const rope = document.createElement('div')
            rope.classList.add('lights-rope')

            for (let j = 0; j < i + 5; j++) {
                const light = document.createElement('div')
                rope.append(light)
            }
            for (let k = 0; k < Math.ceil(rope.children.length / 2); k++) {
                if (color !== 'mix') {
                    rope.children[k]?.setAttribute(
                        'style',
                        `margin-top:${
                            k * 5 * 0.56
                        }px; background-color:${color}; animation: 3s blink ease-in-out infinite`
                    )
                    if (rope.children[rope.children.length - (k + 1)]) {
                        rope.children[rope.children.length - (k + 1)].setAttribute(
                            'style',
                            `margin-top:${
                                k * 5 * 0.56
                            }px; background-color:${color}; animation: 3s blink ease-in-out infinite`
                        )
                    }
                } else {
                    rope.children[k]?.setAttribute(
                        'style',
                        `margin-top:${k * 5 * 0.56}px; animation: 5s mix linear infinite`
                    )
                    if (rope.children[rope.children.length - (k + 1)]) {
                        rope.children[rope.children.length - (k + 1)].setAttribute(
                            'style',
                            `margin-top:${k * 5 * 0.56}px; animation: 5s mix linear infinite`
                        )
                    }
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
                delay: (Math.floor(Math.random() * (3 - 0)) + 0) * 1000,
                easing: timingFunctions[Math.floor(Math.random() * (3 - 0)) + 0],
                iterations: Infinity,
            })
        }
    }
    handleStorage() {
        function playMusic() {
            ;(document.querySelector('.jingle-bells') as HTMLAudioElement).play()
            document.removeEventListener('click', playMusic)
        }
        document
            .querySelector(`[data-tree = '${String(this.treePageSettings.treeImg)}']`)
            ?.classList.add('tree-select-active')

        document.querySelector('.tree-image')?.setAttribute('src', `assets/tree/${this.treePageSettings.treeImg}.png`)

        document.querySelector(`[data-bg ="${this.treePageSettings.bg}"]`)?.classList.add('tree-select-bg-active')
        ;(document.querySelector('.tree-div') as HTMLElement).setAttribute(
            'style',
            `background-image:url(assets/bg/${this.treePageSettings.bg}.jpg);`
        )

        if (this.treePageSettings.lightsOn === true) {
            document
                .querySelector(`[data-ornament ="${this.treePageSettings.lightsColor}"]`)
                ?.classList.add('ornament-active')
            ;(document.querySelector('.lights-container') as HTMLElement).classList.remove('hidden')
            this.generateLights(`${this.treePageSettings.lightsColor}`)
        }

        if (this.treePageSettings.snow === true) {
            ;(document.querySelector('.snow-btn') as HTMLElement).classList.toggle('snow-on')
            this.generateSnow()
        }
        if (this.treePageSettings.music === true) {
            const music = document.querySelector('.music') as HTMLElement
            music.classList.remove('play')
            music.classList.add('mute')
            document.addEventListener('click', playMusic)
        }
    }
}
export default Decorations
