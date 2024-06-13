<template>
    <div style="margin: 1rem;">
        <v-card>
            <v-toolbar color="primary" title="数据结构与算法游戏平台">
            </v-toolbar>
            <v-tabs v-model="tab" color="primary" v-if="mobile">
                <v-tab prepend-icon="mdi-account" text="八皇后" value="eight-queens"></v-tab>
                <v-tab prepend-icon="mdi-account" text="最长子串" value="longest-subsequence"></v-tab>
                <v-tab prepend-icon="mdi-account" text="背包问题" value="bag"></v-tab>
            </v-tabs>
            <div class="d-flex flex-row">
                <v-tabs v-model="tab" color="primary" direction="vertical" v-if="!mobile">
                    <v-tab prepend-icon="mdi-account" text="八皇后" value="eight-queens"></v-tab>
                    <v-tab prepend-icon="mdi-account" text="最长子串" value="longest-subsequence"></v-tab>
                    <v-tab prepend-icon="mdi-account" text="背包问题" value="bag"></v-tab>
                </v-tabs>
                <v-tabs-window v-model="tab">
                    <div class="game-container">
                        <v-tabs-window-item value="eight-queens">
                            <EightQueens />
                        </v-tabs-window-item>
                        <v-tabs-window-item value="longest-subsequence">
                            <LongestSubsequence />
                        </v-tabs-window-item>
                        <v-tabs-window-item value="bag">
                            <Bag />
                        </v-tabs-window-item>
                    </div>
                </v-tabs-window>
            </div>
        </v-card>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import EightQueens from '../games/eight-queens.vue';
    import LongestSubsequence from '../games/longest-subsequence.vue';
    import Bag from '../games/bag.vue';

    const tab = ref('eight-queens');
    const mobile = ref(false);
    const router = useRouter();
    onMounted(() => {
        const tabQ = router.currentRoute.value.query?.tab;
        const value = tabQ ? tabQ : 'eight-queens';
        tab.value = value as string;

        mobile.value = Boolean(window.innerWidth < 768);
        window.addEventListener('resize', () => {
            mobile.value = Boolean(window.innerWidth < 768)
        });
    })

    onUnmounted(() => {
        window.removeEventListener('resize', () => {
            mobile.value = Boolean(window.innerWidth < 768)
        });
    })


</script>

<style scoped>
    .game-container {
        width: 100%;
        height: 86vh;
        overflow: auto;

    }

    .game-container::-webkit-scrollbar {
        width: 0;
    }
</style>