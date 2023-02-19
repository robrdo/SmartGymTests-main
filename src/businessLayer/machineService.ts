import { IDataProvider } from "./data/dataProvider"
import { Machine, MachineState } from "./data/Machine"

export interface IMachineService {
    showMachines(): Machine[]
    setWeight(machineId: Machine['id'], weight: number): void
    switch(machineId: Machine['id'], state: MachineState): void
}


export default class MachineService implements IMachineService {
    private readonly _dataProvider: IDataProvider

    constructor(private dataProvider: IDataProvider) {
        this._dataProvider = dataProvider
    }

    showMachines(): Machine[] {
        return this._dataProvider.getAll()
    }

    setWeight(machineId: number, weight: number): void {
        const machine = this._dataProvider.get(machineId)
        if (!machine) {
            throw new Error('machine not found')
        }

        if ('weight' in machine) {
            machine.weight = weight
        }
    }

    switch(machineId: number, state: MachineState): void {
        const machine = this._dataProvider.get(machineId)
        if (!machine) {
            throw new Error('machine not found')
        }

        machine.state = state
    }
}