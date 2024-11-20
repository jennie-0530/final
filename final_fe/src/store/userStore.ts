import { create, StateCreator } from 'zustand';
// 예시
interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}
// User 타입은 실제 유저 정보 타입으로 교체.
interface User {
  certification_yn: string;
  email: string;
}
const createUserStore: StateCreator<UserState> = (set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
});

// Zustand 스토어 생성
export const useUserStore = create<UserState>(createUserStore);
