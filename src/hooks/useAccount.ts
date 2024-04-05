import { useAppSelector } from '../app/hooks';
import { ProfileState } from '../features/profile/profileSlice';

const useAccount = () => {
    const { authorized, data } = useAppSelector<ProfileState>((state) => state.profile);
    return {
        authorized,
        isGuide: data.is_gid,
    };
};

export default useAccount;
