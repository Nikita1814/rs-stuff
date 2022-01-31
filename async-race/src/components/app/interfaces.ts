export interface EngineStartResp {
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

export interface EngineDriveResp {
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
