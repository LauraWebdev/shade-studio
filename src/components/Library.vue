<template>
    <div class="library-container">
        <div class="flex items-center justify-between px-1 mb-3">
            <h2 class="text-sm font-semibold text-muted-foreground">Saved sets</h2>
            <AlertDialog v-if="sets && sets.length > 0">
                <Tooltip>
                    <TooltipTrigger as-child>
                        <AlertDialogTrigger as-child>
                            <Button
                                variant="ghost"
                                size="sm"
                                class="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                            >
                                <i class="ri-delete-bin-line text-lg"></i>
                            </Button>
                        </AlertDialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>Purge all sets</span>
                    </TooltipContent>
                </Tooltip>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone. This will permanently remove all saved sets.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction @click="purgeAllSets">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>

        <div
            class="py-8 flex flex-col items-center border-2 border-dashed rounded-lg opacity-50"
            v-if="!sets || sets?.length === 0"
        >
            <i class="ri-pantone-line text-4xl"></i>
            <span class="text-sm mt-2">No sets saved.</span>
        </div>

        <div
            class="flex flex-col gap-2"
            v-else
        >
            <Card
                v-for="(set, n) in sets"
                :key="n"
                class="overflow-hidden shadow-none hover:border-foreground/20 transition-colors"
            >
                <CardHeader class="p-3 pb-0 flex flex-row items-center justify-between space-y-0">
                    <CardTitle class="text-sm font-medium truncate max-w-[180px]">{{ set.label }}</CardTitle>
                    <div class="flex items-center gap-0.5">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <ExportDialog :set="set">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        class="h-8 w-8 p-0"
                                    >
                                        <i class="ri-brush-line text-base"></i>
                                    </Button>
                                </ExportDialog>
                            </TooltipTrigger>
                            <TooltipContent>
                                <span>Export set</span>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Button
                                    @click="editSet(set)"
                                    variant="ghost"
                                    size="sm"
                                    class="h-8 w-8 p-0"
                                >
                                    <i class="ri-file-edit-line text-base"></i>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <span>Edit set</span>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Button
                                    @click="deleteSet(set)"
                                    variant="ghost"
                                    size="sm"
                                    class="h-8 w-8 p-0 hover:text-destructive"
                                >
                                    <i class="ri-delete-bin-line text-base"></i>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <span>Delete set</span>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </CardHeader>
                <CardContent class="p-3">
                    <div class="grid grid-cols-11 h-6 rounded overflow-hidden border">
                        <Tooltip
                            v-for="(color, key) in set.palette"
                            :key="key"
                        >
                            <TooltipTrigger as-child>
                                <div
                                    :class="`color-block ${isDark(color) ? 'text-white' : 'text-black'}`"
                                    :style="`background: ${color};`"
                                    @click="copyColor(`${color}`)"
                                >
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import type { ColorSet } from '@/colorpalette';
import ExportDialog from '@/components/ExportDialog.vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { isDark } from '@/lib/is-dark';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'vue-sonner';

defineProps({
    sets: {
        type: Array as PropType<ColorSet[]>,
        default: () => [],
    },
});

const emits = defineEmits(['deleteSet', 'purgeAllSets']);

function deleteSet(set: ColorSet) {
    emits('deleteSet', set);
}

function editSet(set: ColorSet) {
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
        .map(([key, value]) => `${key as string}=${encodeURIComponent(value as string)}`)
        .join('&');

    window.location.href = `${window.location.href.split('?')[0]}?${queryParamsString}`;
}

function purgeAllSets() {
    emits('purgeAllSets');
}

function copyColor(color: string) {
    navigator.clipboard.writeText(color);
    toast('Color copied.');
}
</script>

<style lang="scss" scoped>
.color-block {
    @apply w-full h-full flex items-center justify-center cursor-copy;

    & i {
        @apply text-[10px] opacity-0 transition-opacity;
    }
    &:hover {
        & i {
            @apply opacity-100;
        }
    }
}
</style>
