const router = require("express").Router();

const { fetchNotificationsController, updateNotificationsController } = require("../controllers/notifications.controller");

const auth = require("../middlewares/auth");

router.get("/:id", auth, fetchNotificationsController);
router.put("/:id", auth, updateNotificationsController);

module.exports = router;
