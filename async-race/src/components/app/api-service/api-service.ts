import { CarItem, EngineStartResp, WinnerItem } from '../interfaces'

class ApiService {
  apiUrl: string
  constructor() {
    this.apiUrl = `http://127.0.0.1:3000`
  }
  async requestCreate(car: CarItem): Promise<void> {
    await fetch(`http://127.0.0.1:3000/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    })
  }

  async requestDelete(id: number): Promise<void> {
    await fetch(`${this.apiUrl}/garage/${id}`, {
      method: 'DELETE',
    })
    const res = await fetch(`${this.apiUrl}/winners/${id}`)
    if (res.ok) {
      await fetch(`${this.apiUrl}/winners/${id}`, {
        method: 'DELETE',
      })
    }
  }
  async requestCar(id: number): Promise<CarItem> {
    const res = await fetch(`${this.apiUrl}/garage/${id}`)
    if (res.ok) {
      const resp = await res.json()
      return resp
    }
  }
  async requestUpdateCar(car: CarItem, id: number): Promise<CarItem> {
    const res = await fetch(`${this.apiUrl}/garage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    })
    if (res.ok) {
      const resp = res.json()
      return resp
    }
  }

  async requestTotal(): Promise<number> {
    const res = await fetch(`${this.apiUrl}/garage?_limit=7`)
    return Math.ceil(Number([...res.headers.entries()].find((el) => el[0] === 'x-total-count')?.[1]) / 7)
  }

  async requestCars(page: number): Promise<Response> {
    const res = await fetch(`${this.apiUrl}/garage?_page=${page}&_limit=7`)
    if (res.ok) {
      return res
    }
  }
  async requestToggleEngine(carId: number, status: 'started' | 'stopped'): Promise<EngineStartResp> {
    const res = await fetch(`${this.apiUrl}/engine?id=${carId}&status=${status}`, {
      method: 'PATCH',
    })
    if (res.ok) {
      const engineResp = await res.json()
      return engineResp
    }
  }

  async requestToggleDrive(carId: number): Promise<Response | Error> {
    const res = await fetch(`${this.apiUrl}/engine?id=${carId}&status=drive`, {
      method: 'PATCH',
    })
    if (res.status === 500) {
      throw new Error('500')
    }
    if (res.ok) {
      return res
    }
  }
  async requestWinner(winner: WinnerItem): Promise<WinnerItem> {
    winner = winner as WinnerItem
    const res = await fetch(`${this.apiUrl}/winners/${winner.id}`)
    if (res.ok) {
      const windata = await res.json()
      return windata
    } else {
      throw new Error('Er')
    }
  }
  async requestUpdateWinner(windata: WinnerItem, winner: WinnerItem) {
    await fetch(`${this.apiUrl}/winners/${winner.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wins: windata.wins + 1,
        time: Math.min(windata.time, winner.time),
      }),
    })
  }
  async requestAddWinner(winner: WinnerItem): Promise<void> {
    await fetch(`${this.apiUrl}/winners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    })
  }
  async requestWinnerTotal(): Promise<number> {
    const res = await fetch(`${this.apiUrl}/winners?_limit=10`)
    return Math.ceil(Number([...res.headers.entries()].find((el) => el[0] === 'x-total-count')?.[1]) / 10)
  }
  async requestWinnerPage(page: number, sort: string, order: string): Promise<Response> {
    const res = await fetch(`${this.apiUrl}/winners?_page=${page}&_sort=${sort}&_order=${order}_limit=10`)
    if (res.ok) {
      return res
    }
  }
}
export default ApiService
