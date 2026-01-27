import multer from "multer";
import sharp from "sharp";

// 1. Storage: Use memory instead of disk
const multerStorage = multer.memoryStorage();

// 2. Filter: (Keep your existing filter)
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const resizePostImage = async (req, res, next) => {
  // 1) If there is no file, skip to next middleware
  if (!req.file) return next();

  // 2) Define the filename (we'll use .jpeg for best compression)
  req.body.coverImage = `post-${req.user.id}-${Date.now()}.jpeg`;

  // 3) Process the image
  // req.file.buffer is available because we used memoryStorage()
  await sharp(req.file.buffer)
    .resize(1200, 630) // Optimized size for blog covers
    .toFormat("jpeg")
    .jpeg({ quality: 90 }) // Balance between quality and file size
    .toFile(`public/image/posts/${req.body.coverImage}`);

  next();
};
export const uploadPostImage = upload.single("coverImage");
