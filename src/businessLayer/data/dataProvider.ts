import { Maybe } from '../../common'
import { AirSquatMachine, LegPressMachine, Machine } from './Machine'
export interface IDataProvider {
    getAll(): Machine[]
    get(id: Machine['id']): Maybe<Machine>
}

export class DataProvider implements IDataProvider {
    private static readonly _machines: Map<Machine['id'], Machine> = new Map([
        [1, <AirSquatMachine>{ id: 1, state: 'off', name: 'AirSquatMachine' }],
        [2, <LegPressMachine>{ id: 1, state: 'off', name: 'LegPressMachine', weight: 100 }]
    ]);

    getAll(): Machine[] {
        return [...DataProvider._machines.values()]
    }
    get(id: number): Maybe<Machine> {
        return DataProvider._machines.get(id)
    }
}