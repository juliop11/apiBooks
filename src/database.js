let mysql = require("mysql2");

let connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "Puertollano1",
    database: "appbooks"
})


connection.connect(function (error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Conexion directa");
    }
});

module.exports = connection;