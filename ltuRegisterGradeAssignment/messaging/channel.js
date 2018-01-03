const amqp = require('amqplib/callback_api');

//Använder en environment variable eller default värden för login.
const url = 'amqp://guest:guest@localhost:5672';

module.exports = createQueueChannel;
//Skapar en connection och etablerar en kanal
function createQueueChannel(queue, cb) {
    amqp.connect(url, onceConnected);

    function onceConnected(err, conn) {
        if (err) {
            console.error('Error connecting to RabbitMQ:', err.stack);
        }
        else {
            console.log('Connected');
            conn.createChannel(onceChannelCreated);
        }

        function onceChannelCreated(err, channel) {
            if (err) {
                cb(err);
            }
            else {
                channel.assertQueue(queue, {durable: true}, onceQueueCreated);
            }

            function onceQueueCreated(err) {
                if (err) {
                    cb(err);
                }
                else {
                    cb(null, channel, conn);
                }
            }
        }
    }
}