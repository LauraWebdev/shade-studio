<template>
    <div class="color-palette-list">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.color-palette-list {
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    gap: var(--unit-2);
}
</style>
