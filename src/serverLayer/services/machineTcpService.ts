import { MachineState } from "../../businessLayer/data/Machine"
import MachineService from "../../businessLayer/machineService"
import { TcpService } from "./tcpService"

//TODO: implement validation with pattern matching
export class MachineTcpService implements TcpService {
    constructor(private readonly _machineService: MachineService) {

    }

    //setWeight 2 30
    //'switch 2 on'
    invokeService(data: string): any {
        const args = data.split(' ')
        const method = args[0]
        switch (method) {
            case 'showMachines':
                return this.invokeShowMachines()
            case 'setWeight':
                return this.invokeSetWeight(args)
            case 'switch':
                return this.invokeSwitch(args)
            default:
                // by design we need to decide what to send to the client
                console.log('wrong args')
        }
    }

    private invokeShowMachines() {
        const result = this._machineService.showMachines()
        //would ve use Object.values if not an specific order of print
        return result.map(x => {
            let str = `${x.id},${x.name},${x.state}`
            // turn implementation of Machine interfaces into classes with method print and inheritance
            if ('weight' in x) {
                str += x.weight
            }
            str += '\n'
            return str
        })
    }

    private invokeSwitch(args: string[]) {
        if (args.length < 3) {
            console.log('invalid tcp request')
            //add more validation
        }
        //add nan validation on id and convert to type on state
        return this._machineService.switch(Number(args[1]), this.transformState(args[2]))
    }

    private invokeSetWeight(args: string[]) {
        if (args.length < 3) {
            console.log('invalid tcp request')
            //add more validation
        }
        //add nan validation 
        return this._machineService.setWeight(Number(args[1]), Number(args[2]))
    }

    private transformState(str: string): MachineState {
        switch (str) {
            case 'on':
                return 'on'
            case 'off':
                return 'off'
            default: throw new Error('invalid argument')
        }
    }
}

//const 


// export class MachineParser{

// }