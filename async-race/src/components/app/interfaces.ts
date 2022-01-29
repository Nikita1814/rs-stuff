export interface engineStartResp {
    velocity: number
    distance: number
}
export interface CarItem {
    name: string | null
    color: string | null
    id?: number
}
export interface WinnerItem {
    id: number
    wins: number
    time: number
}

export interface engineDriveResp {
    success: true
}

export interface WinnerItem {
    id: number
    wins: number
    time: number
}
export interface CarItem {
    name: string | null
    color: string | null
    id?: number
}
