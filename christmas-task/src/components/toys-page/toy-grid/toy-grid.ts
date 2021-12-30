import { Toy, ToyGridInterface } from '../../interfaces/interfaces'
import type { FilterObj } from '../../interfaces/interfaces'

class ToyGrid implements ToyGridInterface {
    public data: Toy[]
    public favs: Set<string | undefined>
    constructor(data: Toy[], favs: Set<string | undefined>) {
        this.data = data
        this.favs = favs
    }
    showElems(data: Toy[], sortCriteria?: FilterObj) {
        ;(document.querySelector('.toys-grid') as HTMLElement).innerHTML = ''
        let sortData = [...data]
        /*TODO Add a filtration application method*/
        if (sortCriteria) {
            const sortfuncs: { [key: string]: (a: Toy, b: Toy) => number } = {
                AZ: function (a: Toy, b: Toy) {
                    return a.name.localeCompare(b.name)
                },
                ZA: function (a: Toy, b: Toy) {
                    return b.name.localeCompare(a.name)
                },
                increase: function (a: Toy, b: Toy) {
                    return +a.count - +b.count
                },
                decrease: function (a: Toy, b: Toy) {
                    return +b.count - +a.count
                },
            }
            sortData = sortData.filter((el) => {
                return (
                    ((sortCriteria.shape as Set<string | undefined>).has(el.shape) ||
                        (sortCriteria.shape as Set<string | undefined>).size === 0) &&
                    ((sortCriteria.color as Set<string | undefined>).has(el.color) ||
                        (sortCriteria.color as Set<string | undefined>).size === 0) &&
                    ((sortCriteria.size as Set<string | undefined>).has(el.size) ||
                        (sortCriteria.size as Set<string | undefined>).size === 0) &&
                    Number(el.year) >= sortCriteria.beginYear &&
                    Number(el.year) <= sortCriteria.endYear &&
                    Number(el.count) >= sortCriteria.beginAmount &&
                    Number(el.count) <= sortCriteria.endAmount
                )
            })

            if (sortCriteria.favorite === true) {
                sortData = sortData.filter((el) => {
                    return el.favorite
                })
            }
            if (sortCriteria.search !== '') {
                sortData = sortData.filter((el) => {
                    return el.name.toLowerCase().includes(sortCriteria.search)
                })
            }
            const sortMethod: (a: Toy, b: Toy) => number = sortfuncs[sortCriteria.sort]
            sortData.sort(sortMethod)
        }

        const fragment = document.createDocumentFragment()
        const toyTemplate = document.querySelector('#toy-temp') as HTMLTemplateElement

        sortData.forEach((el) => {
            const toyCard = toyTemplate.content.cloneNode(true) as HTMLTemplateElement
            ;(toyCard.querySelector('.toy-name') as HTMLElement).textContent = `${el.name}`
            ;(
                toyCard.querySelector('.toy-image') as HTMLElement
            ).style.backgroundImage = `url("./assets/toys/${el.num}.png")`
            ;(toyCard.querySelector('.toy-amount') as HTMLElement).textContent = `Количество: ${el.count}`
            ;(toyCard.querySelector('.toy-year') as HTMLElement).textContent = `Год: ${el.year}`
            ;(toyCard.querySelector('.toy-shape') as HTMLElement).textContent = `Форма: ${el.shape}`
            ;(toyCard.querySelector('.toy-color') as HTMLElement).textContent = `Цвет: ${el.color}`
            ;(toyCard.querySelector('.toy-size') as HTMLElement).textContent = `Размер: ${el.size}`

            toyCard.querySelector('.fav-btn')?.setAttribute('id', `${el.num}`)
            if (this.favs.has(el.num)) {
                toyCard.querySelector('.fav-btn')?.classList.add('fav-btn-active')
            }

            if (el.favorite === true) {
                ;(toyCard.querySelector('.toy-favourite') as HTMLElement).textContent = `Любимая: да`
            } else {
                ;(toyCard.querySelector('.toy-favourite') as HTMLElement).textContent = `Любимая: нет`
            }
            fragment.append(toyCard)
        })

        document.querySelector('.toys-grid')?.append(fragment)
        if (document.querySelector('.toys-grid')?.children.length === 0) {
            ;(
                document.querySelector('.toys-grid') as HTMLElement
            ).innerHTML = `<h1 class="big-warn">Извините, совпадений не обнаружено</h1>`
        }
    }
}
export default ToyGrid
