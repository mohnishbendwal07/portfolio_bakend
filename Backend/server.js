require("dotenv").config({ path: ".env" })

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* MIDDLEWARE */
app.use(cors({
    origin: "https://portfolio-project-lac-kappa.vercel.app"
}));
app.use(express.json());

console.log("MONGO_URI =", process.env.MONGO_URI);

/* ================= DATABASE CONNECTION ================= */

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("DB Error:", err));

/* ================= MODEL ================= */

const projectSchema = new mongoose.Schema({
  title: String,
  description: String
});

const Project = mongoose.model("Project", projectSchema);

/* ================= ROUTES ================= */

// Test route
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// Add project
app.post("/projects", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.json({ message: "Project added ✅", data: newProject });
  } catch (error) {
    res.status(500).json({ error: "Error adding project" });
  }
});

// Delete project

app.delete("/projects/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted ✅" });
});



// Get all projects
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Error fetching projects" });
  }
});

/* ================= SERVER ================= */

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on https://portfolio-bakend-k738.onrender.com`);
});