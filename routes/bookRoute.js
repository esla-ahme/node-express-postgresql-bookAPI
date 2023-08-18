const router = require("express").Router();
const controller = require("../controllers/bookController");

router.get("/", controller.getBookList);
router.get("/:bookId", controller.getBookById);
router.post("/", controller.addBook);

module.exports = router;
