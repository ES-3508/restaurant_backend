// FileService.js

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dwneovkg9",
  api_key: "516279729771191",
  api_secret: "olGt-04DOjhx1KqF7c5KZINXn0g",
});

export const FileService = {};

FileService.uploadFile = async function (request, response) {
  return new Promise((resolve, reject) => {
    try {
      cloudinary.uploader.upload_stream(
        {
          folder: "Template",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.log("error", error);
            return resolve({
              error: true,
              message: "Something went wrong",
              data: error,
            });
          }

          const fileUrl = getFileUrl(result);
          resolve({
            error: false,
            message: "File uploaded",
            data: {
              file_url: fileUrl,
            },
          });
        }
      ).end(request.file.buffer);
    } catch (error) {
      console.log("error", error);
      reject({
        error: true,
        message: "Something went wrong",
        data: error,
      });
    }
  });
};

function getFileUrl(result) {
  const { format, resource_type } = result;

  let transformations = [];
  if (resource_type === "image") {
    transformations.push({ width: 500, height: 500, crop: "limit" });
  } else if (resource_type === "document") {
    return cloudinary.url(public_id, {
      secure: true,
      format: format === "raw" ? undefined : format,
      type: "attachment",
    });
  }

  return cloudinary.url(result.public_id, {
    secure: true,
    format: format === "raw" ? undefined : format,
    transformation: transformations,
  });
}
