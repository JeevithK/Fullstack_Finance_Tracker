import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import recordmodel from "./models/recordmodel.js";
import Usersmodel from "./models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import verifyToken from "./middlewares/authmiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://fullstack-finance-tracker-grk2.onrender.com", // or your frontend URL
    credentials: true,
  })
);

app.post("/createrecord", verifyToken, async (req, res) => {
  try {
    let { description, amount, category, type, paymentmethod, date } = req.body;

    if (type === "Expense") {
      amount = -Math.abs(amount);
    } else {
      amount = Math.abs(amount);
    }

    const newRecord = await recordmodel.create({
      userid: req.user.userid,
      description,
      amount,
      category,
      type,
      paymentmethod,
      date,
    });

    res
      .status(201)
      .json({ message: "Record created successfully", record: newRecord });
  } catch (error) {
    console.error("Error creating record:", error);
    res.status(500).json({ error: "Failed to create record" });
  }
});

app.get("/getrecordbyid/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const record = await recordmodel.findOne({
      userid: req.user.userid,
      _id: id,
    });
    res.status(202).json(record);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

app.get("/getallrecord", verifyToken, async (req, res) => {
  try {
    const allrecord = await recordmodel.find({ userid: req.user.userid });
    res.status(202).json({ allrecord, name: req.user.name });
    console.log(allrecord);
  } catch (err) {
    console.error(err);
    res.status(400).json({ Error: err });
  }
});

app.put("/editrecord/:id", verifyToken, async (req, res) => {
  try {
    const updatedRecord = await recordmodel.findOneAndUpdate(
      { _id: req.params.id, userid: req.user.userid },
      req.body,
      { new: true }
    );

    if (!updatedRecord) {
      return res
        .status(404)
        .json({ message: "Record not found or not authorized" });
    }

    res.status(202).json(updatedRecord);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Update failed", details: err });
  }
});

app.delete("/deleterecord/:id", verifyToken, async (req, res) => {
  try {
    const deleterecord = await recordmodel.deleteOne({
      userid: req.user.userid,
      _id: req.params.id,
    });

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(404).json({ message: "Deletion failed" });
  }
});

// Auth

app.post("/auth/register", async (req, res) => {
  const { username, password, name } = req.body;
  const existing = await Usersmodel.findOne({ username });

  if (existing) {
    res.status(400).json({ message: "User already Exists" });
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  await Usersmodel.create({ username, name, password: hashedpassword });
  res.status(200).json({ message: "User Registered Successfully" });
});

app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  const isuserthere = await Usersmodel.findOne({ username });
  if (!isuserthere) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const decpassword = await bcrypt.compare(password, isuserthere.password);

  if (!decpassword) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      username: isuserthere.username,
      userid: isuserthere._id,
      name: isuserthere.name,
    },
    process.env.SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({ token });
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("this is from 5001");
});
