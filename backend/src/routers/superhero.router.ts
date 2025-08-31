import { Router } from "express";

import { upload } from "../config/multer.config";
import { superheroController } from "../controllers/superhero.controller";

const router = Router();

router.get("/", superheroController.getAll);
router.get("/:id", superheroController.getById);
router.post("/", superheroController.create);
router.put("/:id", upload.array("images", 5), superheroController.update);
router.delete("/:id", superheroController.delete);
router.post(
    "/:id/images",
    upload.array("images", 5),
    superheroController.uploadImages,
);
router.delete("/:id/images", superheroController.removeImage);

export const superheroRouter = router;
