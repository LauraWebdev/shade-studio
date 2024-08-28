<template>
    <section class="section-generator">
        <Wrapper>
            <section class="section-input">
                <div class="input">
                    <Popover>
                        <PopoverTrigger as-child>
                            <Button
                                variant="secondary"
                                class="picker-button"
                            >
                                <div
                                    class="w-[24px] h-[24px] rounded-full mr-3"
                                    :style="`background: ${inputColor}`"
                                ></div>
                                <span>{{ inputColor }}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="lucide lucide-chevron-down-icon w-4 h-4 opacity-50"
                                    aria-hidden="true"
                                >
                                    <path d="m6 9 6 6 6-6"></path>
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent class="flex w-full items-center">
                            <Colorpicker
                                v-model="inputColor"
                                @update:modelValue="generate"
                            />
                        </PopoverContent>
                    </Popover>
                    <Select
                        v-model="inputStep"
                        @update:modelValue="generate"
                    >
                        <SelectTrigger class="w-[120px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="950">50</SelectItem>
                                <SelectItem value="900">100</SelectItem>
                                <SelectItem value="800">200</SelectItem>
                                <SelectItem value="700">300</SelectItem>
                                <SelectItem value="600">400</SelectItem>
                                <SelectItem value="500">500</SelectItem>
                                <SelectItem value="400">600</SelectItem>
                                <SelectItem value="300">700</SelectItem>
                                <SelectItem value="200">800</SelectItem>
                                <SelectItem value="100">900</SelectItem>
                                <SelectItem value="50">950</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </section>

            <Card
                class="section-output"
                v-if="currentSet"
            >
                <CardContent class="p-6 content">
                    <div class="meta">
                        <Input
                            v-model="currentSet.label"
                            placeholder="Set label"
                        />
                        <div class="button-group">
                            <ExportDialog :set="currentSet">
                                <Button
                                    variant="secondary"
                                    :disabled="!currentSet || !currentSet?.label"
                                >
                                    <i class="ri-brush-line text-lg mr-2"></i>
                                    <span>Export</span>
                                </Button>
                            </ExportDialog>
                            <Button
                                variant="secondary"
                                :disabled="!currentSet || !currentSet?.label"
                                @click="copyLink(currentSet)"
                            >
                                <i class="ri-link text-lg mr-2"></i>
                                <span>Copy Link</span>
                            </Button>
                            <Button
                                variant="secondary"
                                @click="save"
                                :disabled="!currentSet || !currentSet?.label"
                            >
                                <i class="ri-save-line text-lg mr-2"></i>
                                <span>Save Set</span>
                            </Button>
                        </div>
                    </div>
                    <div class="colors">
                        <div
                            v-for="(color, key) in currentSet.palette"
                            :key="key"
                            :class="`color-block ${isDark(color) ? 'text-gray-50' : 'text-gray-950'}`"
                            :style="`background: ${color};`"
                            @click="copyColor(color)"
                        >
                            <span class="text-xs">{{ color }}</span>
                            <i class="ri-file-copy-line"></i>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Wrapper>
    </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ColorPalette, type ColorSet } from '@/colorpalette';
import Wrapper from '@/components/Wrapper.vue';
import ExportDialog from '@/components/ExportDialog.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { isDark } from '@/lib/is-dark';
import Colorpicker from '@/components/Colorpicker.vue';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'vue-sonner';

const inputColor = ref<string>('');
const inputStep = ref<number>('500');
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

function copyColor(color: string) {
    navigator.clipboard.writeText(color);
    toast('Color copied.');
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

    toast('Link copied.');
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
    inputStep.value = queryParams['baseStep'] ?? '500';
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
    @apply py-20;

    & .wrapper {
        @apply gap-5;
    }
}
.section-input {
    @apply flex justify-center;

    & .input {
        @apply w-full max-w-96 flex items-center gap-2;

        & .picker-button {
            @apply w-full grow;

            & span {
                @apply grow text-left;
            }
        }
    }
}
.section-output {
    & .content {
        @apply flex flex-col gap-4;

        & .colors {
            @apply grow grid grid-cols-11 self-stretch;

            & .color-block {
                @apply grow h-full min-h-[45px] flex items-center justify-center;

                & span {
                    @apply text-xs block;
                }
                & i {
                    @apply text-xl hidden;
                }
                &:hover {
                    @apply cursor-copy;

                    & span {
                        @apply hidden;
                    }
                    & i {
                        @apply block;
                    }
                }
            }
        }
        & .meta {
            @apply flex gap-2;

            & input {
                @apply grow;
            }
        }
    }
}
</style>
