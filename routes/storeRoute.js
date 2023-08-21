// create all store routes (get, getById, post, put, delete)
const router = require("express").Router();
const controller = require("../controllers/storeController");

router.get("/", controller.getStoreList);
router.get("/:storeId", controller.getStoreById);
router.post("/", controller.addStore);
module.exports = router;
