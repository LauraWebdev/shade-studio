<template>
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
                    <ColorPicker
                        :pure-color="inputColor"
                        @update:pureColor="
                            (color) => {
                                inputColor = color;
                                generate();
                            }
                        "
                        :disable-alpha="true"
                        :disable-history="true"
                        picker-type="chrome"
                        format="hex6"
                        theme="black"
                        lang="En"
                        :is-widget="true"
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
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ColorPalette, type ColorSet } from '@/colorpalette';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ColorPicker } from 'vue3-colorpicker';

const inputColor = ref<string>('');
const inputStep = ref<string>('500');

const emits = defineEmits(['updateSet']);

function generate(overrideLabel?: string) {
    try {
        const palette = new ColorPalette(inputColor.value, parseInt(inputStep.value));
        const set = palette.generateSet();

        if (overrideLabel) {
            set.label = overrideLabel;
        }

        emits('updateSet', set);
    } catch (error) {
        //
    }
}

onMounted(() => {
    // Deconstruct Query Parameters to Object
    let queryParams: { [key: string]: any } = {};
    let queryParamsFull = window.location.href.split('?');
    let queryParamsParts = queryParamsFull[1]?.split('&') ?? [];
    queryParamsParts.forEach((paramPart) => {
        let keyValueSplit = paramPart.split('=');
        queryParams[keyValueSplit[0]] = decodeURIComponent(keyValueSplit[1]);
    });

    // Set Default Values
    inputColor.value = queryParams['baseColor'] ?? '#ff8b29';
    inputStep.value = queryParams['baseStep'] ?? '500';
    generate(queryParams['label']);
});
</script>

<style lang="scss" scoped>
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
</style>
