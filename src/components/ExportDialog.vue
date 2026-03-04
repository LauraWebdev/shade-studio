<template>
    <Dialog>
        <DialogTrigger
            as-child
            v-bind="$attrs"
        >
            <slot />
        </DialogTrigger>
        <DialogContent class="max-w-[800px] w-[90%]">
            <DialogHeader>
                <DialogTitle>Export {{ set.label }}</DialogTitle>
            </DialogHeader>
            <div class="flex flex-col gap-5 lg:grid lg:grid-cols-[1fr_2fr] lg:gap-5">
                <div class="gap-1 flex lg:flex-col">
                    <Button
                        @click="setMode('hex')"
                        :variant="mode === 'hex' ? 'default' : 'secondary'"
                    >
                        Hex
                    </Button>
                    <Button
                        @click="setMode('rgb')"
                        :variant="mode === 'rgb' ? 'default' : 'secondary'"
                    >
                        RGB
                    </Button>
                    <Button
                        @click="setMode('rawrgb')"
                        :variant="mode === 'rawrgb' ? 'default' : 'secondary'"
                    >
                        Raw RGB
                    </Button>
                    <Button
                        @click="setMode('hsl')"
                        :variant="mode === 'hsl' ? 'default' : 'secondary'"
                    >
                        HSL
                    </Button>
                    <Button
                        @click="setMode('oklch')"
                        :variant="mode === 'oklch' ? 'default' : 'secondary'"
                    >
                        OKLCH
                    </Button>
                    <Button
                        @click="setMode('tailwind3')"
                        :variant="mode === 'tailwind3' ? 'default' : 'secondary'"
                    >
                        Tailwind 3
                    </Button>
                    <Button
                        @click="setMode('tailwind4')"
                        :variant="mode === 'tailwind4' ? 'default' : 'secondary'"
                    >
                        Tailwind 4
                    </Button>
                    <Button
                        @click="setMode('svg')"
                        :variant="mode === 'svg' ? 'default' : 'secondary'"
                    >
                        SVG
                    </Button>
                </div>
                <div class="flex flex-col gap-1">
                    <div class="font-mono whitespace-pre text-xs border p-4 rounded-lg leading-5 overflow-y-auto">{{ generateCode() }}</div>
                    <Button @click="copyCode()">
                        <i class="ri-file-copy-line text-lg mr-2"></i>
                        <span>Copy</span>
                    </Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import chroma from 'chroma-js';
import { type PropType, ref } from 'vue';
import type { ColorSet } from '@/colorpalette';
import slug from 'slug';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'vue-sonner';

defineOptions({
    inheritAttrs: false,
});

const props = defineProps({
    set: {
        type: Object as PropType<ColorSet>,
        required: true,
    },
});
const mode = ref<string>('hex');

function setMode(newMode: string) {
    mode.value = newMode;
}

const NEW_LINE = `\r\n`;
const INDENT = '  ';
function generateCSSVariable(labelSlug: string, item: [string, string], formatFunction: (color: string) => string): string {
    return `${INDENT}--${labelSlug}-${item[0]}: ${formatFunction(item[1])};`;
}
function generateCode() {
    let labelSlug = slug(props.set.label);
    let lines: string[] = [];

    switch (mode.value) {
        default:
            return 'not implemented';
        case 'hex':
            Object.entries(props.set.palette).forEach((item) => {
                lines.push(generateCSSVariable(labelSlug, item, (color) => color));
            });
            return `:root {\r\n${lines.join(`\r\n`)}\r\n}`;
        case 'rgb':
            Object.entries(props.set.palette).forEach((item) => {
                const colorInRGB = hexToRgb(item[1]) ?? { r: 0, g: 0, b: 0 };
                lines.push(generateCSSVariable(labelSlug, item, () => `rgb(${colorInRGB.r},${colorInRGB.g},${colorInRGB.b})`));
            });
            return `:root {\r\n${lines.join(`\r\n`)}\r\n}`;
        case 'rawrgb':
            Object.entries(props.set.palette).forEach((item) => {
                const colorInRGB = hexToRgb(item[1]) ?? { r: 0, g: 0, b: 0 };
                lines.push(generateCSSVariable(labelSlug, item, () => `${colorInRGB.r},${colorInRGB.g},${colorInRGB.b}`));
            });
            return `:root {\r\n${lines.join(`\r\n`)}\r\n}`;
        case 'hsl':
            Object.entries(props.set.palette).forEach((item) => {
                lines.push(generateCSSVariable(labelSlug, item, hexToHslCss));
            });
            return `:root {\r\n${lines.join(`\r\n`)}\r\n}`;
        case 'oklch':
            Object.entries(props.set.palette).forEach((item) => {
                lines.push(generateCSSVariable(labelSlug, item, hexToOklchCss));
            });
            return `:root {\r\n${lines.join(`\r\n`)}\r\n}`;
        case 'tailwind3':
            Object.entries(props.set.palette).forEach((item) => {
                lines.push(`${INDENT.repeat(5)}${item[0]}: ${item[1]},`);
            });
            return `module.exports = {${NEW_LINE}${INDENT}theme: {${NEW_LINE}${INDENT.repeat(2)}extend: {${NEW_LINE}${INDENT.repeat(3)}colors: {${NEW_LINE}${INDENT.repeat(4)}${labelSlug}: {${NEW_LINE}${lines.join(NEW_LINE)}${NEW_LINE}${INDENT.repeat(4)}}${NEW_LINE}${INDENT.repeat(3)}}${NEW_LINE}${INDENT.repeat(2)}}${NEW_LINE}${INDENT}}${NEW_LINE}}`;
        case 'tailwind4':
            Object.entries(props.set.palette).forEach((item) => {
                lines.push(`${INDENT}--color-${labelSlug}--${item[0]}: ${item[1]};`);
            });
            return lines.join(NEW_LINE);
        case 'svg': {
            const squareSize = 50;
            let x = 0;
            const svgStart = `<svg xmlns="http://www.w3.org/2000/svg" width="${Object.entries(props.set.palette).length * squareSize}" height="${squareSize}">`;
            lines.push(svgStart);
            Object.entries(props.set.palette).forEach((item) => {
                lines.push(`${INDENT}<rect x="${x}" y="0" width="${squareSize}" height="${squareSize}" fill="${item[1]}" />`);
                x += squareSize;
            });
            lines.push(`</svg>`);
            return lines.join(NEW_LINE);
        }
    }
}

function copyCode() {
    navigator.clipboard.writeText(generateCode());
    toast('Code copied.');
}

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
function hexToHsl(hex: string): { h: number; l: number; s: number } | null {
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
function hexToHslCss(hex: string): string {
    const hsl = hexToHsl(hex);
    if (!hsl) return `hsl(0,0%,0%)`;

    return `hsl(${hsl.h.toFixed(0)}, ${(hsl.s * 100).toFixed(0)}%, ${(hsl.l * 100).toFixed(0)}%)`;
}
function hexToOklchCss(hex: string): string {
    const [l, c, h] = chroma(hex).oklch();
    return `oklch(${l.toFixed(2)} ${c.toFixed(3)} ${isNaN(h) ? 0 : h.toFixed(1)})`;
}
</script>

<style lang="scss" scoped></style>
