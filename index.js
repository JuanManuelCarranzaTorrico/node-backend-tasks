//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

var tasks = []

app.get("/", (req, res, next) => {
    res.json("{ 'message': 'Tasks server online'}");
});

app.post("/tasks", jsonParser, (req, res, next) => {
    req.body.id = tasks.length + 1;
    req.body.status = "pendiente";
    tasks.push(req.body);
    
    res.send("OK");
});

app.get("/tasks", (req, res, next) => {
    res.json(tasks);
});

app.get("/tasks/:taskId", (req, res) => {
    id=req.params.taskId-1;
    res.send(tasks[id]);
});

app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});

app.delete("/tasks/:taskId", (req, res, next) => {
    id=req.params.taskId-1;
    tasks.splice(id, 1);
    res.send("Deleted");
});


app.put("/tasks/:taskId", jsonParser, (req, res, next) => {
    var id = req.params.taskId-1;
    var state = req.query.state;
    if(state==="edit"){
    tasks[id].title=req.body.title;
    tasks[id].detail=req.body.detail;
    res.send("Updated");
    }
    if(state==="completado"){
        tasks[id].status="completado";
        res.send("Updated");
        }
    if(state==="pendiente"){
        tasks[id].status="pendiente";
        res.send("Updated");
        }
});