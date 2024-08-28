<template>
    <div class="wrapper">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    @apply w-[calc(100%-30px)] mx-auto max-w-5xl flex flex-col;
}
</style>
