const router = require("express").Router();

const { fetchMessagesController,sendMessageController } = require("../controllers/messages.controller");

const auth = require("../middlewares/auth");

router.get("/:chatId", auth, fetchMessagesController);
router.post("/", auth, sendMessageController);

module.exports = router;
