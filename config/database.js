const mongoose = require("mongoose");

(function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})()