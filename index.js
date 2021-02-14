// var app = require("express")();
// var http = require("http").createServer(app);
var axios = require("axios");
// var cors = require("cors");
var mysql = require("mysql");
var net_server = require("net");

var conn = mysql.createConnection({
  host: "db-5nspr-fkr.cdb.fin-ntruss.com",
  port: "3306",
  user: "youngin0108",
  password: "!qlalf7431",
  database: "db",
});

const API_KEY = "3b5b2c5a5d90ef09d98c467547d79f52";
const region = "Seoul";

// app.use(cors());

async function getWeatherAsync() {
  console.log("get-weather");

  const result = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${region}&APPID=${API_KEY}&units=metric`
  );

  var sql =
    "INSERT INTO weatherTable VALUES (NULL, " +
    result.data.main.temp +
    ", " +
    result.data.main.feels_like +
    ", " +
    result.data.main.temp_min +
    ", " +
    result.data.main.temp_max +
    ", " +
    result.data.main.pressure +
    ", " +
    result.data.main.humidity +
    ")";
  conn.query(sql, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log("weather info inserted.");
  });
  console.log(result.data);
  return result.data;
}

var server = net_server.createServer(function (client) {
  console.log("Client connection: ");

  client.setTimeout(500);
  client.setEncoding("utf8");

  client.on("data", async function () {
    const data = await getWeatherAsync();

    writeData(client, data);
  });

  client.on("end", function () {
    console.log("Client disconnected");
  });

  client.on("error", function (err) {
    console.log("Socket Error: ", JSON.stringify(err));
  });

  client.on("timeout", function () {
    console.log("Socket Timed out");
  });
});

server.listen(8080, function () {
  console.log("Server listening: " + JSON.stringify(server.address()));
  server.on("close", function () {
    console.log("Server Terminated");
  });
  server.on("error", function (err) {
    console.log("Server Error: ", JSON.stringify(err));
  });
});

function writeData(socket, data) {
  console.log(" data : " + data);
  var success = socket.write(JSON.stringify(data));
  if (!success) {
    console.log("Client Send Fail");
  }
}
