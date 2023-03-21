const {Router} = require ("express")
const router = Router();
const userCtrl = require("../controller/user.controller")

router.get("/books", userCtrl.getBooks);
router.post("/register", userCtrl.postRegister);       
router.post("/login", userCtrl.postLogin);
     

module.exports = router;