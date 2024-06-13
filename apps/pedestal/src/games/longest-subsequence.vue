<template>
    <div class="container">
        <!-- 最⼤⼦序列和问题
        交互：玩家需要从⼀系列的数字中找出和最⼤的⼦序列。
        界⾯设计参考：设计⼀个简单的输入框，⽤于输入⼀系列的数字，以及⼀个显示结果的区域。同时，需
        要⼀个区域显示当前的游戏局⾯，即⼀系列的数字。
        c.
        游戏局⾯数据⽣成/设计要求：⽣成⼀系列的数字，数字的数量和⼤⼩应在⼀定范围内。
        d.
        游戏答案⽣成要求：应⽤动态规划算法，找出和最⼤的⼦序列 -->
        <div class="content">
            <v-card class="card">
                <!-- title="最⼤⼦序列和" subtitle="玩家需要从⼀系列的数字中找出和最⼤的⼦序列" -->
                <v-card-title>
                    <span style="font-size: 1.5rem; font-weight: bold;">
                        最⼤⼦序列和
                    </span>
                </v-card-title>
                <v-card-subtitle>玩家需要从⼀系列的数字中找出和最⼤的⼦序列</v-card-subtitle>
                <v-card-title>输入您的数字</v-card-title>
                <v-card-text>
                    <v-text-field v-model="numbers" label="请输入数字，用空格隔开" outlined></v-text-field>
                </v-card-text>
                <div class="row-number" v-if="formattedNumbers.length !== 0">
                    <v-col v-for="number in formattedNumbers" :key="number" cols="1">
                        <v-card class="text-center" color="primary" dark>
                            <v-card-title>{{ number }}</v-card-title>
                        </v-card>
                    </v-col>
                </div>
                <!-- 
                    输入答案
                -->
                <v-card-title>答案</v-card-title>
                <v-card-text>
                    <v-text-field label="请输入您的答案" outlined v-model.number="answer"></v-text-field>
                </v-card-text>

                <!-- 
                    提交答案
                -->
                <v-card-actions class="d-flex justify-end">
                    <v-btn color="primary" @click="comfirmAnswer">提交答案</v-btn>
                    <v-btn color="primary" @click="clear">重新开始</v-btn>
                    <v-btn color="primary" @click="showAnswer">查看答案</v-btn>
                </v-card-actions>

            </v-card>
        </div>

    </div>
</template>
<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { useToast } from "vue-toastification";
    import { findMaxSubsequenceSum } from '../strategy/findMaxSubsequenceSum';

    const numbers = ref<string>('');
    const answer = ref<number>();
    const result = ref<number>();
    const formattedNumbers = computed(() => {
        const nums = numbers.value.split(' ').filter(num => num !== '').map(Number);
        return nums;
    });
    const toast = useToast();

    const calculate = () => {
        // const wasmUrl = '/longest-subsequence.wasm';
        // try {
        //     // const response = await fetch(wasmUrl);
        //     // 通过instantiateStreaming加载 WebAssembly 模块
        //     const { instance } = await WebAssembly.instantiateStreaming(fetch(wasmUrl), {
        //         env: {
        //             memoryBase: 0,
        //             tableBase: 0,
        //             memory: new WebAssembly.Memory({ initial: 256 }),
        //             table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
        //         }
        //     });
        //     const { findMaxSubsequenceSum } = instance.exports;
        //     const nums = formattedNumbers.value;
        //     const buffer = new Int32Array(instance.exports.memory.buffer);
        //     const ptr = instance.exports.allocate(nums.length * 4);
        //     nums.forEach((num, index) => {
        //         buffer[ptr / 4 + index] = num;
        //     });
        //     const resultPtr = findMaxSubsequenceSum(ptr, nums.length);
        //     result.value = buffer[resultPtr / 4];
        //     instance.exports.deallocate(ptr, nums.length * 4);

        // } catch (error) {
        //     console.error('Error loading Wasm module:', error);
        //     toast.error('加载 WebAssembly 模块失败');
        // }

        const nums = formattedNumbers.value;
        result.value = findMaxSubsequenceSum(nums);
    };

    const clear = () => {
        numbers.value = '';
        answer.value = undefined;
        result.value = undefined;
        toast.clear();
    }
    const comfirmAnswer = () => {
        if (!comfirmInput()) {
            return;
        }
        calculate();
        if (result.value === answer.value) {
            toast.success('恭喜你，答对了');

        } else {
            toast.error('很遗憾，答错了');
        }

    }
    const showAnswer = () => {
        if (!comfirmInput(false)) {
            return;
        }
        calculate();
        toast.info(`正确答案是${result.value}`);
    }
    function comfirmInput(flag = true) {
        if (formattedNumbers.value.length === 0) {
            toast.error('请输入数字');
        }
        else if (!answer.value && flag) {
            toast.error('请输入答案');
        }
        return formattedNumbers.value.length !== 0 && (answer.value || !flag);
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