<template>
    <div class="p-4 w-min">
        <div
            class="w-52 h-40"
            :style="{ backgroundColor: canvasColor }"
        >
            <div
                class="w-full h-full"
                style="background-image: linear-gradient(90deg, #fff, rgba(204, 154, 129, 0))"
            >
                <div
                    ref="canvas"
                    class="w-full h-full relative cursor-pointer"
                    style="background-image: linear-gradient(0deg, #000, rgba(204, 154, 129, 0))"
                    @mousedown="mousedownCanvas"
                >
                    <div
                        ref="canvasCursor"
                        class="h-4 w-4 border border-gray-200 rounded-full absolute -left-2 -top-2 pointer-events-none"
                        style="box-shadow: 2px 2px 2px 0 rgb(0 0 0 / 20%)"
                    ></div>
                </div>
            </div>
        </div>
        <div class="w-52 flex my-2">
            <div
                class="w-8 h-8 rounded-lg"
                style="background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVQYV2NctWrVfwYkEBYWxojMZ6SDAmT7QGx0K1EcRBsFAADeG/3M/HteAAAAAElFTkSuQmCC') repeat"
            >
                <div
                    :style="{ backgroundColor: color }"
                    class="w-full h-full rounded-full"
                />
            </div>
            <div>
                <div
                    ref="line"
                    class="w-40 h-3 ml-4 relative cursor-pointer rounded"
                    style="background-image: linear-gradient(90deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red)"
                    @mousedown="mousedownLine"
                >
                    <div
                        ref="lineCursor"
                        class="h-4 w-4 border border-gray-200 rounded-full absolute -left-2 pointer-events-none"
                        style="top: -2px; box-shadow: 2px 2px 2px 0 rgb(0 0 0 / 20%)"
                    ></div>
                </div>
            </div>
        </div>
        <div class="flex items-center">
            <div
                v-show="inputType === 'rgb'"
                class="flex gap-2"
            >
                <div class="grid w-full max-w-sm items-center gap-1.5">
                    <Label
                        for="picker-r"
                        class="text-muted-foreground text-sm text-center"
                    >
                        R
                    </Label>
                    <Input
                        id="picker-r"
                        v-model="colorLazy.r"
                        @input="inputUpdated"
                        @blur="blurInputR"
                    />
                </div>
                <div class="grid w-full max-w-sm items-center gap-1.5">
                    <Label
                        for="picker-g"
                        class="text-muted-foreground text-sm text-center"
                    >
                        G
                    </Label>
                    <Input
                        id="picker-g"
                        v-model="colorLazy.g"
                        @input="inputUpdated"
                        @blur="blurInputG"
                    />
                </div>
                <div class="grid w-full max-w-sm items-center gap-1.5">
                    <Label
                        for="picker-b"
                        class="text-muted-foreground text-sm text-center"
                    >
                        B
                    </Label>
                    <Input
                        id="picker-b"
                        v-model="colorLazy.b"
                        @input="inputUpdated"
                        @blur="blurInputB"
                    />
                </div>
            </div>
            <div v-show="inputType === 'hex'">
                <div class="grid w-full max-w-sm items-center gap-1.5">
                    <Label
                        for="picker-HEX"
                        class="text-muted-foreground text-sm text-center"
                    >
                        HEX
                    </Label>
                    <Input
                        id="picker-hex"
                        v-model="colorLazy.hex"
                        @change="hexInputUpdated"
                        @blur="blurInputHex"
                    />
                </div>
            </div>
            <div
                class="px-2 text-gray-500 cursor-pointer"
                @mousedown.prevent
                @click.stop.prevent="toggleInputs"
            >
                <svg
                    style="width: 24px; height: 24px"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
                    />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { Input } from '@/components/ui/input';
import { Label } from 'radix-vue';

const emits = defineEmits(['input', 'change']);

const inputValue = defineModel();

