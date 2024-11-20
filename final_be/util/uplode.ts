// 업로드 함수
import { S3 } from 'aws-sdk';
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadToS3 = async (file: Express.Multer.File) => {
  const fileName = encodeURIComponent(file.originalname);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `${process.env.AWS_BUCKET_FOLDER_NAME}/${Date.now()}-${fileName}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  const { Location } = await s3.upload(params).promise();
  return Location;
};

export default uploadToS3;
