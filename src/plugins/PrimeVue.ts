import type { App } from 'vue';
import PrimeVue from 'primevue/config';
import { definePreset } from '@primeuix/themes';
import type { PrimeVueConfiguration } from 'primevue/config';
import Nora from '@primeuix/themes/nora';

const ShelflingPreset = definePreset(Nora, {
    semantic: {
        primary: {
            50: '{yellow.50}',
            100: '{yellow.100}',
            200: '{yellow.200}',
            300: '{yellow.300}',
            400: '{yellow.400}',
            500: '{yellow.500}',
            600: '{yellow.600}',
            700: '{yellow.700}',
            800: '{yellow.800}',
            900: '{yellow.900}',
            950: '{yellow.950}',
        },
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{viva.50}',
                    100: '{viva.100}',
                    200: '{viva.200}',
                    300: '{viva.300}',
                    400: '{viva.400}',
                    500: '{viva.500}',
                    600: '{viva.600}',
                    700: '{viva.700}',
                    800: '{viva.800}',
                    900: '{viva.900}',
                    950: '{viva.950}',
                },
            },
        },
    },
});

export function initPrimeVue(app: App<Element>) {
    app.use(PrimeVue, {
        theme: {
            preset: ShelflingPreset,
            options: {
                darkModeSelector: false,
            },
        },
    } as PrimeVueConfiguration);
}
