import axiosInstance from '../client/index';

export const feedWrite = async (formData: FormData) => {
  try {
    const res = await axiosInstance.post('/feed', formData);
    return res;
  } catch (error) {
    console.error('Error uploading product', error);
    alert('Failed to upload product');
  }
};
export const feedGet = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/feed/${id}`);
    console.log(res.data, 'res'); // 서버에서 받은 데이터를 출력해보세요

    const newRes = {
      ...res.data,
      images:
        typeof res.data.images === 'string'
          ? JSON.parse(
              // JSON이 올바르게 포맷되지 않았을 경우, 문자열을 고친 뒤 파싱
              res.data.images
                .replace(/\\"/g, '"') // 이스케이프된 큰따옴표 제거
                .replace(/\\\\/g, '') // 이스케이프된 백슬래시 제거
                .replace(/^"|"$/g, '') // 양 끝의 쌍따옴표 제거 (필요한 경우)
            )
          : res.data.images, // 이미 배열인 경우 그대로 사용
      likes:
        typeof res.data.likes === 'string'
          ? JSON.parse(
              res.data.likes
                .replace(/\\"/g, '"')
                .replace(/\\\\/g, '')
                .replace(/^"|"$/g, '')
            )
          : res.data.likes,
      products:
        typeof res.data.products === 'string'
          ? JSON.parse(
              res.data.products
                .replace(/\\"/g, '"')
                .replace(/\\\\/g, '')
                .replace(/^"|"$/g, '')
            )
          : res.data.products,
    };

    console.log(newRes, 'newRes');
    return newRes;
  } catch (error) {
    console.error('Error getting feed data:', error);
    alert('Failed to get feed data');
    return null; // 에러 발생 시 null을 반환하거나 적절한 값을 반환하도록 처리
  }
};
