const rateController = require("../controllers/rateController");
const router = require("express").Router();

router.get('/rate', rateController.rate);

module.exports = router
