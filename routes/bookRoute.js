const router = require("express").Router();
const controller = require("../controllers/bookController");

router.get("/", controller.getBookList);
router.get("/:bookId", controller.getBookById);
router.post("/", controller.addBook);
router.put("/update/:bookId", controller.editBook);
router.delete("/delete/:bookId", controller.deleteBook);

module.exports = router;
