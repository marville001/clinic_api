const router = require("express").Router();

const { uploadAvatar } = require("../controllers/avatar.controller");
const auth = require("../middlewares/auth");

router.put("/:id", auth, uploadAvatar)

module.exports = router;
