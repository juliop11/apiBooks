const connection = require("../database");


function postRegister(request, response) {

    console.log(request.body);
    let sql = "INSERT INTO user (id_user, name, last_name, email, photo, password)" +
        "VALUES ('" + request.body.id_user + "' , '" + request.body.name + "' , '" +
        request.body.last_name + "' , '" +
        request.body.email + "' , '" +
        request.body.photo + "' , '" +
        request.body.password + "')"
    console.log(sql);

    connection.query(sql, function (err, result) {

        if (err) {
            console.log(err);
            response.send("Error al agregar usuario")
        }
        else {
            console.log(result);
            if (result.insertId)
                response.send("Usuario agregado");
            else
                response.send("Error al agregar usuario");
        }
    })

}

function postLogin(request, response) {

    console.log(request.body);
    let password = request.body.password;
    let params = [password]
    let sql = "SELECT id_user, name, last_name, email, photo FROM user WHERE password = ? AND user.email = user.email";

    console.log(sql);

    connection.query(sql, params, function (err, result) {

        if (err) {
            console.log(err);
            response.send("Datos incorrectos")
        }
        else {
            console.log(result);
             if (result.length>0)
                response.send(result);
            else
                response.send("Datos incorrectos");
        }
    })
}

module.exports = { postRegister, postLogin };