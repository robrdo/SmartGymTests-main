export interface BaseMachine {
    id: number
    state: MachineState
    name: MachineType
}

export interface LegPressMachine extends BaseMachine {
    weight: number
}

export interface AirSquatMachine extends BaseMachine {

}

export type Machine = LegPressMachine | AirSquatMachine

export type MachineType =
    | 'LegPressMachine'
    | 'AirSquatMachine'



export type MachineState =
    | 'on'
    | 'off'