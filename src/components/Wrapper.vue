<template>
    <div class="wrapper">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    width: calc(100% - 30px);
    margin: 0 auto;
    max-width: 1100px;
    display: flex;
    flex-direction: column;
}
</style>
