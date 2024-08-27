<template>
    <Header />

    <main>
        <Generator @save-set="updateSets" />
        <Library
            :sets="sets"
            @delete-set="deleteSet"
        />
    </main>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Generator from '@/components/Generator.vue';
import Library from '@/components/Library.vue';
import { type ColorSet } from '@/colorpalette';
import { onMounted, ref } from 'vue';

const sets = ref<ColorSet[]>([]);

function updateSets(newSet: ColorSet) {
    sets.value.unshift(newSet);
    window.localStorage.setItem('sets', JSON.stringify(sets.value));
}

function deleteSet(setToDelete: ColorSet) {
    sets.value = sets.value.filter((x) => x !== setToDelete);
    window.localStorage.setItem('sets', JSON.stringify(sets.value));
}

onMounted(() => {
    sets.value = JSON.parse(window.localStorage.getItem('sets') || '[]');
});
</script>

<style lang="scss" scoped></style>
