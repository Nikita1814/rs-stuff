import ApiService from '../../api-service/api-service'
import { WinnerItem } from '../garage-page'

interface engineStartResp {
    velocity: number
    distance: number
}
class CarController {
    winner: WinnerItem | null
    raceStatus: boolean
    service:ApiService
    constructor(service:ApiService) {
        this.service = service
        this.winner = null
        this.raceStatus = false
    }

    async toggleEngine(carId: number, status: 'started' | 'stopped'): Promise<engineStartResp | undefined> {
        const res = await fetch(`http://127.0.0.1:3000/engine?id=${carId}&status=${status}`, {
            method: 'PATCH',
        })
        if (res.ok) {
            return await res.json()
        }
    }
    async toggleDrive(carId: number): Promise<Response | undefined> {
        const resTwo = await fetch(`http://127.0.0.1:3000/engine?id=${carId}&status=drive`, {
            method: 'PATCH',
        })
        if (resTwo.status === 500) {
            throw new Error('500')
        }
        if (resTwo.ok) {
            return resTwo
        }
    }
    animateCar(car: HTMLElement, distance: number, velocity: number): void {
        const finishline = ((document.querySelector('.car-track-bottom') as HTMLElement).offsetWidth / 100) * 76
        const anim = car.animate(
            [
                {
                    transform: `translateX(${finishline}px)`,
                },
            ],
            {
                duration: distance / velocity,
                easing: 'ease-in',
            }
        )
        anim.onfinish = () => {
            car.style.transform = `translateX(${finishline}px)`
        }
    }

    async beginRace(): Promise<void> {
        document.querySelector('.header-cover')?.classList.remove('hidden')
        document.querySelector('.reset-btn')?.classList.add('inactive')
        window.setTimeout(() => {
            if (this.winner !== null) {
                this.showAnnouncement(this.winner)
            }
            document.querySelector('.reset-btn')?.classList.remove('inactive')
            document.querySelector('.header-cover')?.classList.add('hidden')
        }, 13000)
        this.timer()
        this.raceStatus = true
        const elemArr = [...document.querySelectorAll('.car-track')]
        const promisArr: Array<Promise<void>> = elemArr.map((track) => {
            track.querySelector(`.start-btn`)?.classList.add(`car-control-active`)
            track.querySelector(`.stop-btn`)?.classList.remove(`car-control-active`)
            const carId = Number((track as HTMLElement).dataset.trackId)
            const car = track.querySelector('.race-car') as HTMLElement
            return this.startCarRace(carId, car)
        })
        await Promise.allSettled(promisArr)
    }
    resetRace(): void {
        this.winner = null
        this.raceStatus = false
        document.querySelectorAll('.car-track').forEach((track) => {
            track.querySelector(`.start-btn`)?.classList.remove(`car-control-active`)
            track.querySelector(`.stop-btn`)?.classList.add(`car-control-active`)
            const car = track.querySelector('.race-car') as HTMLElement
            car.getAnimations().forEach((anim) => anim.cancel())
            this.toggleEngine(Number((track as HTMLElement).dataset.trackId), 'stopped')
            car.style.transform = 'translateX(0px)'
        })
    }

    addWinner(carID: number, time: number): void {
        if (this.winner === null) {
            this.winner = {
                id: carID,
                wins: 1,
                time: time,
            }

            this.handleWinner(this.winner)
        }
        return
    }
    async handleWinner(winner: WinnerItem): Promise<void> {
        winner = winner as WinnerItem
        const res = await fetch(`http://127.0.0.1:3000/winners/${winner.id}`, {
            method: 'GET',
        })
        if (res.ok) {
            const windata = await res.json()
            await fetch(`http://127.0.0.1:3000/winners/${winner.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    wins: windata.wins + 1,
                    time: Math.min(windata.time, winner.time),
                }),
            })
        } else {
            await fetch(`http://127.0.0.1:3000/winners`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(winner),
            })
        }
    }
    async startCarRace(carId: number, car: HTMLElement): Promise<void> {
        await this.toggleEngine(carId, 'started').then((res) => {
            const response = res as engineStartResp
            this.animateCar(car, response.distance, response.velocity)
            this.toggleDrive(carId)
                .then(() => {
                    this.toggleEngine(carId, 'stopped')
                    if (this.winner === null && window.location.hash === '#garage' && this.raceStatus === true) {
                        this.addWinner(carId, Math.round(response.distance / response.velocity / 1000))
                        this.raceStatus = false
                    }
                })

                .catch((err) => {
                    if (err) {
                        const anim = car.getAnimations()[0]
                        if (anim) {
                            anim.pause()
                        }
                        this.toggleEngine(carId, 'stopped')
                    }
                })
        })
    }
    startCarManual(id: number, status: 'started' | 'stopped'): void {
        const carId = id
        const track = document.querySelector(`[data-track-id="${id}"]`) as HTMLElement

        const car = track.querySelector('.race-car') as HTMLElement
        this.toggleEngine(carId, status).then((res) => {
            const response = res as engineStartResp
            if (status === 'started') {
                this.animateCar(car, response.distance, response.velocity)
                this.toggleDrive(carId)
                    .then(() => {
                        this.toggleEngine(carId, 'stopped')
                    })

                    .catch((err) => {
                        if (err) {
                            car.getAnimations()[0].pause()
                            this.toggleEngine(id, 'stopped')
                        }
                    })
            } else {
                car.getAnimations().forEach((anim) => anim.cancel())
                car.style.transform = 'translateX(0px)'
            }
        })
    }
    timer(): void {
        let counter = 12
        const interval = setInterval(() => {
            ;(document.querySelector('.race-timer') as HTMLElement).innerHTML = `Race Timer:${counter}`
            counter--
            if (counter === -1) {
                clearInterval(interval)
            }
        }, 1000)
    }
    showAnnouncement(car: WinnerItem): void {
        const carName = (document.querySelector(`[data-car-id="${car.id}"]`) as HTMLElement)?.dataset.trackName
        document.querySelector('.announcement-overlay')?.classList.remove('hidden')
        ;(document.querySelector('.announcement-name') as HTMLElement).innerHTML = `${carName} Won!`
        ;(document.querySelector('.announcement-seconds') as HTMLElement).innerHTML = `${
            (this.winner as WinnerItem).time
        } s`
    }
}
/*Todo fix that*/
export default CarController
