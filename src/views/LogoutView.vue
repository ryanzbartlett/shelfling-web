<script setup lang="ts">
import { onMounted } from 'vue';
import { useShelflingApi } from '@/composables/useShelflingApi';

const { logOut } = useShelflingApi();

onMounted(logOut);
</script>
