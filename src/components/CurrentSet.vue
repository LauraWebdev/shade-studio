<template>
    <Card
        class="section-current-set"
        v-if="set"
    >
        <CardContent class="p-5 content">
            <div class="meta">
                <Input
                    :model-value="set.label"
                    @update:model-value="onLabelInput"
                    placeholder="Set label"
                />
                <div class="button-group">
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <ExportDialog :set="set">
                                <Button
                                    variant="secondary"
                                    :disabled="!set || !set?.label"
                                >
                                    <i class="ri-brush-line text-lg mr-2"></i>
                                    <span>Export</span>
                                </Button>
                            </ExportDialog>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span>Export set</span>
                        </TooltipContent>
                    </Tooltip>
                    <Button
                        variant="secondary"
                        :disabled="!set || !set?.label"
                        @click="copyLink(set)"
                    >
                        <i class="ri-link text-lg mr-2"></i>
                        <span>Copy Link</span>
                    </Button>
                    <Button
                        variant="secondary"
                        @click="save"
                        :disabled="!set || !set?.label"
                    >
                        <i class="ri-save-line text-lg mr-2"></i>
                        <span>Save Set</span>
                    </Button>
                </div>
            </div>
            <div class="colors">
                <Tooltip
                    v-for="(color, key) in set.palette"
                    :key="key"
                >
                    <TooltipTrigger as-child>
                        <div
                            :class="`color-block ${isDark(color) ? 'text-gray-50' : 'text-gray-950'}`"
                            :style="`background: ${color};`"
                            @click="copyColor(`${color}`)"
                        >
                            <span class="text-xs">{{ color }}</span>
                            <i class="ri-file-copy-line"></i>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>{{ color }}</span>
                    </TooltipContent>
                </Tooltip>
            </div>
        </CardContent>
    </Card>
</template>

<script lang="ts" setup>
import type { ColorSet } from '@/colorpalette';
import ExportDialog from '@/components/ExportDialog.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { isDark } from '@/lib/is-dark';
import { toast } from 'vue-sonner';

const props = defineProps<{
    set: ColorSet;
}>();

const emits = defineEmits(['saveSet', 'updateLabel']);

function save() {
    emits('saveSet', props.set);
}

function onLabelInput(newLabel: string | number) {
    emits('updateLabel', newLabel.toString());
}

function copyColor(color: string) {
    navigator.clipboard.writeText(color);
    toast('Color copied.');
}

function copyLink(set: ColorSet) {
    let queryParams: { [key: string]: any } = {};

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
</script>

<style lang="scss" scoped>
.section-current-set {
    & .content {
        @apply flex flex-col gap-4;

        & .colors {
            @apply grow grid grid-cols-6 lg:grid-cols-11 self-stretch;

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
            @apply grid grid-cols-1 lg:flex gap-2;

            & input {
                @apply grow;
            }
        }
    }
}
</style>
