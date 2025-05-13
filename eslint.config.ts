import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import pluginVitest from '@vitest/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfigWithVueTs(
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}'],
    },

    globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,

    stylistic.configs.customize({
        arrowParens: true,
        braceStyle: '1tbs',
        commaDangle: 'always-multiline',
        indent: 4,
        quotes: 'single',
        semi: true,
    }),

    {
        ...pluginVitest.configs.recommended,
        files: ['src/**/__tests__/*'],
    },

    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
);
