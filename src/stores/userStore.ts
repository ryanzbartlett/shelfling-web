import { shelflingApi } from '@/api/shelflingApi';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const user = ref<ApiService.User>();

    function setUser(newUser: ApiService.User) {
        user.value = newUser;
    };

    function clearUser() {
        user.value = undefined;
    }

    shelflingApi.onAccessRevoked(clearUser);

    return {
        user,
        setUser,
        clearUser,
    };
});
