<template>
    <header>
        <BrandLogo />

        <nav>
            <Button
                variant="ghost"
                as="a"
                href="https://github.com/LauraWebdev/shade-studio"
                target="_blank"
            >
                <i class="ri-github-line text-lg mr-2"></i>
                <span>GitHub</span>
            </Button>
            <Tooltip>
                <TooltipTrigger as-child>
                    <Button
                        variant="secondary"
                        @click="switchTheme"
                    >
                        <i class="ri-sun-line text-lg"></i>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <span>Switch theme</span>
                </TooltipContent>
            </Tooltip>
        </nav>
    </header>
</template>

<script setup lang="ts">
import BrandLogo from '@/components/BrandLogo.vue';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

function switchTheme() {
    document.querySelector('body')?.classList.toggle('dark');
}
</script>

<style lang="scss" scoped>
header {
    @apply flex items-center h-[60px] border-b-1 px-5;

    & nav {
        @apply flex items-center gap-2;
    }
}
</style>
