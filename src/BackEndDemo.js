const app = require("express")();
const http = require("http").Server(app);
const port = 9090;
const cors = require("cors")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(cors());

app.post("/v1/api/device/add", (req, res) => {
  res.json(req.body);
  console.log(req.body);
});

http.listen(port, () => {
  console.log(`IoTwin System running at http://localhost:${port}/`);
});
