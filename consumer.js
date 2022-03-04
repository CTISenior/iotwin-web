const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 8090;
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["http://176.235.202.77:9092"],
});
const consumer = kafka.consumer({ groupId: "test-group" });

app.get("/", (req, res) => {
  res.send("IoTwin");
});

io.on("connection", (socket) => {
  const temp = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: "temperature", fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        });
        io.sockets.emit("getDeviceInfo", message.value.toString());
      },
    });
  };
  temp().catch((e) => console.error(e));
});

http.listen(port, () => {
  console.log(`IoTwin System running at http://localhost:${port}/`);
});
