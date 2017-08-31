/**
 * transformers
 * Created by nsubbot on 20.08.17.
 * All rights reserved by Nikita Subbot ©
 */
let util = require('util');
let clients = [];

exports.subscribe = function (req, res) {
    console.log('subscribe');
    clients.push(res);

    res.on('close', function () {
        clients.splice(clients.indexOf(res), 1);
    })
};

exports.publish = function (transformer) {
    console.log("publish '%s'", transformer);

    clients.forEach(function (res) {
        res.end(util.inspect(transformer));
    });

    clients = [];
};
    // real time chat base
    //
    // function Transformer(owner, name, planet, health, attack, type) {
    //     this.owner = owner;
    //     this.name = name;
    //     this.homePlanet = planet;
    //     this.health = health;
    //     this.attack  = attack;
    //     this.type = type;
    // };
    //
    // publish.onsubmit=function () {
    //     let xhr = new XMLHttpRequest();
    //     xhr.open("POST", "/publish", true);
    //     let inputData = {
    //         owner: this.elements.owner.value,
    //         name: this.elements.name.value,
    //         type: this.elements.type.value,
    //         home_planet: this.elements.homePlanet.value,
    //         attack: this.elements.attack.value,
    //         health: this.elements.health.value
    //     };
    // //        newTransformer.save(function (err, newTransformer, affected) {
    // //            console.log(arguments);
    // //        });
    //     let newTransformer = new Transformer(inputData.owner, inputData.name, inputData.home_planet, inputData.attack, inputData.health, inputData.type);
    //     xhr.send(JSON.stringify(newTransformer));
    //     this.elements.owner.value = "";
    //     this.elements.name.value =  "";
    //     this.elements.type.value =  "";
    //     this.elements.homePlanet.value =  "";
    //     this.elements.attack.value =  "";
    //     this.elements.health.value =  "";
    //     return false;
    // };
    //
    // subscribe();
    //
    // function subscribe() {
    //     let xhr = new XMLHttpRequest();
    //
    //     xhr.open("GET", "subscribe", true);
    //
    //     xhr.onload = function () {
    //         let li = document.createElement("li");
    //         li.textContent = this.responseText;
    //         transformers.appendChild(li);
    //
    //         subscribe();
    //     };
    //
    //     xhr.onerror = xhr.onabort = function () {
    //         setTimeout(subscribe, 500);
    //     };
    //
    //     xhr.send('');
    // }


// app.use(function (req, res, next) {
//     if (req.url === "/subscribe") {
//         transformers_room.subscribe(req, res);
//     }
//     else {
//         next();
//     }
// });