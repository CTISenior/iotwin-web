const { Kafka } = require("kafkajs");

const main = async () => {
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
  });
  const producer = kafka.producer();
  const topic = "test-topic";
  const produceMessage = async () => {
    const randTemp = Math.floor(Math.random() * 10) + 30;
    const randHum = Math.floor(Math.random() * 10) + 30;

    try {
      await producer.send({
        topic,
        messages: [
          {
            value:
              '{"sn": "abc1", "ts": 1641739566640, "values": {"temperature": "' +
              randTemp +
              '", "humidity": "' +
              randHum +
              '", "combine": "0:13.13"}}',
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };
  const run = async () => {
    await producer.connect();
    setInterval(produceMessage, 2000);
  };
  run();
};

main().run;
