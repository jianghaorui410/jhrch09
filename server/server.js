"use strict";
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
//user
var USERS = [
    { id: "01", objectName: "jhr", Mark: "math:99;web:98;mysql:70" },
    { id: "02", objectName: "hhh", Mark: "math:99;web:98;mysql:70" },
];

//pro
var ALLUSERS = [
    { id: '01', userName: 'admin', password: "123456" },
    { id: '02', userName: 'aaa', password: "123456" },
]
const MIMA = [
    { userName: "aaa", password: "987654" }
]


app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});


//user
app.get('/users', function (req, resp) {
    resp.send(USERS);
    resp.end();
});

//alluser
app.get('/allusers', function (req, resp) {
    resp.send(ALLUSERS);
    console.log(1234);
    resp.end();
});

//user
app.get('/users/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of USERS) {
        if (user.id === id) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
});

//alluser
app.get('/allusers/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of ALLUSERS) {
        if (user.id === id) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
});

//mima
app.post('/mima', function (req, resp) {
    console.log('aaaa');
    // json
    // url-encoded   
    // form-data    
    // json
    let founded = false;
    for (let user of MIMA) {
        console.log(user.userName + "    " + user.password);
        if (user.userName === req.body.userName && user.password === req.body.password) {
            resp.send({ succ: true });
            console.log('abcd');
            founded = true;
        }

    }
    if (founded == false) {
        resp.send({ succ: flase });
    }

    resp.end();
});
console.log('suc')

//user
app.post('/user', function (req, resp) {
    // json
    // url-encoded   
    // form-data    
    // json
    USERS.push(req.body);
    resp.send({ succ: true });
    resp.end();
});

//alluser
app.post('/allusers', function (req, resp) {
    // json
    // url-encoded   
    // form-data    
    // json
    ALLUSERS.push(req.body);
    resp.send({ succ: true });
    resp.end();
});

// 修改用户

//user 
app.put('/user', function (req, resp) {
    // json    
    let founded = false;
    for (let user of USERS) {
        if (user.id === req.body.id) {
            user.userName = req.body.userName;
            user.password = req.body.password;
            founded = true;
            break;
        }
    }
    if (founded) {
        USERS.push(req.body);
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});

//alluser 
app.put('/allusers', function (req, resp) {
    // json    
    let founded = false;
    for (let allusers of ALLUSERS) {
        if (allusers.id === req.body.id) {
            allusers.userName = req.body.userName;
            allusers.password = req.body.password;
            founded = true;
            break;
        }
    }
    if (founded) {
        ALLUSERS.push(req.body);
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});

//user
app.delete('/user/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let user of USERS) {
        if (user.id === req.params.id) {
            USERS.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});

//alluser
app.delete('/allusers/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let allusers of ALLUSERS) {
        if (allusers.id === req.params.id) {
            ALLUSERS.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});



app.listen(8080, function () {
    console.log('服务器在8080端口启动');
});