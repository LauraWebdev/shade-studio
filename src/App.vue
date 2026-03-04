<template>
    <Header />

    <section class="page-content">
        <aside>
            <Generator @update-set="updateCurrentSet" />

            <footer class="text-center text-xs text-muted-foreground">
                Made with hate towards people making everything a<br/>stupid monthly SaaS subscription by
                <a
                    href="https://laura.media"
                    target="_blank"
                    >Laura Sofia Heimann</a
                >
            </footer>
        </aside>
        <main>
            <CurrentSet
                :set="currentSet"
                @update-label="updateLabel"
                @save-set="updateSets"
            />

            <Library
                :sets="sets"
                @delete-set="deleteSet"
                @purge-all-sets="purgeAllSets"
            />
        </main>
    </section>

    <Toaster />
</template>

<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/Header.vue';
import Generator from '@/components/Generator.vue';
import Library from '@/components/Library.vue';
import { type ColorSet } from '@/colorpalette';
import { onMounted, ref } from 'vue';
import CurrentSet from '@/components/CurrentSet.vue';

const sets = ref<ColorSet[]>([]);
const currentSet = ref<ColorSet>();

function updateCurrentSet(newSet: ColorSet) {
    currentSet.value = newSet;
}

function updateLabel(newLabel: string) {
    if (currentSet.value) {
        currentSet.value.label = newLabel;
    }
}

function updateSets(newSet: ColorSet) {
    // Clone the set to avoid reference sharing
    const clonedSet = JSON.parse(JSON.stringify(newSet));
    sets.value.unshift(clonedSet);
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
