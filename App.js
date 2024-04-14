import express from "express";
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import UserRoutes from "./Kanbas/users/routes.js";
import session from "express-session";
import "dotenv/config";

import cors from "cors";

const CONNECTION_STRING =
    process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";

mongoose.connect(CONNECTION_STRING, { dbName: "kanbas" });
const app = express();
app.use(
    cors({
        credentials: true,
        origin: [
            process.env.FRONTEND_URL,
            "https://a5--gilded-puffpuff-0ef8c0.netlify.app",
            "https://a6--gilded-puffpuff-0ef8c0.netlify.app",
        ],
    })
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));
app.use(express.json());
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
Lab5(app);
UserRoutes(app);
app.listen(process.env.PORT || 4000);
