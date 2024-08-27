<template>
    <header>
        <Wrapper>
            <div class="brand">
                <span>ShadeStudio</span>
                <span>BETA</span>
            </div>
        </Wrapper>
    </header>
</template>

<script setup lang="ts">
import Wrapper from '@/components/Wrapper.vue';
</script>

<style lang="scss" scoped>
header {
    height: 60px;
    background: var(--color-base-600);
    color: var(--color-base-50);
    display: flex;
    align-items: center;

    & .brand {
        display: flex;
        gap: var(--unit-3);

        & span:nth-child(1) {
            font-size: 1.5rem;
            font-weight: 600;
        }
        & span:nth-child(2) {
            font-weight: 500;
            letter-spacing: 0.1rem;
            font-size: 0.8rem !important;
            opacity: 0.4;
        }
    }
}
</style>
