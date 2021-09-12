const { Router } = require("express");
const { ImageController } = require("../controllers");
const {upload} = require("../middleware/uploadMiddleware")
const router = Router();

router.get("/", ImageController.getImages);
router.post("/upload/", upload.single('file'), ImageController.upload);
router.post("/download", ImageController.download);
router.delete("/", ImageController.deleteImage);
router.post("/share", ImageController.shareImage);

module.exports = router;
