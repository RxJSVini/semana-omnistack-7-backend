const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const MongoDB = require('./database/conn');
const { Server } = require("socket.io");
const http = require('http');
const server = http.createServer(app);

const io = new Server(server);

io.on('connection', () => {
    io.emit("msg", "Socket.io testes Node.js")

});

//Instanciando banco de dados
MongoDB.init();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({}));
app.use("/public", express.static(path.resolve(__dirname, "..", "public")));
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads/resized")));
app.use((req, res, next) =>{
    req.io = io;
    return next();
})
app.use("/api", routes);


server.listen(process.env.PORT || 3333, () => console.log("HTTP SERVER NODEJS"));