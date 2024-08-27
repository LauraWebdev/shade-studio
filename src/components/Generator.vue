<template>
    <section class="section-generator">
        <Wrapper>
            <section class="section-input">
                <div class="input">
                    <input
                        type="text"
                        placeholder="#bc560a"
                        v-model="inputColor"
                        @input="generate"
                    />
                    <select
                        v-model="inputStep"
                        @change="generate"
                    >
                        <option value="950">50</option>
                        <option value="900">100</option>
                        <option value="800">200</option>
                        <option value="700">300</option>
                        <option value="600">400</option>
                        <option value="500">500</option>
                        <option value="400">600</option>
                        <option value="300">700</option>
                        <option value="200">800</option>
                        <option value="100">900</option>
                        <option value="50">950</option>
                    </select>
                </div>
            </section>
            <section
                class="section-output"
                v-if="currentSet"
            >
                <ColorPaletteList>
                    <ColorPaletteItem
                        v-for="(color, key) in currentSet.palette"
                        :key="key"
                        :step="key"
                        :color="color"
                    />
                </ColorPaletteList>
                <div class="meta">
                    <div class="label">
                        <input
                            v-if="currentSet"
                            v-model="currentSet.label"
                        />
                    </div>
                    <div class="actions">
                        <button
                            :disabled="!currentSet || !currentSet?.label"
                            @click="exportSet(currentSet)"
                        >
                            <i class="ri-brush-line"></i>
                            <span>Export</span>
                        </button>
                        <button
                            :disabled="!currentSet || !currentSet?.label"
                            @click="copyLink(currentSet)"
                        >
                            <i class="ri-link"></i>
                            <span>Copy Link</span>
                        </button>
                        <button
                            @click="save"
                            :disabled="!currentSet || !currentSet?.label"
                        >
                            <i class="ri-save-line"></i>
                            <span>Save Set</span>
                        </button>
                    </div>
                </div>
            </section>
        </Wrapper>
    </section>

    <ExportDialog ref="exportDialog" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ColorPalette, type ColorSet } from '@/colorpalette';
import Wrapper from '@/components/Wrapper.vue';
import ColorPaletteList from '@/components/ColorPaletteList.vue';
import ColorPaletteItem from '@/components/ColorPaletteItem.vue';
import ExportDialog from '@/components/ExportDialog.vue';

const inputColor = ref<string>('');
const inputStep = ref<number>(500);
const currentSet = ref<ColorSet>();

const emits = defineEmits(['saveSet']);

function generate() {
    try {
        const palette = new ColorPalette(inputColor.value, inputStep.value);
        currentSet.value = palette.generateSet();
    } catch (error) {
        //
    }
}

function save() {
    emits('saveSet', currentSet.value);
}

const exportDialog = ref<ExportDialog>(null);

function exportSet(set: ColorSet) {
    exportDialog.value?.open(set);
}

function copyLink(set: ColorSet) {
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

    navigator.clipboard.writeText(`${window.location.href.split('?')[0]}?${queryParamsString}`);
}

onMounted(() => {
    // Deconstruct Query Parameters to Object
    let queryParams = {};
    let queryParamsFull = window.location.href.split('?');
    let queryParamsParts = queryParamsFull[1]?.split('&') ?? [];
    queryParamsParts.forEach((paramPart) => {
        let keyValueSplit = paramPart.split('=');
        queryParams[keyValueSplit[0]] = decodeURIComponent(keyValueSplit[1]);
    });

    // Set Default Values
    inputColor.value = queryParams['baseColor'] ?? '#ff8b29';
    inputStep.value = queryParams['baseStep'] ?? 500;
    generate();

    // Set palette
    if (queryParams['label']) currentSet.value.label = queryParams['label'];
    if (queryParams['50']) currentSet.value.palette['50'] = queryParams['50'];
    if (queryParams['100']) currentSet.value.palette['100'] = queryParams['100'];
    if (queryParams['200']) currentSet.value.palette['200'] = queryParams['200'];
    if (queryParams['300']) currentSet.value.palette['300'] = queryParams['300'];
    if (queryParams['400']) currentSet.value.palette['400'] = queryParams['400'];
    if (queryParams['500']) currentSet.value.palette['500'] = queryParams['500'];
    if (queryParams['600']) currentSet.value.palette['600'] = queryParams['600'];
    if (queryParams['700']) currentSet.value.palette['700'] = queryParams['700'];
    if (queryParams['800']) currentSet.value.palette['800'] = queryParams['800'];
    if (queryParams['900']) currentSet.value.palette['900'] = queryParams['900'];
    if (queryParams['950']) currentSet.value.palette['950'] = queryParams['950'];
});
</script>

<style lang="scss" scoped>
.section-generator {
    padding: var(--unit-5) 0;
    display: flex;
    flex-direction: column;
    gap: var(--unit-4);
    background: var(--color-base-100);
    border-bottom: 1px solid var(--color-base-200);

    & .section-input {
        padding: var(--unit-4) 0;
        display: flex;
        align-items: center;
        justify-content: center;

        & .input {
            border-radius: 100px;
            height: 50px;
            background: var(--color-base-50);
            border: 1px solid var(--color-base-300);
            display: flex;
            width: 100%;
            max-width: 400px;
            transition: 0.15s ease-in-out all;

            & input {
                font-family: var(--font-family), sans-serif;
                font-size: 1.15rem;
                padding: 0 var(--unit-4);
                border: 0;
                background: 0;
                flex-grow: 1;

                &:focus {
                    outline: none;
                }
            }
            & select {
                font-family: var(--font-family), sans-serif;
                font-size: 1.15rem;
                padding: 0 var(--unit-4);
                border: 0;
                background: 0;

                &:focus {
                    outline: none;
                }
            }

            &:focus-within {
                background: var(--color-base-200);
                border-color: var(--color-base-400);
            }
        }
    }
    & .section-output {
        display: grid;
        grid-template-columns: 1fr 350px;
        align-items: center;
        gap: var(--unit-5);

        & .meta {
            display: flex;
            flex-direction: column;
            gap: var(--unit-3);

            & .label {
                & input {
                    width: 100%;
                    flex-grow: 1;
                    height: 40px;
                    padding: 0 10px;
                    background: var(--color-base-50);
                    border: 1px solid var(--color-base-300);
                    font-family: var(--fontFamily), sans-serif;
                    font-size: var(--fontSize);
                    transition: 0.15s ease-in-out all;
                    border-radius: var(--unit-3);

                    &:focus {
                        outline: 0;
                        background: var(--color-base-200);
                        border-color: var(--color-base-400);
                    }
                }
            }

            & .actions {
                display: flex;
                gap: var(--unit-2);
                align-items: center;
            }
        }
    }
}
</style>
