<template>
    <div class="container">

        <div class="content">
            <v-card class="card">
                <!-- a.
                背包问题
                交互：玩家需要从⼀些具有不同价值和重量的物品中选择⼀些放入背包中，使得背包中物品的总价值最
                ⼤，同时不超过背包的承重限制。
                b.
                c.
                界⾯设计参考：设计⼀个数字输入框，⽤于输入物品的重量和价值，⼀个显示背包承重的区域，以及⼀
                个显示最优解的区域。同时，需要⼀个区域显示当前的游戏局⾯，即物品的重量和价值，以及背包的承重。
                游戏局⾯数据⽣成/设计要求：⽣成⼀系列的物品，每个物品都有重量和价值，以及⼀个背包的承重。
                d.
                游戏答案⽣成要求：应⽤动态规划算法，在物品中选择总重不超过背包承重的物品，使得总价值最⼤。 -->
                <v-card-title>
                    <span style="font-size: 1.5rem; font-weight: bold;">
                        背包问题
                    </span>
                </v-card-title>
                <v-card-subtitle>
                    玩家需要从⼀些具有不同价值和重量的物品中选择⼀些放入背包中，使得背包中物品的总价值最
                    ⼤，同时不超过背包的承重限制。
                </v-card-subtitle>
                <div v-if="isShow">
                    <v-card-title>输入您的物品数量与背包承重</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="6">
                                <v-number-input reverse controlVariant="split" label="物品数量" :hideInput="false"
                                    v-model.number="thingsNumber"></v-number-input>
                            </v-col>
                            <v-col cols="6">
                                <v-number-input reverse controlVariant="split" label="背包承重" :hideInput="false"
                                    v-model.number="bagWeight"></v-number-input>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <!-- 
                        按照物品数量
                        输入每个物品的重量和价值
                    -->
                    <v-card-title>输入每个物品的重量和价值</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col v-for="index in thingsNumber" :key="index" cols="2">
                                <v-text-field v-model.number="things[index - 1].weight" :label="'物品' + index + '重量'"
                                    outlined></v-text-field>
                                <v-text-field v-model.number="things[index - 1].value" :label="'物品' + index + '价值'"
                                    outlined></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <!-- 
                        提交答案
                    -->
                    <v-card-actions class="d-flex justify-end">
                        <v-btn color="primary" @click="generateQuestion">生成题目</v-btn>
                    </v-card-actions>
                </div>
                <div v-else>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-card class="text-center" color="primary" dark>
                                    <v-card-title>背包承重</v-card-title>
                                    <v-card-text>{{ bagWeight }}</v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-title>当前物品重量和价值</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col v-for="index in thingsNumber" :key="index" cols="2">
                                <v-card class="text-center " color="primary" dark>
                                    <v-card-title>物品{{ index }}</v-card-title>
                                    <v-card-text>
                                        <div>
                                            重量:{{ things[index - 1].weight }}
                                        </div>
                                        <div>
                                            价值:{{ things[index - 1].value }}
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-title>请输入答案</v-card-title>
                    <v-card-text>
                        <v-text-field outlined v-model.number="answer"></v-text-field>
                    </v-card-text>
                    <!-- 
                        提交答案
                    -->
                    <v-card-actions class="d-flex justify-end">
                        <v-btn color="primary" @click="comfirmAnswer">提交答案</v-btn>
                        <v-btn color="primary" @click="clear">重新开始</v-btn>
                        <v-btn color="primary" @click="showAnswer">查看答案</v-btn>
                    </v-card-actions>
                </div>
            </v-card>
        </div>

    </div>
</template>

<script setup lang="ts">
    import { ref, computed, watch } from 'vue';
    import { useToast } from "vue-toastification";
    import { findMaxValue } from '../strategy/findMaxValue';

    const isShow = ref(true);
    const thingsNumber = ref<number>();
    const bagWeight = ref<number>();
    const things = ref<Array<{ weight: number, value: number }>>([]);
    const result = ref<number>();
    const answer = ref<number>();
    watch(() => thingsNumber.value, (newVal) => {
        things.value = Array.from({ length: newVal }, () => ({ weight: 0, value: 0 }));
    });
    const toast = useToast();
    const comfirmAnswer = () => {
        if (comfirmInput()) {
            result.value = findMaxValue(thingsNumber.value!, bagWeight.value!, things.value.map(thing => thing.weight), things.value.map(thing => thing.value));
            if (result.value === answer.value) {
                toast.success('恭喜你，答案正确');
            } else {
                toast.error('很遗憾，答案错误');
            }
        }
    }
    const generateQuestion = () => {
        if (!comfirmInput(true)) {
            return;
        }
        isShow.value = false;
    }
    function comfirmInput(flag = true) {
        if (!thingsNumber.value || !bagWeight.value) {
            toast.error('请填写物品数量和背包承重');
        } else if (things.value.some(thing => !thing.weight || !thing.value)) {
            toast.error('请填写物品的重量和价值');
        } else if (!answer.value && flag) {
            toast.error('请填写答案');
        } else {
            return true;
        }
        return false;
    }
    const clear = () => {
        isShow.value = true;
        thingsNumber.value = undefined;
        bagWeight.value = undefined;
        things.value = [];
        result.value = undefined;
        answer.value = undefined;
        toast.clear();
    }
    const showAnswer = () => {
        if (!comfirmInput(false)) return;
        result.value = findMaxValue(thingsNumber.value!, bagWeight.value!, things.value.map(thing => thing.weight), things.value.map(thing => thing.value));
        toast.info(`最大价值为${result.value}`);
    }
</script>

<style scoped>
    .container {
        display: flex;
        height: 100vh;
        justify-content: center;
        align-items: center;
        width: 85vw;
        flex-direction: column;
    }

    .content {
        width: 100%;
        padding: 1rem;
        margin-left: 1rem;
        height: 95vh;
    }

    .card {
        display: flex;
        flex-direction: column;
    }

    .row-number {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>