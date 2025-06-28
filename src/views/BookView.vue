<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { shelflingApi } from '@/api/shelflingApi';
import ExemplarForm from '@/components/ExemplarForm.vue';
import type { CreateExemplarParams } from '@/types/shelflingApi';

const props = defineProps<{
    libraryId: number;
    bookId: number;
}>();

const queryClient = useQueryClient();

const {
    data: libraryBook,
} = useQuery({
    queryKey: ['libraryBook', props.libraryId, props.bookId],
    queryFn: () => shelflingApi.getLibraryBook(props.libraryId, props.bookId),
});

const {
    data: exemplars,
} = useQuery({
    queryKey: ['exemplars', props.libraryId, props.bookId],
    queryFn: () => shelflingApi.getBookExemplars(props.libraryId, props.bookId),
});

const conditionOptions = [
    { value: null, label: 'Select Condition' },
    { value: 0, label: 'Fine' },
    { value: 1, label: 'New' },
    { value: 2, label: 'Used' },
    { value: 3, label: 'Refurbished' },
    { value: 4, label: 'Library' },
];

const {
    mutate: createExemplar,
    isPending: isCreatingExemplar,
} = useMutation({
    mutationFn: (data: CreateExemplarParams) => shelflingApi.createBookExemplar(props.libraryId, props.bookId, data),
    onSuccess: () => {
        // TODO: this doesn't seem to be invalidating the library books query
        queryClient.invalidateQueries({ queryKey: ['libraryBooks', props.libraryId] });

        queryClient.invalidateQueries({ queryKey: ['libraryBook', props.libraryId, props.bookId] });
        queryClient.invalidateQueries({ queryKey: ['exemplars', props.libraryId, props.bookId] });
    },
});

const {
    mutate: deleteExemplar,
} = useMutation({
    mutationFn: (exemplarId: number) => shelflingApi.deleteBookExemplar(props.libraryId, props.bookId, exemplarId),
    onSuccess: () => {
        // TODO: this doesn't seem to be invalidating the library books query
        queryClient.invalidateQueries({ queryKey: ['libraryBooks', props.libraryId] });

        queryClient.invalidateQueries({ queryKey: ['libraryBook', props.libraryId, props.bookId] });
        queryClient.invalidateQueries({ queryKey: ['exemplars', props.libraryId, props.bookId] });
    },
});
</script>

<template>
    <div class="book-view p-4">
        <RouterLink
            class="btn btn-secondary mb-3"
            :to="`/libraries/${props.libraryId}`"
        >
            Back to library
        </RouterLink>
        <hr class="my-4">
        <ExemplarForm
            :loading="isCreatingExemplar"
            @submit="createExemplar($event)"
        />
        <hr class="my-4">
        <pre>{{ libraryBook }}</pre>
        <hr class="my-4">
        <h2 class="font-bold mb-3">
            Copies
        </h2>
        <table class="w-full text-left border-collapse border">
            <thead>
                <tr>
                    <th>ISBN</th>
                    <th>Condition</th>
                    <th>Condition Details</th>
                    <th>Sold</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="exemplar in exemplars"
                    :key="exemplar.id"
                >
                    <td>{{ exemplar.isbn }}</td>
                    <td>{{ conditionOptions.find(option => option.value === exemplar.condition)?.label || 'Unknown' }}</td>
                    <td>{{ exemplar.condition_details }}</td>
                    <td>{{ exemplar.is_sold }}</td>
                    <td>
                        <button
                            class="btn btn-danger"
                            @click="() => deleteExemplar(exemplar.id)"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
