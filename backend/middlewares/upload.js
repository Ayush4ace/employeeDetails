import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const storage = multer.memoryStorage();

const upload = multer({storage});

async function processImage(req, res, next){
    if(!req.file){
        return next();
    }

    const filePath = `uploads/${Date.now()}-${req.file.originalname}`;

    await sharp(req.file.buffer)
    .resize(200, 200)
    .toFormat("jpeg")
    .jpeg({quality: 90})
    .toFile(filePath);

    req.body.profileImage = filePath;
    next();
}

export {upload, processImage}