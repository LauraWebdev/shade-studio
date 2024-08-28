<template>
    <Header />

    <main>
        <Generator @save-set="updateSets" />
        <Library
            :sets="sets"
            @delete-set="deleteSet"
            @purge-all-sets="purgeAllSets"
        />
    </main>

    <footer class="my-20 text-center text-xs text-muted-foreground">
        Made with <3 by
        <a
            href="https://laura.media"
            target="_blank"
            >Laura Sofia Heimann</a
        >
    </footer>

    <Toaster />
</template>

<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/Header.vue';
import Generator from '@/components/Generator.vue';
import Library from '@/components/Library.vue';
import { type ColorSet } from '@/colorpalette';
import { onMounted, ref } from 'vue';

const sets = ref<ColorSet[]>([]);

function updateSets(newSet: ColorSet) {
    sets.value.unshift(newSet);
    saveToLocalStorage();
}

function deleteSet(setToDelete: ColorSet) {
    sets.value = sets.value.filter((x) => x !== setToDelete);
    saveToLocalStorage();
}

function purgeAllSets() {
    sets.value = [];
    saveToLocalStorage();
}
function saveToLocalStorage() {
    window.localStorage.setItem('sets', JSON.stringify(sets.value));
}

onMounted(() => {
    sets.value = JSON.parse(window.localStorage.getItem('sets') || '[]');
});
</script>

<style lang="scss" scoped></style>
