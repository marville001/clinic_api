const router = require("express").Router();

const { createOrFetchChatController, fetchAllChatsController } = require("../controllers/chats.controller");

const auth = require("../middlewares/auth");

router.get("/", auth, fetchAllChatsController);
router.post("/", auth, createOrFetchChatController);

module.exports = router;
