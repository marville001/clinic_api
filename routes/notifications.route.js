const router = require("express").Router();

const { fetchNotificationsController } = require("../controllers/notifications.controller");

const auth = require("../middlewares/auth");

router.get("/:id", auth, fetchNotificationsController);

module.exports = router;
