const express = require("express");
const router = express.Router();

/* GET Tweets listing. */
router.get("/", function (req, res, next) {
    // res.send('respond with a resource');
    res.json({
        message: "GET /api/tweets",
    });
});

module.exports = router;
