import { Request, Response } from 'express';
import multer from 'multer';
import { saveFeedToDB } from '../services/feedService';
import dotenv from 'dotenv';
import uploadToS3 from '../util/uplode';

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
  { name: 'productImgs', maxCount: 5 },
  { name: 'postImages', maxCount: 5 },
]);

export const FeedWrite = async (req: Request, res: Response) => {
  upload(req as Request, res as Response, async (err: any) => {
    // req, res를 캐스팅
    if (err) {
      return res.status(400).json({ error: '파일 업로드 실패' });
    }
    try {
      const { description, grade, productImgsLink, productImgsTitle } =
        req.body;

      const { productImgs, postImages } = req.files as {
        postImages?: Express.Multer.File[];
        productImgs?: Express.Multer.File[];
      };
      if (!postImages) {
        return res.status(400).json({ error: '필수 파일이 누락되었습니다.' });
      }

      const thumbnailUrls = await Promise.all(
        (postImages as Express.Multer.File[]).map(uploadToS3)
      );
      const productImgUrls = await Promise.all(
        (productImgs as Express.Multer.File[]).map(uploadToS3)
      );
      const feedLinksArray =
        typeof productImgsLink === 'string'
          ? productImgsLink.split(',') // 문자열인 경우 쉼표로 구분하여 배열로 변환
          : productImgsLink || [];
      const feedTitlesArray =
        typeof productImgsTitle === 'string'
          ? productImgsTitle.split(',') // 문자열인 경우 쉼표로 구분하여 배열로 변환
          : productImgsTitle || [];

      const feedData = {
        influencer_id: 5,
        nickname: 'testUser',
        description,
        visibility_level: grade,
        thumbnail: thumbnailUrls,
        product: productImgUrls.map((img: string, index: number) => ({
          img,
          title: feedTitlesArray[index],
          link: feedLinksArray[index],
        })),
        likes: [],
      };

      await saveFeedToDB(feedData);

      res.status(200).json({ message: '피드 등록완료하였습니다.' });
    } catch (error) {
      // console.error('DB 저장 실패:', error);
      res.status(500).json({ error: '업로드 실패' });
    }
  });
};
