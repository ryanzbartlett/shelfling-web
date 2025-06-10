<script setup lang="ts">
import type { CreateLibraryBookParams } from '@/types/shelflingApi';

const book = defineModel<CreateLibraryBookParams>({ required: true });

withDefaults(defineProps<{
    submitText?: string;
    disabled?: boolean;
}>(), {
    submitText: 'Add',
    disabled: false,
});

const emit = defineEmits<{
    submit: [];
}>();
</script>

<template>
    <div class="book-form">
        <form
            class="flex flex-col gap-4"
            @submit.prevent="emit('submit')"
        >
            <div class="form-group">
                <label for="title">Title</label>
                <input
                    id="title"
                    v-model="book.title"
                    type="text"
                    maxlength="255"
                    required
                    :disabled="disabled"
                >
            </div>
            <div class="form-group">
                <label for="author">Author</label>
                <input
                    id="author"
                    v-model="book.author"
                    type="text"
                    maxlength="255"
                    required
                    :disabled="disabled"
                >
            </div>
            <div class="flex justify-end">
                <button
                    type="submit"
                    :disabled="disabled"
                >
                    {{ submitText }}
                </button>
            </div>
        </form>
    </div>
</template>