const canvasCursor = ref(null);
const lineCursor = ref(null);
const line = ref(null);
const canvas = ref(null);
const draggingLineCursor = ref(false);
const draggingCanvasCursor = ref(false);
const dragStartColor = ref(null);
const lineWidth = ref(160);
const lineLeft = ref(0);
const canvasWidth = ref(208);
const canvasHeight = ref(0);
const canvasLeft = ref(0);
const canvasTop = ref(0);
const percentageBlack = ref(0);
const percentageWhite = ref(0);
const inputType = ref('hex');
const colorLazy = ref({
    r: 255,
    g: 219,
    b: 0,
    hex: '#FFFE00',
});
const colorData = ref({
    r: 255,
    g: 219,
    b: 0,
    hex: '#FFFE00',
});
const lineColorData = ref({
    r: 0,
    g: 0,
    b: 0,
});

function blurInputR() {
    colorLazy.value.r = colorData.value.r;
}
function blurInputG() {
    colorLazy.value.g = colorData.value.g;
}
function blurInputB() {
    colorLazy.value.b = colorData.value.b;
}
function blurInputHex() {
    colorLazy.value.hex = colorData.value.hex;
}
function toggleInputs() {
    if (inputType.value === 'rgb') {
        inputType.value = 'hex';
    } else {
        inputType.value = 'rgb';
    }
}

const color = computed(() => {
    return `rgb(${colorData.value.r}, ${colorData.value.g}, ${colorData.value.b})`;
});
const canvasColor = computed(() => {
    return `rgb(${lineColorData.value.r}, ${lineColorData.value.g}, ${lineColorData.value.b})`;
});

