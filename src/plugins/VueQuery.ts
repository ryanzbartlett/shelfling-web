import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query';

const vueQueryPluginOptions: VueQueryPluginOptions = {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                staleTime: 1000 * 60 * 60 * 24,
            },
        },
    },
};

export {
    VueQueryPlugin,
    vueQueryPluginOptions,
};
