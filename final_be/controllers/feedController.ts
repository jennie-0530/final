import { Request, Response, NextFunction } from 'express'; // NextFunction을 추가합니다
import multer from 'multer';
import { saveFeedToDB } from '../services/feedService';
import dotenv from 'dotenv';
import uploadToS3 from '../util/uplode';

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
  { name: 'thumbnail', maxCount: 5 },
  { name: 'productImg', maxCount: 5 },
]);

export const FeedWrite = async (req: Request, res: Response) => {
  upload(req as Request, res as Response, async (err: any) => {
    // req, res를 캐스팅
    if (err) {
      return res.status(400).json({ error: '파일 업로드 실패' });
    }
    try {
      const { title, description, grade, productImgLink, productImgTitle } =
        req.body;

      const { thumbnail, productImg } = req.files as {
        thumbnail?: Express.Multer.File[];
        productImg?: Express.Multer.File[];
      };
      if (!thumbnail || !productImg) {
        return res.status(400).json({ error: '필수 파일이 누락되었습니다.' });
      }

      const thumbnailUrls = await Promise.all(
        (thumbnail as Express.Multer.File[]).map(uploadToS3)
      );
      const productImgUrls = await Promise.all(
        (productImg as Express.Multer.File[]).map(uploadToS3)
      );
      const feedLinksArray =
        typeof productImgLink === 'string'
          ? productImgLink.split(',') // 문자열인 경우 쉼표로 구분하여 배열로 변환
          : productImgLink || [];
      const feedTitlesArray =
        typeof productImgTitle === 'string'
          ? productImgTitle.split(',') // 문자열인 경우 쉼표로 구분하여 배열로 변환
          : productImgTitle || [];

      const feedData = {
        influencer_id: 5,
        nickname: 'testUser',
        title,
        description,
        visibility_level: grade,
        thumbnail: thumbnailUrls,
        product: feedLinksArray.map((link: string, index: number) => ({
          link,
          title: feedTitlesArray[index],
          img: productImgUrls[index],
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
