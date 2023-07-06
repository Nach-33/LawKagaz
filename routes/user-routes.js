const router = require("express").Router();

const { getProfile, sendRequest, acceptRequest } = require("../controllers/user-controllers")

router.get("/profile", getProfile);

router.post("/sendRequest/:id", sendRequest);

router.post("/acceptRequest/:id", acceptRequest);

module.exports = router;
