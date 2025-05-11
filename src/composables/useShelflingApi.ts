import { shelflingApi } from '@/api/shelflingApi';
import { useRouter } from 'vue-router';

export const useShelflingApi = () => {
    const router = useRouter();

    async function logOut() {
        await shelflingApi.logOut();
        router.push('/login');
    }

    return {
        logOut,
    };
};
