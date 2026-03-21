import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/Database.js";
import { connectRedis } from "./src/config/cache.js";




async function startServer() {
    try {
        // Try to connect to database, but don't fail if it doesn't work
        try {
            await connectDB();
        } catch (dbError) {
            console.log("Database connection failed, continuing without DB:", dbError.message);
        }

        // Try to connect to Redis, but don't fail if it doesn't work
        try {
            connectRedis();
        } catch (redisError) {
            console.log("Redis connection failed, continuing without Redis:", redisError.message);
        }

        const port = process.env.PORT || 8080;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.log("Error on starting the server...", error);
        process.exit(1);
    }
}


startServer();
