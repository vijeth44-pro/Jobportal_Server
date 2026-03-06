import express from 'express'
import cors from 'cors'
import mongoConnection from './DB.js'
import authRoutes from "./routes/authRoutes.js"
import adminAuthRoutes from "./routes/adminAuthRoutes.js"
import adminUserRoutes from "./routes/adminUserRoutes.js"
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";


const app = express()
app.use(express.json())

mongoConnection()

app.use(cors())

const PORT = 9000


//test api(optional)
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