import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoConnection from './DB.js'
import authRoutes from "./routes/authRoutes.js"
import adminAuthRoutes from "./routes/adminAuthRoutes.js"
import adminUserRoutes from "./routes/adminUserRoutes.js"
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(cors())

mongoConnection()

const PORT = 9000

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// test api (optional)
app.get("/test", (req, res) => {
    res.send("Hi iam backend!")
})

app.use("/auth", authRoutes);
app.use("/admin/auth", adminAuthRoutes);
app.use("/admin/users", adminUserRoutes);
app.use("/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/admin/users", adminUserRoutes);
app.use("/feedback", feedbackRoutes);

app.listen(PORT, () => {
    console.log("Hi !,Backend running on " + PORT)
})