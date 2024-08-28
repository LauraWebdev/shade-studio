<template>
    <header>
        <Wrapper>
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
                <Button
                    variant="secondary"
                    @click="switchTheme"
                >
                    <i class="ri-sun-line text-lg"></i>
                </Button>
            </nav>
        </Wrapper>
    </header>
</template>

<script setup lang="ts">
import Wrapper from '@/components/Wrapper.vue';
import BrandLogo from '@/components/BrandLogo.vue';
import { Button } from '@/components/ui/button';

function switchTheme() {
    document.querySelector('body')?.classList.toggle('dark');
}
</script>

<style lang="scss" scoped>
header {
    @apply flex items-center h-[60px] border-b-1;

    & .wrapper {
        @apply flex-row items-center;

        & .brand {
            @apply flex-grow;
        }

        & nav {
            @apply flex items-center gap-2;
        }
    }
}
</style>
