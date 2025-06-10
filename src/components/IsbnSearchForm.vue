<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
    found: [data: any];
    notFound: [];
}>();

const isbn = ref('');

const getFromIsbnPending = ref(false);

async function getFromIsbn() {
    getFromIsbnPending.value = true;

    try {
        const result = await fetch(`https://openlibrary.org/search.json?isbn=${isbn.value}`);
        const data = await result.json();
        const book = data.docs[0];
        if (!book) {
            emit('notFound');
            return;
        }
        isbn.value = '';
        emit('found', book);
    } catch (error) {
        console.error(error);
    } finally {
        getFromIsbnPending.value = false;
    }
}
</script>

<template>
    <div class="isbn-search-form">
        <form
            class="flex flex-col gap-4"
            @submit.prevent="() => getFromIsbn()"
        >
            <div class="form-group">
                <label for="isbn">ISBN</label>
                <input
                    id="isbn"
                    v-model="isbn"
                    type="text"
                    minlength="10"
                    maxlength="13"
                    required
                >
            </div>
            <div class="flex justify-end">
                <button
                    type="submit"
                    :disabled="getFromIsbnPending"
                >
                    Search
                </button>
            </div>
        </form>
    </div>
</template>
