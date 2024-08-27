<template>
    <dialog ref="exportDialog">
        <template v-if="set">
            <header>
                <h1>Export {{ set.label }}</h1>
                <button
                    @click="close"
                    class="transparent"
                >
                    <i class="ri-close-line"></i>
                </button>
            </header>
            <div class="button-group">
                <button
                    @click="setMode('hex')"
                    :class="`${mode === 'hex' ? 'danger' : ''}`"
                >
                    Hex
                </button>
                <button
                    @click="setMode('rgb')"
                    :class="`${mode === 'rgb' ? 'danger' : ''}`"
                >
                    RGB
                </button>
                <button
                    @click="setMode('rawrgb')"
                    :class="`${mode === 'rawrgb' ? 'danger' : ''}`"
                >
                    Raw RGB
                </button>
                <button
                    @click="setMode('hls')"
                    :class="`${mode === 'hls' ? 'danger' : ''}`"
                >
                    HLS
                </button>
                <button
                    @click="setMode('tailwind')"
                    :class="`${mode === 'tailwind' ? 'danger' : ''}`"
                >
                    Tailwind
                </button>
                <button
                    @click="setMode('svg')"
                    :class="`${mode === 'svg' ? 'danger' : ''}`"
                >
                    SVG
                </button>
            </div>
            <code>
                <pre>{{ generateCode(set) }}</pre>
            </code>
            <button
                @click="copyCode(set)"
                class="primary"
            >
                <i class="ri-file-copy-line"></i>
                <span>Copy</span>
            </button>
        </template>
    </dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { ColorSet } from '@/colorpalette';
import slug from 'slug';

const exportDialog = ref<HTMLDialogElement>(null);
const active = ref<boolean>(false);
const set = ref<ColorSet>(null);
const mode = ref<string>('hex');

function open(setToShow: ColorSet) {
    set.value = setToShow;
    exportDialog.value?.showModal();
    active.value = true;
}

function close() {
    exportDialog.value?.close();
    active.value = false;
}

function setMode(newMode: string) {
    mode.value = newMode;
}

const NEW_LINE = `\r\n`;
const INDENT = '  ';
function generateCSSVariable(labelSlug: string, item: [string, string], formatFunction: (color: string) => string): string {
    return `${INDENT}--${labelSlug}-${item[0]}: ${formatFunction(item[1])};`;
}
function generateCode(set: ColorSet) {
    let labelSlug = slug(set.label);
    let lines = [];

    switch (mode.value) {
        default:
            return 'not implemented';
        case 'hex':
            Object.entries(set.palette).forEach((item) => {
                lines.push(generateCSSVariable(labelSlug, item, (color) => color));
            });
            return `:root {\r\n${lines.join(`\r\n`)}\r\n}`;
        case 'rgb':
            Object.entries(set.palette).forEach((item) => {
                const colorInRGB = hexToRgb(item[1]);
                lines.push(generateCSSVariable(labelSlug, item, () => `rgb(${colorInRGB.r},${colorInRGB.g},${colorInRGB.b})`));
            });
            return `:root {\r\n${lines.join(`\r\n`)}\r\n}`;
        case 'rawrgb':
            Object.entries(set.palette).forEach((item) => {
                const colorInRGB = hexToRgb(item[1]);
                lines.push(generateCSSVariable(labelSlug, item, () => `${colorInRGB.r},${colorInRGB.g},${colorInRGB.b}`));
            });
            return `:root {\r\n${lines.join(`\r\n`)}\r\n}`;
        case 'hls':
            Object.entries(set.palette).forEach((item) => {
                lines.push(generateCSSVariable(labelSlug, item, hexToHslCss));
            });
            return `:root {\r\n${lines.join(`\r\n`)}\r\n}`;
        case 'tailwind':
            Object.entries(set.palette).forEach((item) => {
                lines.push(`${INDENT.repeat(5)}${item[0]}: ${item[1]},`);
            });
            return `module.exports = {${NEW_LINE}${INDENT}theme: {${NEW_LINE}${INDENT.repeat(2)}extend: {${NEW_LINE}${INDENT.repeat(3)}colors: {${NEW_LINE}${INDENT.repeat(4)}${labelSlug}: {${NEW_LINE}${lines.join(NEW_LINE)}${NEW_LINE}${INDENT.repeat(4)}}${NEW_LINE}${INDENT.repeat(3)}}${NEW_LINE}${INDENT.repeat(2)}}${NEW_LINE}${INDENT}}${NEW_LINE}}`;
        case 'svg':
            const squareSize = 50;
            let x = 0;
            const svgStart = `<svg xmlns="http://www.w3.org/2000/svg" width="${Object.entries(set.palette).length * squareSize}" height="${squareSize}">`;
            lines.push(svgStart);
            Object.entries(set.palette).forEach((item) => {
                lines.push(`${INDENT}<rect x="${x}" y="0" width="${squareSize}" height="${squareSize}" fill="${item[1]}" />`);
                x += squareSize;
            });
            lines.push(`</svg>`);
            return lines.join(NEW_LINE);
    }
}

function copyCode(set: ColorSet) {
    navigator.clipboard.writeText(generateCode(set));
}

defineExpose({
    open,
    close,
    active,
});

/** COLOR HELPERS **/
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    if (!/^#([A-Fa-f0-9]{6})$/.test(hex)) {
        return null;
    }

    hex = hex.slice(1);

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
}
function hexToHls(hex: string): { h: number; l: number; s: number } | null {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    let { r, g, b } = rgb;

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h: number = 0;
    let s: number = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }

    return { h: h * 360, l, s };
}
function hexToHslCss(hex: string): string | null {
    const hls = hexToHls(hex);
    if (!hls) return null;

    return `hsl(${hls.h.toFixed(0)}, ${(hls.s * 100).toFixed(0)}%, ${(hls.l * 100).toFixed(0)}%)`;
}
</script>

<style lang="scss" scoped>
dialog::backdrop {
    background: rgba(0, 0, 0, 0.4);
}
dialog[open] {
    border: 0;
    background: #fff;
    padding: var(--unit-5);
    border-radius: var(--unit-4);
    box-shadow: 0px var(--unit-2) var(--unit-5) rgba(0, 0, 0, 0.3);
    width: calc(100% - 50px);
    max-width: 500px;
    max-height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    gap: var(--unit-4);

    & header {
        display: flex;
        gap: var(--unit-4);
        align-items: center;

        & h1 {
            font-size: 1.5rem;
            flex-grow: 1;
        }
    }
    & code {
        font-size: 0.85rem;
        line-height: 1.25rem;
        padding: var(--unit-3);
        background: var(--color-base-100);
        border: 1px solid var(--color-base-200);
        border-radius: var(--unit-2);
        overflow: auto;
    }
}
</style>
