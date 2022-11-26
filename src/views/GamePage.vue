<template>
    <MainLayout>
        <section class="bg-primary h-72">
            <div class="w-auto mx-auto">
                <h1 class="text-center font-normal text-3xl text-th-white pt-10">Sudoku</h1>
            </div>
        </section>
        <section>
            <GameBoard />
        </section>
    </MainLayout>
</template>
<script setup lang="ts">
// import { ref } from "vue";
import MainLayout from "../layouts/MainLayout.vue"
import GameBoard from "../components/GameBoard.vue";

</script>