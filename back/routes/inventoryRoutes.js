import express from "express";
import {
  addInventory,
  getInventory,
  updateInventoryItem,
  issueInventory,
  getIssuedInventory,
  removeInventoryItem,
  purchaseInventory,
  restockInventory,
  requestInventoryFaculty,
  getViewRequestInventory,
  removeRequestInventory,
} from "../controllers/inventoryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post(
  "/inventory",
  authMiddleware("storemanToken", "adminToken"),
  addInventory
);
router.post(
  "/purchase",
  authMiddleware( "adminToken","storemanToken",),
  purchaseInventory
);
router.get(
  "/getTable",
  authMiddleware( "adminToken", "storemanToken","facultyToken","accountantToken"),
  getInventory
);
router.put(
  "/update-inventory",
  authMiddleware("storemanToken", "adminToken"),
  updateInventoryItem
);
router.post(
  "/issue-inventory",
  authMiddleware("storemanToken", "adminToken"),
  issueInventory
);
router.get(
  "/getIssuedInventory",
  authMiddleware("storemanToken", "adminToken"),
  getIssuedInventory
);
router.delete(
  "/removeInventory",
  authMiddleware("storemanToken", "adminToken"),
  removeInventoryItem
);
router.put(
  "/restock-inventory",
  authMiddleware("storemanToken", "adminToken"),
  restockInventory
);
router.post(
  "/faculty-request-Inventory",
  authMiddleware("facultyToken", "adminToken"),
  requestInventoryFaculty
);
router.get(
  "/getViewRequestInventory",
  authMiddleware("storemanToken", "facultyToken", "adminToken"),
  getViewRequestInventory
);
router.get(
  "/faculty-inventory-table",
  authMiddleware("facultyToken", "adminToken"),
  getInventory
);

router.delete("/removeRequestInventory",
  authMiddleware("storemanToken"),
  removeRequestInventory);
export default router;