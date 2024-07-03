<script setup lang="js">
const model = defineModel();
</script>

<template>
    <input class="px-4 py-2 border-2 border-gray-400 rounded-xl text-lg" type="text" v-model="model"
        placeholder="Search for any topic that you would like (Nature, Tigers, People)">
</template>