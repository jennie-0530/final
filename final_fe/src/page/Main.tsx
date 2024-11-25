import ChatPage from '../components/Feed/Modal/FeedModal';
import { useModal } from '../hooks/useModal';

const Main = () => {
  const { open: openFeedModal } = useModal(ChatPage);
  return (
    <div>
      메인
      <button
        onClick={() => {
          sessionStorage.setItem('page', `${22}`);
          openFeedModal();
        }}
      >
        ㅇㅇㅇ
      </button>
    </div>
  );
};

export default Main;
