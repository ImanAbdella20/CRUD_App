import express from "express";
import contactController from '../controllers/contactController.js';
import validateToken from "../middleware/validateTokenHandler.js";

const router = express.Router();

// Define the routes correctly

router.use(validateToken)
router.get("/", contactController.getContact);
router.post("/", contactController.createContact);
router.put("/:id", contactController.updateContact);
router.delete("/:id", contactController.deleteContact);
router.get("/:id", contactController.getIndividualContact);

export default router;