function mouseup(e) {
    if (draggingLineCursor.value || draggingCanvasCursor.value) {
        if (dragStartColor.value !== color.value) {
            emits('change', colorData.value.hex);
        }
    }
    draggingLineCursor.value = false;
    draggingCanvasCursor.value = false;
    unregisterListeners();
}
function mousemove(e) {
    if (draggingLineCursor.value) {
        let pos = e.pageX - lineLeft.value;
        pos = Math.min(lineWidth.value, Math.max(0, pos));
        lineCursor.value.style.transform = `translate(${pos}px, 0px)`;
        calculateLineColor(pos);
    } else if (draggingCanvasCursor.value) {
        let posX = e.pageX - canvasLeft.value;
        let posY = e.pageY - canvasTop.value;
        posX = Math.min(canvasWidth.value, Math.max(0, posX));
        posY = Math.min(canvasHeight.value, Math.max(0, posY));
        canvasCursor.value.style.transform = `translate(${posX}px, ${posY}px)`;
        percentageBlack.value = posY / canvasHeight.value;
        percentageWhite.value = 1 - posX / canvasWidth.value;
    }
    setColorData();
}
function mousedownCanvas(e) {
    if (e.which !== 1) {
        return;
    }
    registerListeners();

    dragStartColor.value = color.value;
    draggingCanvasCursor.value = true;
    setSizePoses();
    canvasCursor.value.style.transform = `translate(${e.offsetX}px, ${e.offsetY}px)`;
    percentageBlack.value = e.offsetY / canvasHeight.value;
    percentageWhite.value = 1 - e.offsetX / canvasWidth.value;
    setColorData();
    e.stopPropagation();
    e.preventDefault();
}
function mousedownLine(e) {
    if (e.which !== 1) {
        return;
    }
    registerListeners();

    dragStartColor.value = color.value;
    draggingLineCursor.value = true;
    setSizePoses();
    lineCursor.value.style.transform = `translate(${e.offsetX}px, 0px)`;
    calculateLineColor(e.offsetX);
    setColorData();
    e.stopPropagation();
    e.preventDefault();
}
function setSizePoses() {
    let boundingRect = line.value.getBoundingClientRect();
    lineLeft.value = boundingRect.left;

    let canvBoundingRect = canvas.value.getBoundingClientRect();
    canvasLeft.value = canvBoundingRect.left;
    canvasTop.value = canvBoundingRect.top;
    canvasHeight.value = canvBoundingRect.height;
}
function setColorData() {
    let targetVal = 255 * (1 - percentageBlack.value);
    targetVal = Math.min(255, Math.max(0, Math.round(targetVal)));

    let remainingR = targetVal - lineColorData.value.r;
    let remainingG = targetVal - lineColorData.value.g;
    let remainingB = targetVal - lineColorData.value.b;

    let rDiff = percentageWhite.value * remainingR;
    let gDiff = percentageWhite.value * remainingG;
    let bDiff = percentageWhite.value * remainingB;

    let r = lineColorData.value.r + rDiff;
    let g = lineColorData.value.g + gDiff;
    let b = lineColorData.value.b + bDiff;

    colorData.value.r = Math.min(targetVal, Math.max(0, Math.round(r)));
    colorData.value.g = Math.min(targetVal, Math.max(0, Math.round(g)));
    colorData.value.b = Math.min(targetVal, Math.max(0, Math.round(b)));

    colorLazy.value = colorData.value;

    colorData.value.hex = '#' + componentToHex(colorData.value.r) + componentToHex(colorData.value.g) + componentToHex(colorData.value.b);
    colorLazy.value.hex = colorData.value.hex;
    inputValue.value = colorData.value.hex;
}
function inputUpdated() {
    validate();
    setUICursors();
    inputValue.value = colorData.value.hex;
}
function hexInputUpdated() {
    validateHex();
    setUICursors();
    inputValue.value = colorData.value.hex;
}
function calculateLineColor(linePos) {
    let perc = linePos / lineWidth.value;
    let value = perc % (1 / 6);
    let colorPerc = value / (1 / 6);
    let percRed = 1;
    let percGreen = 1;
    let percBlue = 1;

    if (perc < 1 / 6) {
        percGreen = colorPerc;
        percBlue = 0;
    } else if (perc < 2 / 6) {
        percRed = 1 - colorPerc;
        percBlue = 0;
    } else if (perc < 3 / 6) {
        percRed = 0;
        percBlue = colorPerc;
    } else if (perc < 4 / 6) {
        percRed = 0;
        percGreen = 1 - colorPerc;
    } else if (perc < 5 / 6) {
        percRed = colorPerc;
        percGreen = 0;
    } else {
        percGreen = 0;
        percBlue = 1 - colorPerc;
    }
    lineColorData.value.r = Math.min(255, Math.max(0, Math.round(percRed * 255)));
    lineColorData.value.g = Math.min(255, Math.max(0, Math.round(percGreen * 255)));
    lineColorData.value.b = Math.min(255, Math.max(0, Math.round(percBlue * 255)));
}
function normalizeColorData() {
    let normalized = {
        r: null,
        g: null,
        b: null,
        variable: null,
    };
    let { r, g, b } = colorData.value;
    if (b > g && b > r) {
        normalized.b = 1;
    } else if (g > r && g > b) {
        normalized.g = 1;
    } else {
        normalized.r = 1;
    }
    if (r < g && r < b) {
        normalized.r = 0;
    } else if (g < r && g < b) {
        normalized.g = 0;
    } else {
        normalized.b = 0;
    }
    Array.from('rgb').forEach((col) => {
        if (normalized[col] === null) {
            normalized.variable = col;
            normalized[col] = colorData.value[col] / 255;
        }
    });
    return normalized;
}
function validateHexChar(c) {
    if (c.length < 0 || c.length > 1) return '0';
    if (isNaN(c)) {
        let validChars = ['A', 'B', 'C', 'D', 'E', 'F'];
        if (validChars.includes(c.toUpperCase())) {
            return c.toUpperCase();
        } else {
            return '0';
        }
    } else {
        return c;
    }
}
function cleanHex(hex) {
    if (!hex || hex.length < 3) return '#000000';
    let _cleaned = hex.toUpperCase();
    if (_cleaned.startsWith('#')) _cleaned = _cleaned.substr(1);
    if (_cleaned.length < 3) return '#000000';
    let r, g, b, a;
    r = g = b = '00';
    if (_cleaned.length === 3) {
        let rgb = _cleaned
            .split('')
            .map((r) => `0${r}`)
            .map((r) => validateHexChar(r));
        r = rgb[0];
        g = rgb[1];
        b = rgb[2];
    } else if (_cleaned.length >= 6) {
        let rgb = _cleaned.split('').map((r) => validateHexChar(r));
        r = rgb[0] + rgb[1];
        g = rgb[2] + rgb[3];
        b = rgb[4] + rgb[5];
    }
    return `#${r}${g}${b}`;
}
function parseHex(hex) {
    let hexArr = cleanHex(hex).substr(1).split('');

    let h = hexArr[0] + hexArr[1];
    let e = hexArr[2] + hexArr[3];
    let x = hexArr[4] + hexArr[5];
    let r = parseInt(h, 16);
    let g = parseInt(e, 16);
    let b = parseInt(x, 16);

    return {
        hex: '#' + h + e + x,
        r,
        g,
        b,
    };
}
function validateHex() {
    let parsedColor = parseHex(colorLazy.value.hex);
    colorData.value = { ...parsedColor };

    colorLazy.value = colorData.value;
}

