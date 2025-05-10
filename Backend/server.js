//const express = require('express');
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();



const app = express();

app.use(express.json()); //allows us to acccept JASON data in the body of the req.body

app.post("/api/products", async (req, res) => {
  const product = req.body;
  // Here you would typically save the product to your database

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success:false, message: "All fields are required" });
  }

  const newProduct = new Product(product)
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(5000, () => {
  connectDB();
    console.log("Server started at http://localhost:5000");
});
