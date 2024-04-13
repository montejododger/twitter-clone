const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Tweet = mongoose.model("Tweet");
const { requireUser } = require("../../config/passport");
const validateTweetInput = require("./../../validations/tweets");

//! GET ALL TWEETS
router.get("/", async (req, res) => {
    try {
        const tweets = await Tweet.find()
            .populate("author", "_id username")
            .sort({ createdAt: -1 });
        return res.json(tweets);
    } catch (err) {
        return res.json([]);
    }
});

//! GET ALL USERS TWEETS
router.get("/user/:userId", async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.userId);
    } catch (err) {
        const error = new Error("User not found");
        error.statusCode = 404;
        error.errors = { message: "No user found with that id" };
        return next(error);
    }
    try {
        const tweets = await Tweet.find({ author: user._id })
            .sort({ createdAt: -1 })
            .populate("author", "_id username");
        return res.json(tweets);
    } catch (err) {
        return res.json([]);
    }
});

//! GET A SINGLE TWEET
router.get("/:id", async (req, res, next) => {
    try {
        const tweet = await Tweet.findById(req.params.id).populate(
            "author",
            "_id username"
        );
        return res.json(tweet);
    } catch (err) {
        const error = new Error("Tweet not found");
        error.statusCode = 404;
        error.errors = { message: "No tweet found with that id" };
        return next(error);
    }
});

//! USER CREATE A TWEET
router.post("/", requireUser, validateTweetInput, async (req, res, next) => {
    try {
        const newTweet = new Tweet({
            text: req.body.text,
            author: req.user._id,
        });

        let tweet = await newTweet.save();
        tweet = await tweet.populate("author", "_id username");
        return res.json(tweet);
    } catch (err) {
        next(err);
    }
});

//! Grab the id of the tweet from the url
//! Grab the tweet from the database with the id
//! if not tweet return 404 message
//! remove tweet
//! return 204 message

router.delete("/:id", requireUser, async (req, res, next) => {
    try {
        const tweetId = req.params.id;

        const tweet = Tweet.findById(tweetId);
        if (!tweet) return res.status(404).json({ message: "Tweet not found" });

        await tweet.deleteOne();
        return res.status(204).json({ message: "Tweet deleted successfully" });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
