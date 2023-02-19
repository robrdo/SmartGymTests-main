import { Server } from 'net'
import { DataProvider } from '../businessLayer/data/dataProvider'
import MachineService from '../businessLayer/machineService'
import { MachineTcpService } from './services/machineTcpService'
import * as dotenv from 'dotenv'
dotenv.config()

let configPort = Number(process.env.PORT)
const port = isNaN(configPort) ? 3000 : configPort
const host = process.env.HOST || 'localhost'

const dataProvider = new DataProvider()
const machineService = new MachineService(dataProvider)
const machineTcpService = new MachineTcpService(machineService)

export class TcpService {
    constructor(private readonly __port: number,
        private readonly _host: string,
        private readonly _service: TcpService) {
        const server = new Server()
        server.listen(port, host, function () {
            console.log(`Server listening for connection requests on socket localhost:${port}`)
        })
    }

    public listen() {

    }
}

//TODO: WRAP INTO CLASS AND INJECT TCPSERVICE
const server = new Server()
// The server listens to a socket for a client to make a connection request.
// Think of a socket as an end point.
server.listen(port, host, function () {
    console.log(`Server listening for connection requests on socket localhost:${port}`)
})



server.on('connection', function (socket) {
    console.log('A new connection has been established.')

    // The server can also receive data from the client by reading from its socket.
    socket.on('data', function (buffer) {
        const data = buffer.toString()
        console.log(`Data received from client: ${data}`)
        const result = machineTcpService.invokeService(data)
        if (result) {
            socket.write(result)
        }
        //socket.end()
    })

    // When the client requests to end the TCP connection with the server, the server
    // ends the connection.
    socket.on('end', function () {
        console.log('Closing connection with the client')
    })

    // Don't forget to catch error, for your own sake.
    socket.on('error', function (err) {
        console.log(`Error: ${err}`)
    })
})



