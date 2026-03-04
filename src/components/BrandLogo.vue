<template>
    <div class="brand">
        <span class="text">ShadeStudio</span>
        <Badge variant="secondary">1.1.0</Badge>
    </div>
</template>

<style scoped lang="scss">
.brand {
    @apply flex gap-2 items-start;

    & > .text {
        @apply text-2xl font-bold;
    }
}
</style>
<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
</script>
