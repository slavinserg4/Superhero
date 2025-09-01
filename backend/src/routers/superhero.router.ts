import { Router } from "express";

import { upload } from "../config/multer.config";
import { superheroController } from "../controllers/superhero.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { SuperheroValidator } from "../validators/superhero.validator";

const router = Router();

router.get(
    "/",
    commonMiddleware.query(SuperheroValidator.query),
    superheroController.getAll,
);
router.get(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    superheroController.getById,
);
router.post(
    "/",
    commonMiddleware.validateBody(SuperheroValidator.create),
    superheroController.create,
);
router.put(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    commonMiddleware.validateBody(SuperheroValidator.update),
    upload.array("images", 5),
    superheroController.update,
);
router.delete(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    superheroController.delete,
);
router.post(
    "/:id/images",
    commonMiddleware.isIdValidate("id"),
    upload.array("images", 5),
    commonMiddleware.isFileExists(),
    superheroController.uploadImages,
);
router.delete(
    "/:id/images",
    commonMiddleware.isIdValidate("id"),
    superheroController.removeImage,
);

export const superheroRouter = router;
