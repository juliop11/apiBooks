const connection = require("../database");


function postRegister(request, response) {

    let respuesta;
    console.log(request.body);
    let sql = "INSERT INTO user ( name, last_name, email, photo, password)" +
        "VALUES ('" + request.body.name + "' , '" +
        request.body.last_name + "' , '" +
        request.body.email + "' , '" +
        request.body.photo + "' , '" +
        request.body.password + "')"
    console.log(sql);

    connection.query(sql, function (err, result) {


        if (err) {
            console.log(err);

        }
        else {
            console.log(result);

            if (result.insertId)
                respuesta = { error: null, codigo: 200, mensaje: 'Usuario agregado', data: null, userdata: result }

            else
                respuesta = { error: true, codigo: 200, mensaje: 'Usuario No agregado', data: null, userdata: result }
        }

        response.send(respuesta)
    })

}

function postLogin(request, response) {
    let respuesta;

    console.log(request.body);
    let password = request.body.password;
    let email = request.body.email
    let params = [password, email]
    let sql = "SELECT * FROM user WHERE password = ? AND user.email = ?";

    console.log(sql);

    connection.query(sql, params, function (err, result) {

        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            if (result.length > 0) {
                respuesta = { error: null, codigo: 200, mensaje: 'Usuario logueado', data: null, userdata: result }

            } else
                respuesta = { error: true, codigo: 200, mensaje: 'Usuario incorrecto', data: null, userdata: result }
        }
        response.send(respuesta)
    })
}




module.exports = { postRegister, postLogin};