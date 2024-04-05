import { getTokens } from '../utils/storeTokens';
import { useAppSelector } from '../app/hooks';

const useAuth = () => {
    const { phone } = useAppSelector((state) => state.profile.data);

    const refresh = getTokens()?.refresh_token;

    if (!refresh) {
        return false;
    }

    return phone.length > 0;
};

export default useAuth;
