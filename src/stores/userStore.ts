import { shelflingApi } from '@/api/shelflingApi';
import { useQueryClient } from '@tanstack/vue-query';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const user = ref<ApiService.User>();
    const queryClient = useQueryClient();

    function setUser(newUser: ApiService.User) {
        user.value = newUser;
    };

    function clearUser() {
        user.value = undefined;
    }

    shelflingApi.onAccessRevoked(() => {
        clearUser();
        queryClient.invalidateQueries();
    });

    return {
        user,
        setUser,
        clearUser,
    };
});
