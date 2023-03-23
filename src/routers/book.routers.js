const {Router} = require ("express")
const router = Router();
const userCtrl = require("../controller/book.controller")


router.get("/books", userCtrl.getBooks);
router.post("/booksPost", userCtrl.postBook);
router.put("/books", userCtrl.putBook);     
router.delete("/books", userCtrl.deleteBook);  

module.exports = router;