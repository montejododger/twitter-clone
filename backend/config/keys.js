module.exports = {
    secretOrKey: process.env.SECRETORKEY,
    mongoURI: process.env.MONGO_URI,
    isProduction: process.env.NODE_ENV === "production",
};
