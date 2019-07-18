
const SerialPort = require('serialport')
const Readline = SerialPort.parsers.Readline
const port = new SerialPort('COM22')
// SerialPort.list().then(
//   ports => ports.forEach(console.log),
//   err => console.error(err)
// )
// const port = new SerialPort('COM22')

var ack = 0
var nack = 0

data = function(data){
    var res = data.split(','); 
    res.pop()
    res.shift()
    if(res[0] == 'ACK'){
        ack = 1
        nack = 0
    }else if(res[0] == 'NACK'){
        ack = 0
        nack = 1
    }
    // console.log(res)
}

const parser = port.pipe(new Readline({ delimiter: '7E' }))
parser.on('data',data)

var myVar = setInterval(myTimer, 1000)
function myTimer() {
    var d = new Date()
    d = d.getSeconds()
    if(d % 2 == 0){
        port.write('7E0A0A0001157E')        
    }else{
        port.write('7E0A0A0002167E')        
    }
}