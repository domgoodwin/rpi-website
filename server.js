var os = require('os');

var express = require('express')
  , logger = require('morgan')
  , app = express()
  , template = require('jade')
  , sse = require('./sse')

var http = require('http').Server(app)
var io = require('socket.io')(http);

var ping = require('ping')
//var http = require('http').Server(app);



app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))
app.set('view engine', 'jade');



var fil = '/source/templates/';

app.get('/', function (req, res, next) {
    var pageName = 'homepage.jade';
    try {
        var html = template.compileFile(__dirname + fil + pageName)({ title: 'Home' })
        res.send(html)
    } catch (e) {
        next(e)
    }
})

app.get('*.js', function(req, res, next){
  res.sendFile(__dirname + '/index.html')
})

app.get('/functions', function (req, res, next) {
    var pageName = "functions.jade";
    try {
        var html = template.compileFile(__dirname + fil + pageName)({ title: 'Functions' })
        res.send(html)
    } catch (e) {
        next(e)
    }
})

app.get('/database', function (req, res, next) {
    var pageName = "database.jade";
    try {
        var html = template.compileFile(__dirname + fil + pageName)({ title: 'database' })
        res.send(html)
    } catch (e) {
        next(e)
    }
})

app.get('/sites', function (req, res, next) {
    var pageName = "sites.jade";
    try {
        var html = template.compileFile(__dirname + fil + pageName)({ title: 'Sites' })
        res.send(html)
    } catch (e) {
        next(e)
    }
})

app.get('/api', function (req, res, next) {
    var pageName = "api.jade";
    try {
        var html = template.compileFile(__dirname + fil + pageName)({ title: 'API' })
        res.send(html)
    } catch (e) {
        next(e)
    }
})

app.get('/dashboard', function (req, res, next) {
    //res.sseSetup()
    var pageName = "dashboard.jade";
    var memUsageNum = formatUsageString((os.freemem()/os.totalmem()));
    var memUse = os.freemem() + ' / ' +  os.totalmem() + ' : ' + memUsageNum + '%';
    var cpuUsageArr = os.loadavg();
    var cUse = '1:' + formatUsageString(cpuUsageArr[0]) + '% / 5:' + formatUsageString(cpuUsageArr[1]) + '% / 15:' + formatUsageString(cpuUsageArr[2]) + '%';
    console.log(cUse);
    try {

        var html = template.compileFile(__dirname + fil + pageName)({ title: 'Dashboard', cpuUsage: cUse, memoryUsage: memUse})
        res.send(html);
        //pingDevices();
    } catch (e) {
        next(e)
        console.log(e)
    }

});

io.on('connection', function(socket){
  console.log("Connected")
  socket.on('ping-get', function(){
    pingDevices()
  });
});

function formatUsageString(numberToProcess){
  return (numberToProcess * 100).toFixed(2);
}

var pingDevices = function(callback){
  var devices = [
    {host: 'DOM-NAS', ip: '192.168.0.100'},
    {host: 'DOM-PC', ip: '192.168.0.14'},
    {host: 'DOM-MOBILE', ip: '192.168.0.200'},
    {host: 'barbara-iPhone', ip: '192.168.0.201'},
    {host: 'E-TBS-IPHONE', ip: '192.168.0.202'}
  ]
  var count = 0
  devices.forEach(function(device){

    var host = device.host

    ping.sys.probe(device.ip, function(isAlive){
          count++
        var msg = isAlive ? host + ' is alive' : host + ' is dead';
        console.log("sending :" + msg)
        io.emit('ping', msg);
      });

  });
}


http.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
