<script setup lang="ts">
import { useTemplateRef, watch } from 'vue';

const isVisible = defineModel<boolean>({ required: true });

const baseDialog = useTemplateRef('baseDialog');

function assertBaseDialog() {
    if (!baseDialog.value) throw new Error('Base dialog missing');
    return baseDialog.value;
}

function showBaseDialog() {
    assertBaseDialog().showModal();
}

function closeBaseDialog() {
    assertBaseDialog().close();
}

watch(isVisible, (val) => {
    if (val) {
        showBaseDialog();
    } else {
        closeBaseDialog();
    }
});
</script>

<template>
    <dialog ref="baseDialog" class="m-auto">
        <slot />
    </dialog>
</template>
