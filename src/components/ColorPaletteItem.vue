<template>
    <div
        :class="`color-palette-item ${wasClicked ? 'active' : ''} ${isDark(color) ? 'dark' : ''}`"
        :style="`background: ${color}`"
        tabindex="0"
        @click="copyColor"
    >
        <span>{{ step }}</span>
        <span>{{ color }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    step: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
});

const wasClicked = ref<boolean>(false);

function copyColor() {
    navigator.clipboard.writeText(props.color);
    wasClicked.value = true;
    setTimeout(() => {
        wasClicked.value = false;
    }, 200);
}

function isDark(hex) {
    hex = hex.replace(/^#/, '');

    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);

    let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luminance < 128;
}
</script>

<style lang="scss" scoped>
.color-palette-item {
    padding: var(--unit-4) 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--unit-2);
    border-radius: var(--unit-2);
    transition: 0.15s ease-in-out;
    cursor: pointer;
    will-change: transform;

    &.dark {
        color: #fff;
    }

    & span:nth-child(1) {
        font-weight: 500;
    }
    & span:nth-child(2) {
        font-size: 0.8rem;
        font-weight: 300;
        opacity: 0.6;
    }

    &.active {
        transform: scale(0.9);
    }
}
</style>
