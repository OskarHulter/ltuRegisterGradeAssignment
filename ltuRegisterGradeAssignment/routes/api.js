const express = require('express');
const router = express.Router();
const ProvTillfalle = require('../models/provTillfalle');
const Channel = require('../messaging/channel');
const Worker = require('../messaging/worker');

//Kö till rabbitMQ
const queue = 'queue';


//Hämtar en lista över provTillfallen från db
router.get('/provtillfallen', function (req, res, next) {
    ProvTillfalle.find({}).then(function (provTillfallen) {
        res.send(provTillfallen);

        //var msg = JSON.stringify(provTillfallen);
        //Skickar rabbitMQ meddelande
        Channel(queue, function (err, channel, conn) {
            if (err) {
                console.error(err.stack);
            }
            else {
                console.log('Channel and queue created');
                //Work sparar meddelandet
                let work = provTillfallen;
                channel.sendToQueue(queue, encode(work), {
                    persistent: true
                });
                setImmediate(function () {
                    channel.close();
                    conn.close();
                });
            }
        });

        //Gör en string av JSON-data
        function encode(doc) {
            return new Buffer(JSON.stringify(doc));
        }
    });
});

//Lägger till ett provTillfalle till db
router.post('/provtillfallen', function (req, res, next) {
    ProvTillfalle.create(req.body).then(function (provTillfalle) {
        res.send(provTillfalle);
    }).catch(next);
});

//Uppdaterar ett provTillfalle i db
router.put('/provtillfallen/:id', function (req, res, next) {
    ProvTillfalle.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(function (provTillfalle) {
        res.send(provTillfalle);
        console.log(provTillfalle);
        //Skickar rabbitMQ meddelande
        Channel(queue, function (err, channel, conn) {
            if (err) {
                console.error(err.stack);
            }
            else {
                console.log('Channel and queue created');
                //Work sparar meddelandet
                let work = provTillfalle;
                channel.sendToQueue(queue, encode(work), {
                    persistent: true
                });
                setImmediate(function () {
                    channel.close();
                    conn.close();
                });
            }
        });

        //Gör en string av JSON-data
        function encode(doc) {
            return new Buffer(JSON.stringify(doc));
        }

    });
});

//Tar bort provTillfalle från db
router.delete('/provtillfallen/:id', function (req, res, next) {
    ProvTillfalle.findByIdAndRemove({ _id: req.params.id }).then(function (provTillfalle) {
        res.send(provTillfalle);
    });
});

/*Skickar rabbitMQ meddelande
router.get('/meddelande', function (req, res, next) {
    //rabbitMQ test message
    Channel(queue, function (err, channel, conn) {
        if (err) {
            console.error(err.stack);
        }
        else {
            console.log('Channel and queue created');
            
            let work = "hejsan";
            channel.sendToQueue(queue, encode(work), {
                persistent: true
            });
            setImmediate(function () {
                channel.close();
                conn.close();
            });
        }
    });

    function encode(doc) {
        return new Buffer(JSON.stringify(doc));
    }
});
*/
module.exports = router;