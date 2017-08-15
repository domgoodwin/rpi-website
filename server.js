var os = require('os');
var express = require('express')
  , logger = require('morgan')
  , app = express()
  , template = require('jade')

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

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
    var pageName = "dashboard.jade";
    var memUsageNum = formatUsageString((os.freemem()/os.totalmem()));
    var memUse = os.freemem() + ' / ' +  os.totalmem() + ' : ' + memUsageNum + '%';
    var cpuUsageArr = os.loadavg();
    var cUse = '1:' + formatUsageString(cpuUsageArr[0]) + ' / 5:' + formatUsageString(cpuUsageArr[1]) + ' / 15:' + formatUsageString(cpuUsageArr[2]);
    console.log(cUse);
    //console.log( 'CPU Usage (%): ' + v );
    try {
        var html = template.compileFile(__dirname + fil + pageName)({ title: 'Dashboard', cpuUsage: cUse, memoryUsage: memUse})
        res.send(html)
    } catch (e) {
        next(e)
    }
})

function formatUsageString(numberToProcess){
  return (numberToProcess * 100).toFixed(2);
}


app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
