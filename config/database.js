import mongoose from "mongoose";

(function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParse: true,
            useUnifiedTopology: true
        })
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})()