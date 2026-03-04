<template>
    <section
        v-if="set"
        class="section-preview"
        :style="cssVars"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
            <!-- Hero Card -->
            <div class="p-8 rounded-2xl border border-[var(--color-200)] dark:border-[var(--color-800)] bg-[var(--color-50)] dark:bg-[var(--color-950)] flex flex-col gap-6 shadow-sm overflow-hidden relative">
                <div class="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[var(--color-200)] dark:bg-[var(--color-800)] blur-2xl opacity-20"></div>

                <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-600)] text-[var(--color-50)] shadow-lg shadow-[var(--color-600)]/30 relative z-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                    </svg>
                </div>

                <div class="space-y-2 relative z-10">
                    <h3 class="text-xl font-bold text-[var(--color-950)] dark:text-[var(--color-50)]">Next-gen Design</h3>
                    <p class="text-sm text-[var(--color-600)] dark:text-[var(--color-400)] leading-relaxed">Elevate your projects with professional color systems tailored for modern interfaces.</p>
                </div>

                <div class="flex flex-col gap-2 mt-auto relative z-10">
                    <button class="w-full py-2.5 px-4 rounded-lg font-bold text-[var(--color-50)] transition-all bg-[var(--color-600)] hover:bg-[var(--color-700)] active:scale-95 shadow-md shadow-[var(--color-600)]/20">Get Early Access</button>
                    <button class="w-full py-2.5 px-4 rounded-lg font-semibold text-[var(--color-700)] dark:text-[var(--color-300)] transition-colors hover:bg-[var(--color-100)] dark:hover:bg-[var(--color-900)]">View documentation</button>
                </div>
            </div>

            <!-- Stats & Chart Card -->
            <div class="p-8 rounded-2xl border border-[var(--color-200)] dark:border-[var(--color-800)] bg-[var(--color-50)] dark:bg-[var(--color-950)] flex flex-col gap-4 shadow-sm">
                <div class="flex items-center justify-between">
                    <span class="text-sm font-semibold text-[var(--color-600)] dark:text-[var(--color-400)]">Revenue growth</span>
                    <span class="px-2 py-0.5 rounded-full bg-[var(--color-100)] dark:bg-[var(--color-900)] text-[var(--color-700)] dark:text-[var(--color-300)] text-[10px] font-bold">+24.8%</span>
                </div>
                <div class="text-3xl font-black text-[var(--color-950)] dark:text-[var(--color-50)]">$128,430</div>

                <div class="mt-4 flex items-end gap-1.5 h-32 group">
                    <div
                        v-for="(h, i) in [30, 45, 60, 35, 75, 90, 65, 80, 55, 95]"
                        :key="i"
                        class="flex-1 rounded-t-md transition-all duration-500 bg-[var(--color-200)] dark:bg-[var(--color-800)] group-hover:bg-[var(--color-500)]"
                        :style="{ height: h + '%', opacity: 0.3 + i * 0.07 }"
                    ></div>
                </div>

                <div class="flex items-center justify-between mt-2 pt-4 border-t border-[var(--color-100)] dark:border-[var(--color-900)]">
                    <div class="flex -space-x-2">
                        <div
                            v-for="i in 3"
                            :key="i"
                            class="w-6 h-6 rounded-full border-2 border-[var(--color-50)] dark:border-[var(--color-950)] bg-[var(--color-200)] dark:bg-[var(--color-800)]"
                        ></div>
                    </div>
                    <span class="text-xs text-[var(--color-600)] dark:text-[var(--color-400)] font-medium">Joined by 12k others</span>
                </div>
            </div>

            <!-- Team / List Card -->
            <div class="p-8 rounded-2xl border border-[var(--color-200)] dark:border-[var(--color-800)] bg-[var(--color-50)] dark:bg-[var(--color-950)] flex flex-col gap-6 shadow-sm">
                <div class="flex items-center justify-between">
                    <h3 class="font-bold text-[var(--color-950)] dark:text-[var(--color-50)]">Top Contributors</h3>
                    <button class="text-xs font-bold text-[var(--color-600)] dark:text-[var(--color-400)] hover:underline">See all</button>
                </div>

                <div class="space-y-5">
                    <div
                        v-for="(name, i) in ['Alex Rivera', 'Sarah Chen', 'Jordan Smith']"
                        :key="i"
                        class="flex items-center gap-4"
                    >
                        <div
                            class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                            :style="{
                                backgroundColor: `var(--color-${100 + i * 100})`,
                                color: `var(--color-${700 + i * 50})`,
                            }"
                        >
                            {{ name[0] }}
                        </div>
                        <div class="flex-1">
                            <p class="text-sm font-bold text-[var(--color-950)] dark:text-[var(--color-50)]">{{ name }}</p>
                            <p class="text-[10px] text-[var(--color-600)] dark:text-[var(--color-400)] uppercase tracking-wider font-semibold">Developer</p>
                        </div>
                        <div class="w-8 h-1.5 rounded-full bg-[var(--color-100)] dark:bg-[var(--color-900)]">
                            <div
                                class="h-1.5 rounded-full bg-[var(--color-500)]"
                                :style="{ width: [85, 70, 45][i] + '%' }"
                            ></div>
                        </div>
                    </div>
                </div>

                <div class="mt-auto p-4 rounded-xl bg-[var(--color-100)]/50 dark:bg-[var(--color-900)]/50 border border-[var(--color-100)] dark:border-[var(--color-900)] flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full bg-[var(--color-500)] animate-pulse"></div>
                    <span class="text-xs font-semibold text-[var(--color-800)] dark:text-[var(--color-200)]">Server status: Optimal</span>
                </div>
            </div>

            <!-- UI Elements / Components Card -->
            <div class="p-8 rounded-2xl border border-[var(--color-200)] dark:border-[var(--color-800)] bg-[var(--color-50)] dark:bg-[var(--color-950)] flex flex-col gap-6 shadow-sm">
                <h3 class="font-bold text-[var(--color-950)] dark:text-[var(--color-50)]">UI Components</h3>

                <div class="grid grid-cols-2 gap-3">
                    <button class="py-2 px-3 rounded-lg text-xs font-bold bg-[var(--color-600)] text-[var(--color-50)] shadow-md">Primary</button>
                    <button class="py-2 px-3 rounded-lg text-xs font-bold bg-[var(--color-100)] dark:bg-[var(--color-900)] text-[var(--color-700)] dark:text-[var(--color-300)]">Secondary</button>
                    <button class="py-2 px-3 rounded-lg text-xs font-bold border-2 border-[var(--color-200)] dark:border-[var(--color-800)] text-[var(--color-950)] dark:text-[var(--color-50)]">Outline</button>
                    <button class="py-2 px-3 rounded-lg text-xs font-bold bg-[var(--color-900)] dark:bg-[var(--color-100)] text-[var(--color-50)] dark:text-[var(--color-950)]">Contrast</button>
                </div>

                <div class="space-y-3">
                    <div class="flex items-center gap-2">
                        <div class="w-4 h-4 rounded bg-[var(--color-600)] flex items-center justify-center text-[var(--color-50)]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="4"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <span class="text-sm font-medium text-[var(--color-950)] dark:text-[var(--color-50)]">Checkbox checked</span>
                    </div>

                    <div class="flex items-center justify-between p-3 rounded-lg border-2 border-[var(--color-500)] bg-[var(--color-100)] dark:bg-[var(--color-900)]">
                        <span class="text-sm font-bold text-[var(--color-800)] dark:text-[var(--color-200)]">Selected Item</span>
                        <div class="w-4 h-4 rounded-full bg-[var(--color-500)]"></div>
                    </div>
                </div>

                <div class="flex gap-2">
                    <span
                        v-for="step in [200, 400, 600, 800]"
                        :key="step"
                        class="w-full h-8 rounded-md"
                        :style="{ backgroundColor: `var(--color-${step})` }"
                    ></span>
                </div>
            </div>
        </div>

        <!-- Larger Examples Section -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <!-- Pricing Section (Bigger) -->
            <div class="xl:col-span-2 p-8 rounded-2xl border border-[var(--color-200)] dark:border-[var(--color-800)] bg-[var(--color-50)] dark:bg-[var(--color-950)] flex flex-col gap-8 shadow-sm">
                <div class="text-center space-y-2">
                    <h2 class="text-2xl font-black text-[var(--color-950)] dark:text-[var(--color-50)]">Simple, transparent pricing</h2>
                    <p class="text-[var(--color-600)] dark:text-[var(--color-400)]">Everything you need to build amazing products.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                        v-for="(plan, i) in ['Starter', 'Professional', 'Enterprise']"
                        :key="plan"
                        class="p-6 rounded-xl border flex flex-col transition-all hover:scale-[1.02]"
                        :class="i === 1 ? 'border-[var(--color-500)] ring-1 ring-[var(--color-500)] relative' : 'border-[var(--color-200)] dark:border-[var(--color-800)]'"
                    >
                        <div class="mb-4">
                            <h4 class="font-bold text-[var(--color-950)] dark:text-[var(--color-50)]">{{ plan }}</h4>
                            <div class="flex items-baseline gap-1 mt-2">
                                <span class="text-2xl font-black text-[var(--color-950)] dark:text-[var(--color-50)]">${{ [0, 49, 99][i] }}</span>
                                <span class="text-xs text-[var(--color-600)] dark:text-[var(--color-400)]">/mo</span>
                            </div>
                        </div>

                        <ul class="space-y-3 mb-8 flex-1">
                            <li
                                v-for="j in 4"
                                :key="j"
                                class="flex items-center gap-2 text-xs text-[var(--color-700)] dark:text-[var(--color-300)]"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="text-[var(--color-500)]"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>{{ ['Unlimited projects', 'Advanced analytics', 'Custom domain', 'Priority support'][j - 1] }}</span>
                            </li>
                        </ul>

                        <button
                            class="w-full py-2 rounded-lg text-xs font-bold transition-all"
                            :class="i === 1 ? 'bg-[var(--color-600)] text-[var(--color-50)] shadow-lg shadow-[var(--color-600)]/20' : 'bg-[var(--color-100)] dark:bg-[var(--color-900)] text-[var(--color-700)] dark:text-[var(--color-300)] hover:bg-[var(--color-200)] dark:hover:bg-[var(--color-800)]'"
                        >
                            {{ i === 2 ? 'Contact Sales' : 'Get Started' }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Dashboard Overview Sidebar/Stat snippet -->
            <div class="p-8 rounded-2xl border border-[var(--color-200)] dark:border-[var(--color-800)] bg-[var(--color-50)] dark:bg-[var(--color-950)] flex flex-col gap-6 shadow-sm overflow-hidden">
                <div class="flex items-center gap-3 pb-6 border-b border-[var(--color-200)] dark:border-[var(--color-800)]">
                    <div class="w-8 h-8 rounded-lg bg-[var(--color-600)]"></div>
                    <div>
                        <h4 class="text-sm font-bold text-[var(--color-950)] dark:text-[var(--color-50)]">Shade Studio</h4>
                        <p class="text-[10px] text-[var(--color-600)] dark:text-[var(--color-400)] font-medium">Workspace v1.0</p>
                    </div>
                </div>

                <div class="space-y-1">
                    <div
                        v-for="(item, i) in ['Dashboard', 'Projects', 'Analytics', 'Settings']"
                        :key="item"
                        class="px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-3 transition-colors cursor-pointer"
                        :class="i === 0 ? 'bg-[var(--color-100)] dark:bg-[var(--color-900)] text-[var(--color-700)] dark:text-[var(--color-300)]' : 'text-[var(--color-600)] dark:text-[var(--color-400)] hover:bg-[var(--color-100)]/50 dark:hover:bg-[var(--color-900)]/50'"
                    >
                        <div class="w-4 h-4 rounded bg-current opacity-20"></div>
                        {{ item }}
                    </div>
                </div>

                <div class="mt-auto space-y-4">
                    <div class="p-4 rounded-xl bg-[var(--color-600)] text-[var(--color-50)] space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-[10px] font-bold uppercase tracking-wider">Storage</span>
                            <span class="text-[10px] font-bold">85%</span>
                        </div>
                        <div class="h-1.5 w-full bg-[var(--color-50)]/20 rounded-full overflow-hidden">
                            <div class="h-full bg-[var(--color-50)] w-[85%]"></div>
                        </div>
                        <p class="text-[10px] opacity-80 leading-tight">You're almost out of space. Upgrade your plan now.</p>
                    </div>

                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-[var(--color-200)] dark:bg-[var(--color-800)] border border-[var(--color-300)] dark:border-[var(--color-700)]"></div>
                        <div class="flex-1">
                            <p class="text-xs font-bold text-[var(--color-950)] dark:text-[var(--color-50)]">Laura Sofia</p>
                            <p class="text-[10px] text-[var(--color-600)] dark:text-[var(--color-400)]">Pro Plan</p>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="text-[var(--color-400)]"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div
        v-else
        class="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-30 grayscale pointer-events-none select-none min-h-[400px]"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            <path d="M19 3v4" />
            <path d="M21 5h-4" />
        </svg>
        <p class="text-sm font-medium mt-4 tracking-wide uppercase">Select a palette to preview components</p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ColorSet } from '@/colorpalette';

const props = defineProps<{
    set?: ColorSet;
}>();

const cssVars = computed(() => {
    if (!props.set) return {};
    const vars: Record<string, string> = {};
    for (const [step, color] of Object.entries(props.set.palette)) {
        vars[`--color-${step}`] = color;
    }
    return vars;
});
</script>

<style lang="scss" scoped>
.section-preview {
    @apply flex flex-col gap-6 py-6 animate-in fade-in slide-in-from-bottom-4 duration-1000;
}
</style>
