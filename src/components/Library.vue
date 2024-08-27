<template>
    <section class="section-library">
        <Wrapper>
            <div v-if="!sets || sets?.length === 0">No sets saved.</div>
            <div
                class="list"
                v-else
            >
                <div
                    class="item"
                    v-for="(set, n) in sets"
                    :key="n"
                >
                    <ColorPaletteList>
                        <ColorPaletteItem
                            v-for="(color, key) in set.palette"
                            :key="key"
                            :step="key"
                            :color="color"
                        />
                    </ColorPaletteList>
                    <div class="meta">
                        <div class="label">{{ set.label }}</div>
                        <div class="actions">
                            <button @click="exportSet(set)">
                                <i class="ri-brush-line"></i>
                                <span>Export</span>
                            </button>
                            <button @click="editSet(set)">
                                <i class="ri-file-edit-line"></i>
                            </button>
                            <button
                                class="danger"
                                @click="deleteSet(set)"
                            >
                                <i class="ri-delete-bin-line"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    </section>

    <ExportDialog ref="exportDialog" />
</template>

<script setup lang="ts">
import Wrapper from '@/components/Wrapper.vue';
import { type PropType, ref } from 'vue';
import type { ColorSet } from '@/colorpalette';
import ColorPaletteList from '@/components/ColorPaletteList.vue';
import ColorPaletteItem from '@/components/ColorPaletteItem.vue';
import ExportDialog from '@/components/ExportDialog.vue';

defineProps({
    sets: {
        type: Array as PropType<ColorSet[]>,
        default: () => [],
    },
});

const emits = defineEmits(['deleteSet']);

const exportDialog = ref<ExportDialog>(null);

function exportSet(set: ColorSet) {
    exportDialog.value?.open(set);
}

function deleteSet(set: ColorSet) {
    emits('deleteSet', set);
}

function editSet(set: ColorSet) {
    let queryParams = {};

    queryParams['label'] = set.label;
    queryParams['baseColor'] = set.baseColor;
    queryParams['baseStep'] = set.baseStep;

    queryParams['50'] = set.palette['50'];
    queryParams['100'] = set.palette['100'];
    queryParams['200'] = set.palette['200'];
    queryParams['300'] = set.palette['300'];
    queryParams['400'] = set.palette['400'];
    queryParams['500'] = set.palette['500'];
    queryParams['600'] = set.palette['600'];
    queryParams['700'] = set.palette['700'];
    queryParams['800'] = set.palette['800'];
    queryParams['900'] = set.palette['900'];
    queryParams['950'] = set.palette['950'];

    let queryParamsString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

    window.location.href = `${window.location.href.split('?')[0]}?${queryParamsString}`;
}
</script>

<style lang="scss" scoped>
.section-library {
    padding: var(--unit-5) 0;

    & .list {
        display: flex;
        flex-direction: column;
        gap: var(--unit-5);

        & .item {
            display: grid;
            grid-template-columns: 1fr 350px;
            align-items: center;
            gap: var(--unit-5);

            & .meta {
                display: flex;
                align-items: center;
                gap: var(--unit-3);

                & .label {
                    font-size: 1.25rem;
                    font-weight: 500;
                    flex-grow: 1;
                }

                & .actions {
                    display: flex;
                    gap: var(--unit-2);
                    align-items: center;
                }
            }
        }
    }
}
</style>
