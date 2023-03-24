const connection = require("../database");


function getBooks(request, response) {
    let respuesta;
    let params = [request.query.id_user, request.query.id_book];

    let sql;

    if (request.query.id_book != null && request.query.id_user != null) {
        sql = `SELECT * from book WHERE id_user = ? AND id_book = ?`
 
    }
    else{
        sql = `SELECT * from book WHERE id_user = ?`
    }

    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
            respuesta = { error: true, codigo: 200, mensaje: 'No encontrado', data: null, userdata: null }
        } else {
            console.log(result);

            if(result.length != 0){
                respuesta = { error: false, codigo: 200, mensaje: 'Encontrado', data: result, userdata: null }
            } else {
                respuesta = { error: false, codigo: 200, mensaje: 'usuario sin libros', data: result, userdata: null }
            }
        }
        response.send(respuesta)
    })
}

function postBook(request, response) {
    let respuesta;

    let params = [request.body.id_user,
    request.body.title,
    request.body.type,
    request.body.author,
    request.body.price,
    request.body.photo];

    let sql = "INSERT into book (id_user, title, type, author, price, photo) VALUES (?, ?, ?, ?, ?, ?)";

    console.log(params);
    connection.query(sql, params, function (err, result) {

        if (err) {
            console.log(err);
            response.status(500).send("Error al agregar libro");
        } else {
            console.log(result);
            if (result.insertId) {
                respuesta = { error: null, codigo: 200, mensaje: 'Libro agregado', data: null, userdata: result }
            } else {
                respuesta = { error: true, codigo: 400, mensaje: 'Libro no agregado', data: null, userdata: result }
            }
            response.send(respuesta)
        }
    });
}

function putBook(request, response) {
    let respuesta;

    let params = [
        request.body.title,
        request.body.type,
        request.body.author,
        request.body.price,
        request.body.photo,
        request.body.id_book,
        request.body.id_user];

    let sql = "UPDATE book SET  title=COALESCE(?, title), type=COALESCE(?, type), author=COALESCE(?, author), price=COALESCE(?, price), photo=COALESCE(?, photo) WHERE id_book =? AND id_user =?";

    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
            respuesta = { error: null, codigo: 200, mensaje: 'Error', data: null, userdata: result }
        } else {
            console.log(result);
            if (result.affectedRows == 1) {
                respuesta = { error: null, codigo: 200, mensaje: 'Libro modificado', data: null, userdata: result }
            } else {
                respuesta = { error: null, codigo: 200, mensaje: 'Libro no modificado', data: null, userdata: result }
            }
        }
        response.send(respuesta)
    });
}


function deleteBook(request, response) {
    let respuesta;
    let params = [request.body.id_user, request.body.id_book];
    let sql = "DELETE FROM book WHERE id_user = ? AND id_book=?";

    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
            respuesta = { error: null, codigo: 200, mensaje: 'Error al eliminar el libro', data: null, userdata: result }
        } else {
            console.log(result);
            if (result.affectedRows == 1) {
                respuesta = { error: null, codigo: 200, mensaje: 'Libro eliminado', data: null, userdata: result }
            } else {
                respuesta = { error: null, codigo: 200, mensaje: 'Error al eliminar el libro', data: null, userdata: result }
            }
        }
        response.send(respuesta)
    });
};


module.exports = { getBooks, postBook, putBook, deleteBook }