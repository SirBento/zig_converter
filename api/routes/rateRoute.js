const rateController = require("../controllers/rateController");
const router = require("express").Router();

router.get('/', rateController.rate);
router.post('/set', rateController.setRate);

module.exports = router
