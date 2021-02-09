var app = require("express")();
var http = require("http").createServer(app);
var axios = require("axios");
var cors = require("cors");
const API_KEY = "3b5b2c5a5d90ef09d98c467547d79f52";
const region = "Seoul";
app.use(cors());
app.use("/get-weather", async function (req, res) {
  console.log("in");
  const result = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${region}&APPID=${API_KEY}&units=metric`
  );

  res.send(result.data);
});

app.use("/", function(req, res) {
  res.send("HTTP 200 Ok");
});
// 서버리슨
http.listen(8080, () => {
  console.log("Server listening on port 8080");
});
