<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ExemplarConditions, type Exemplar, type CreateExemplarParams } from '@/types/shelflingApi';

const props = withDefaults(defineProps<{
    exemplar?: Exemplar;
    loading?: boolean;
}>(), {
    exemplar: undefined,
    loading: false,
});

const emit = defineEmits<{
    submit: [params: CreateExemplarParams];
}>();

const formData = ref<CreateExemplarParams>({
    isbn: null,
    condition: null,
    condition_details: null,
    purchased_price: null,
    purchased_details: null,
    published_by: null,
    published_date: null,
    is_sold: false,
    height: null,
    width: null,
    depth: null,
    weight: null,
    other_details: null,
});

onMounted(() => {
    if (props.exemplar) {
        formData.value = {
            isbn: props.exemplar.isbn,
            condition: props.exemplar.condition,
            condition_details: props.exemplar.condition_details,
            purchased_price: props.exemplar.purchased_price,
            purchased_details: props.exemplar.purchased_details,
            published_by: props.exemplar.published_by,
            published_date: props.exemplar.published_date,
            is_sold: props.exemplar.is_sold,
            height: props.exemplar.height,
            width: props.exemplar.width,
            depth: props.exemplar.depth,
            weight: props.exemplar.weight,
            other_details: props.exemplar.other_details,
        };
    }
});

function handleSubmit() {
    emit('submit', formData.value);
}
</script>

<template>
    <div class="exemplar-form">
        <form
            class="flex flex-col gap-4"
            @submit.prevent="handleSubmit"
        >
            <div class="form-group">
                <label for="isbn">ISBN</label>
                <input
                    id="isbn"
                    v-model="formData.isbn"
                    type="text"
                    :disabled="loading"
                    placeholder="10 or 13 digit ISBN"
                >
            </div>

            <div class="form-group">
                <label for="condition">Condition</label>
                <select
                    id="condition"
                    v-model="formData.condition"
                    :disabled="loading"
                    required
                >
                    <option :value="null">
                        Select condition
                    </option>
                    <option :value="ExemplarConditions.Fine">
                        Fine
                    </option>
                    <option :value="ExemplarConditions.New">
                        New
                    </option>
                    <option :value="ExemplarConditions.Used">
                        Used
                    </option>
                    <option :value="ExemplarConditions.Refurbished">
                        Refurbished
                    </option>
                    <option :value="ExemplarConditions.Library">
                        Library
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="condition_details">Condition Details</label>
                <textarea
                    id="condition_details"
                    v-model="formData.condition_details"
                    :disabled="loading"
                    rows="3"
                    placeholder="Additional details about the condition"
                />
            </div>

            <div class="form-group">
                <label for="purchased_price">Purchased Price</label>
                <input
                    id="purchased_price"
                    v-model.number="formData.purchased_price"
                    type="number"
                    step="0.01"
                    min="0"
                    :disabled="loading"
                    placeholder="0.00"
                >
            </div>

            <div class="form-group">
                <label for="purchased_details">Purchase Details</label>
                <textarea
                    id="purchased_details"
                    v-model="formData.purchased_details"
                    :disabled="loading"
                    rows="3"
                    placeholder="Where and when purchased, etc."
                />
            </div>

            <div class="form-group">
                <label for="published_by">Published By</label>
                <input
                    id="published_by"
                    v-model="formData.published_by"
                    type="text"
                    maxlength="255"
                    :disabled="loading"
                    placeholder="Publisher name"
                >
            </div>

            <div class="form-group">
                <label for="published_date">Published Date</label>
                <input
                    id="published_date"
                    v-model="formData.published_date"
                    type="date"
                    :disabled="loading"
                >
            </div>

            <div class="form-group">
                <label class="flex items-center gap-2">
                    <input
                        v-model="formData.is_sold"
                        type="checkbox"
                        :disabled="loading"
                    >
                    Is Sold
                </label>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div class="form-group">
                    <label for="height">Height</label>
                    <input
                        id="height"
                        v-model.number="formData.height"
                        type="number"
                        step="0.01"
                        min="0"
                        :disabled="loading"
                        placeholder="Height in cm"
                    >
                </div>

                <div class="form-group">
                    <label for="width">Width</label>
                    <input
                        id="width"
                        v-model.number="formData.width"
                        type="number"
                        step="0.01"
                        min="0"
                        :disabled="loading"
                        placeholder="Width in cm"
                    >
                </div>

                <div class="form-group">
                    <label for="depth">Depth</label>
                    <input
                        id="depth"
                        v-model.number="formData.depth"
                        type="number"
                        step="0.01"
                        min="0"
                        :disabled="loading"
                        placeholder="Depth in cm"
                    >
                </div>

                <div class="form-group">
                    <label for="weight">Weight</label>
                    <input
                        id="weight"
                        v-model.number="formData.weight"
                        type="number"
                        step="0.01"
                        min="0"
                        :disabled="loading"
                        placeholder="Weight in grams"
                    >
                </div>
            </div>

            <div class="form-group">
                <label for="other_details">Other Details</label>
                <textarea
                    id="other_details"
                    v-model="formData.other_details"
                    :disabled="loading"
                    rows="3"
                    placeholder="Any other relevant information"
                />
            </div>

            <div class="flex justify-end">
                <button
                    type="submit"
                    :disabled="loading"
                >
                    {{ loading ? 'Loading...' : 'Submit' }}
                </button>
            </div>
        </form>
    </div>
</template>
