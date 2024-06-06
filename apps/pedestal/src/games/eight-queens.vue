<template>
    <div class="body">
        <div class="container">
            <div class="board" v-for="boardId in ['board1', 'board2']" :key="boardId">
                <div class="cell" v-for="(cell, index) in 64" :key="index"
                    :id="`cell-${boardId}-${Math.floor(index / 8)}-${index % 8}`"
                    @click="toggleQueen(Math.floor(index / 8), index % 8, boardId)">
                    <span class="queen" v-if="isQueenPlaced(Math.floor(index / 8), index % 8, boardId)">&#9813;</span>
                </div>
            </div>
            <div class="buttons-container">
                <button @click="startGame">开始</button>
                <button @click="checkSolution">验证答案</button>
                <button @click="showSolution">查看答案</button>
            </div>
        </div>
        <div v-if="showAnswerText" :style="showAnswerStyle" v-html="showAnswerText" />
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const queens = ref([]);
    const correctSolutions = generateAllSolutions();
    const selectedSolution = ref(null);
    const initialQueensPlaced = ref(false);
    const showAnswerText = ref('');
    const showAnswerStyle = 'position: absolute; top: 25px; left: 50%; transform: translateX(-40%); padding: 10px; background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 5px; font-size: 20px; text-align: center;';

    function toggleQueen(row, col, boardId) {
        if (initialQueensPlaced.value) {
            const index = queens.value.findIndex(q => q[0] === row && q[1] === col && q[2] === boardId);
            if (index === -1) {
                queens.value.push([row, col, boardId]);
            } else {
                queens.value.splice(index, 1);
            }
        }
    }

    function clearBoard(boardId) {
        queens.value = queens.value.filter(q => q[2] !== boardId);
    }

    function startGame() {
        clearBoard('board1');
        clearBoard('board2');
        selectedSolution.value = correctSolutions[Math.floor(Math.random() * correctSolutions.length)];
        // Display the initial queens on board1
        selectedSolution.value.slice(0, 2).forEach(queen => queens.value.push([...queen, 'board1']));
        initialQueensPlaced.value = true;
        showAnswerText.value = '';
    }

    function checkSolution() {
        const userAndInitialQueens = [...queens.value, ...selectedSolution.value.slice(0, 2).map(queen => [...queen, 'board1'])];
        const isValid = correctSolutions.some(solution =>
            arraysEqualIgnoreOrder(userAndInitialQueens.map(q => q.slice(0, 2)), solution)
        );
        showAnswerText.value = isValid ? "答案正确！<div style='color: green'>恭喜你！</div>" : "答案错误！<div style='color: red'>请再试一次！</div>";
    }

    function showSolution() {
        clearBoard('board2');
        selectedSolution.value.forEach(queen => queens.value.push([...queen, 'board2']));
        showAnswerText.value = '';
    }

    function isQueenPlaced(row, col, boardId) {
        return queens.value.some(q => q[0] === row && q[1] === col && q[2] === boardId);
    }

    function generateAllSolutions() {
        const solutions = [];
        const solution = [];

        function isSafe(row, col) {
            for (let i = 0; i < solution.length; i++) {
                const [prevRow, prevCol] = solution[i];
                if (prevRow === row || prevCol === col || Math.abs(prevRow - row) === Math.abs(prevCol - col)) {
                    return false;
                }
            }
            return true;
        }

        function placeQueen(row) {
            if (row === 8) {
                solutions.push(solution.slice());
                return;
            }
            for (let col = 0; col < 8; col++) {
                if (isSafe(row, col)) {
                    solution.push([row, col]);
                    placeQueen(row + 1);
                    solution.pop();
                }
            }
        }

        placeQueen(0);
        return solutions;
    }



    function arraysEqualIgnoreOrder(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        const sortedArr1 = arr1.slice().sort();
        const sortedArr2 = arr2.slice().sort();
        for (let i = 0; i < arr1.length; i++) {
            if (sortedArr1[i][0] !== sortedArr2[i][0] || sortedArr1[i][1] !== sortedArr2[i][1]) {
                return false;
            }
        }
        return true;
    }
    // generateAllSolutions, arraysEqualIgnoreOrder 等函数的实现保持不变
</script>
<style scoped>
    .body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        width: 100vw;
        background: linear-gradient(to bottom right, #ffcccc, #99f6ff);
        /* @media (max-width: 768px){
            
        } */

    }


    .container {
        display: flex;
        align-items: center;
    }

    .board {
        display: grid;
        grid-template-columns: repeat(8, 3rem);
        grid-template-rows: repeat(8, 3rem);
        gap: 1px;
        border: 1px solid black;
        padding: 5px;
    }

    .cell {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
    }

    .cell:nth-child(odd) {
        background-color: #b58863;
    }

    .cell:nth-child(even) {
        background-color: #d8c9a1;
    }

    .queen {
        font-size: 24px;
        position: absolute;
    }

    .buttons-container {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .buttons-container button {
        margin-bottom: 10px;
        padding: 8px 16px;
        font-size: 16px;
    }
</style>