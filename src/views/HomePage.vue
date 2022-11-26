<template>
    <MainLayout>
        <section class="bg-primary">
            <div class="flex w-full pt-10 justify-between">
                <div class="flex gap-8 px-4">
                    <div class="w-8 h-8 bg-th-white rounded opacity-30"></div>
                    <div class="w-8 h-8 bg-th-white rounded opacity-10"></div>
                </div>

                <div class="flex gap-8 px-4">
                    <div class="w-8 h-8 bg-th-white rounded opacity-5"></div>
                    <div class="w-8 h-8 bg-th-white rounded opacity-30"></div>
                    <div class="w-8 h-8 bg-th-white rounded opacity-10"></div>
                    <div class="w-8 h-8 bg-th-white rounded opacity-30"></div>
                </div>
            </div>
            <div class="flex w-full justify-between">
                <div class="flex gap-8 px-12">
                    <div class="w-8 h-8 bg-th-white rounded opacity-10"></div>
                </div>

                <div class="flex gap-8 px-12">
                    <div class="w-8 h-8 bg-th-white rounded opacity-5"></div>
                    <div class="w-8 h-8 bg-th-white rounded opacity-10"></div>
                    <div class="w-8 h-8 bg-th-white rounded opacity-5"></div>
                </div>
            </div>
            <div class="flex w-full justify-between">
                <div class="flex gap-8 px-4">
                    <div class="w-8 h-8 bg-th-white rounded opacity-30"></div>
                </div>

                <div class="flex gap-8 px-4">
                    <div class="w-8 h-8 bg-th-white rounded opacity-30"></div>
                </div>
            </div>
            <h1 class="w-full text-th-white text-7xl font-normal text-center pb-8">Sudoku</h1>
        </section>

        <section>
            <div class="text-center my-14 font-normal text-sm text-th-black tracking-wide">
                To place a number in a <b>square click and type the number on your keyboard</b>.
            </div>
        </section>
        <section class="text-center">
            <RouterLink :to="{ name: 'GamePage' }">
                <DefaultButton>PLAY</DefaultButton>
            </RouterLink>
        </section>
    </MainLayout>
</template>

<script setup lang="ts">
    import MainLayout from "../layouts/MainLayout.vue"
    import { RouterLink } from "vue-router";
    import DefaultButton from "../components/DefaultButton.vue";
</script>