function registerListeners() {
    document.addEventListener('mouseup', mouseup);
    document.addEventListener('mousemove', mousemove);
}
function unregisterListeners() {
    document.removeEventListener('mouseup', mouseup);
    document.removeEventListener('mousemove', mousemove);
}
function componentToHex(c) {
    let hex = c.toString(16).toUpperCase();
    return hex.length == 1 ? '0' + hex : hex;
}
function validate() {
    let r = Number(colorLazy.value.r);
    let g = Number(colorLazy.value.g);
    let b = Number(colorLazy.value.b);
    if (isNaN(r) || r === null) r = 0;
    if (isNaN(g) || g === null) g = 0;
    if (isNaN(b) || b === null) b = 0;
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    colorData.value.r = r;
    colorData.value.g = g;
    colorData.value.b = b;
    colorData.value.hex = '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
    colorLazy.value.hex = colorData.value.hex;
}
function setUICursors() {
    setSizePoses();

    let normalized = normalizeColorData();

    let sector = 0;
    let variablePerc = 0;
    if (normalized.variable === 'r') {
        if (normalized.g === 1) {
            sector = 1;
            variablePerc = 1 - colorData.value.r / 255;
        } else if (normalized.b === 1) {
            sector = 4;
            variablePerc = colorData.value.r / 255;
        }
    } else if (normalized.variable === 'b') {
        if (normalized.r === 1) {
            sector = 5;
            variablePerc = 1 - colorData.value.b / 255;
        } else if (normalized.g === 1) {
            sector = 2;
            variablePerc = colorData.value.b / 255;
        }
    } else {
        if (normalized.r === 1) {
            sector = 0;
            variablePerc = colorData.value.g / 255;
        } else if (normalized.b === 1) {
            sector = 3;
            variablePerc = 1 - colorData.value.g / 255;
        }
    }
    let sectorLength = lineWidth.value / 6;
    let variableSectorLeft = variablePerc * sectorLength;

    let lineCursorLeft = sectorLength * sector + variableSectorLeft;
    lineCursor.value.style.transform = `translate(${lineCursorLeft}px, 0px)`;

    lineColorData.value.r = Math.min(255, Math.max(0, Math.round(normalized.r * 255)));
    lineColorData.value.g = Math.min(255, Math.max(0, Math.round(normalized.g * 255)));
    lineColorData.value.b = Math.min(255, Math.max(0, Math.round(normalized.b * 255)));

    Array.from('rgb').forEach((col) => {
        if (lineColorData.value[col] === 0) {
            percentageWhite.value = colorData.value[col] / 255;
        } else if (lineColorData.value[col] === 255) {
            percentageBlack.value = 1 - colorData.value[col] / 255;
        }
    });

    let canvCursorX = canvasWidth.value * (1 - percentageWhite.value);
    let canvCursorY = canvasHeight.value * percentageBlack.value;
    canvasCursor.value.style.transform = `translate(${canvCursorX}px, ${canvCursorY}px)`;
}

onMounted(() => {
    colorLazy.value = parseHex(inputValue.value);
    validate();
    setUICursors();
    registerListeners();
});
onUnmounted(() => {
    unregisterListeners();
});
</script>
