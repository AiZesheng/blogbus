var express = require("express");
var app = express();
var connection = require("./db");
connection.connect();
app.use("/", express.static(__dirname + "/www"));
app.use("/regist", express.static(__dirname + "/www/regist.html"));
app.listen(3000);
// 注册功能
app.get("/do_regist", function (req, res) {
    var username = req.query.user;
    var password = req.query.pwd1;
    var nickname = req.query.nickname;
    var sql = "insert into t_user(username,password,nickname) values('" + username + "','" + password + "','" + nickname + "')";
    connection.query(sql, function (err, result) {
        if (result.affectedRows > 0) {
            res.send("success");
        } else {
            res.send("error");
        }
    });
});
// 查询用户名
app.get("/checkUser", function (req, res) {
    var username = req.query.user;
    var sql = "select * from t_user where(username='" + username + "')";
    connection.query(sql, function (err, rows) {
        if (rows.length > 0) {
            res.send("have");
        } else {
            res.send("no");
        }
    });
});
// 登录功能的实现
app.get("/login", function (req, res) {
    var username = req.query.user;
    var password = req.query.pwd;
    var sql = "select * from t_user where username='" + username + "' and password = '" + password + "'";
    connection.query(sql, function (err, rows) {
        console.log(rows);
        res.send(rows);
    });
});