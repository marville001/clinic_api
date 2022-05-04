const router = require("express").Router();

const { createOrFetchChatController } = require("../controllers/chats.controller");

const auth = require("../middlewares/auth");

router.post("/", auth, createOrFetchChatController);

module.exports = router;
