<template>
    <section class="section-library">
        <Wrapper>
            <Card>
                <CardHeader>
                    <CardTitle>Saved sets</CardTitle>
                    <CardDescription>Copy, export and edit your saved sets.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div
                        class="py-5 flex flex-col items-center"
                        v-if="!sets || sets?.length === 0"
                    >
                        <i class="ri-pantone-line text-4xl"></i>
                        <span class="text-lg">No sets saved.</span>
                    </div>
                    <div
                        class="grid grid-cols-4 gap-2"
                        v-else
                    >
                        <Card
                            v-for="(set, n) in sets"
                            :key="n"
                        >
                            <CardHeader>
                                <CardTitle>{{ set.label }}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div class="flex flex-col">
                                    <div
                                        v-for="(color, key) in set.palette"
                                        :key="key"
                                        :class="`color-block ${isDark(color) ? 'text-gray-50' : 'text-gray-950'}`"
                                        :style="`background: ${color};`"
                                        @click="copyColor(`${color}`)"
                                    >
                                        <span>{{ color }}</span>
                                        <i class="ri-file-copy-line"></i>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div class="button-group w-full">
                                    <ExportDialog :set="set">
                                        <Button variant="secondary">
                                            <i class="ri-brush-line text-lg"></i>
                                        </Button>
                                    </ExportDialog>
                                    <Button
                                        @click="editSet(set)"
                                        variant="secondary"
                                    >
                                        <i class="ri-file-edit-line text-lg"></i>
                                    </Button>
                                    <Button
                                        @click="deleteSet(set)"
                                        variant="destructive"
                                    >
                                        <i class="ri-delete-bin-line text-lg"></i>
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </CardContent>
                <CardFooter>
                    <div class="flex justify-end w-full">
                        <AlertDialog>
                            <AlertDialogTrigger as-child>
                                <Button variant="destructive">
                                    <i class="ri-delete-bin-line text-lg mr-2"></i>
                                    <span>Delete all sets</span>
                                </Button>
                            </AlertDialogTrigger>
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
                </CardFooter>
            </Card>
        </Wrapper>
    </section>
</template>

<script setup lang="ts">
import Wrapper from '@/components/Wrapper.vue';
import { type PropType, ref } from 'vue';
import type { ColorSet } from '@/colorpalette';
import ExportDialog from '@/components/ExportDialog.vue';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    @apply w-full h-[45px] flex items-center justify-center;

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
</style>
