<template>
    <div style="margin: 1rem;">
        <v-card>
            <v-toolbar color="primary" title="数据结构与算法游戏平台">
            </v-toolbar>

            <div class="d-flex flex-row">
                <v-tabs v-model="tab" color="primary" direction="vertical">
                    <v-tab prepend-icon="mdi-account" text="八皇后" value="eight-queens"></v-tab>
                    <v-tab prepend-icon="mdi-lock" text="敬请期待" value="option-2"></v-tab>
                </v-tabs>
                <v-tabs-window v-model="tab">
                    <div class="game-container">
                        <v-tabs-window-item value="eight-queens">
                            <EightQueens />
                        </v-tabs-window-item>
                        <v-tabs-window-item value="option-2">
                        </v-tabs-window-item>
                    </div>
                </v-tabs-window>
            </div>
        </v-card>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import EightQueens from '../games/eight-queens.vue';

    const tab = ref('eight-queens');

    const router = useRouter();
    onMounted(() => {
        const { value } = router.currentRoute.value.params;
        if (value) {
            tab.value = value as string;
        }
        console.log(value);
    })

</script>

<style scoped>
    .game-container {
        width: 100%;
        height: 86vh;
    }
</style>