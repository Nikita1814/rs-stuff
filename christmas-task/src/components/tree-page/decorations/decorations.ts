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
                snowDiv.classList.toggle('hidden')
                for (let i = 0; i < 40; i++) {
                    let snowflake = document.createElement('i')
                    let timingFunctions = ['ease-in', 'ease-out', 'linear', 'ease-in-out']

                    snowDiv.append(snowflake)
                    snowflake.animate([{ transform: `translateY(-120px)` }, { transform: `translateY(1020px)` }], {
                        duration: (Math.floor(Math.random() * (9 - 3)) + 3) * 1000,
                        delay: (Math.floor(Math.random() * (3 - 0)) + 0) * 1000,
                        easing: timingFunctions[Math.floor(Math.random() * (3 - 0)) + 0],
                        iterations: Infinity,
                    })
                }
                this.treePageSettings.snow = true
            }
        })
        document.querySelector('.ornaments-box')?.addEventListener('click', (e) => {
            let evTarget = e.target as HTMLElement
            if (evTarget.classList.contains('ornament-item')) {
                let lightsContainer = document.querySelector('.lights-container') as HTMLElement
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
                    lightsContainer.innerHTML = ''
                    for (let i = 0; i < 32; i += 4) {
                        let rope = document.createElement('div')
                        rope.classList.add('lights-rope')

                        for (let j = 0; j < i + 5; j++) {
                            let light = document.createElement('div')
                            rope.append(light)
                        }
                        for (let k = 0; k < Math.ceil(rope.children.length / 2); k++) {
                            if (evTarget.dataset.ornament !== 'mix') {
                                rope.children[k]?.setAttribute(
                                    'style',
                                    `margin-top:${k * 5 * 0.56}px; background-color:${
                                        evTarget.dataset.ornament
                                    }; animation: 3s blink ease-in-out infinite`
                                )
                                if (rope.children[rope.children.length - (k + 1)]) {
                                    rope.children[rope.children.length - (k + 1)].setAttribute(
                                        'style',
                                        `margin-top:${k * 5 * 0.56}px; background-color:${
                                            evTarget.dataset.ornament
                                        }; animation: 3s blink ease-in-out infinite`
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
            }
        })
    }
}
export default Decorations
