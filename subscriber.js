const amqp = require("amqplib/callback_api");

amqp.connect(`amqp://localhost`, (err, connection) => {
  if (err) {
    throw err;
  }
  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }
    let queueName = "technical";

    channel.assertQueue(queueName, {
      durable: false,
    });
    channel.consume(queueName, (msg) => {
      console.log(msg.content.toString(), "getting from the receiver ");
      channel.ack(msg);
    });
  });
});
