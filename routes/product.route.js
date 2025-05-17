import express from "express";
 const router = express.Router();
 import Product from "../models/product.model.js";
 import mongoose from "mongoose";



router.get("/", async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.error("Error in fetching products:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  router.post("/", async (req, res) => {
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
  
 router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const productData = req.body;
  
    try { 
      const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product ID" });
        
      }
  
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      console.error("Error in updating product:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  

  
  //delete products
  
 router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Product deleted successfully" }); 
    }catch (error) {
      console.error("Error in deleting product:", error);
      res.status(404).json({ success: false, message: "Product not found" });
    }
  });

  export default router;