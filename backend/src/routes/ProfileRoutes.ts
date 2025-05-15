import express from "express";
import {
  createProfile,
  uploadProfilePicture,
  getProfile,
} from "../controller/ProfileController";
import requiredAuth from "../middleware/requiredAuth";
import { upload } from "../middleware/imageUploadMiddleware";

const router = express.Router();

router.post("/create-profile", requiredAuth, createProfile);
router.put(
  "/upload-picture",
  requiredAuth,
  upload.single("photo"),
  uploadProfilePicture
);
router.get("/get-profile", requiredAuth, getProfile);
export default router;
