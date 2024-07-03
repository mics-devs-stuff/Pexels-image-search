<script setup lang="js">
const model = defineModel({ type: String });

const clearSearch = () => model.value = '';
</script>

<template>
    <div class="search-bar">
        <input type="text" v-model="model"
            class="search-input"
            placeholder="Search for any topic that you would like (Nature, Tigers, People)">
        <SearchIcon class="search-icon"></SearchIcon>
        <span class="clear-icon p-1" @click="clearSearch()"  v-if="model">
            <XIcon></XIcon>
        </span>
    </div>
</template>

<style lang="scss">
.search-bar {
    position: relative;
    @apply px-3;

    .search-input {
        @apply px-12 py-3 border-2 border-gray-400 rounded-xl text-lg w-full;
    }
    .search-input:focus {
        @apply border-emerald-500;
    }
    .search-icon {
        @apply text-lg;
        position: absolute;
        left: 1.5rem;
        top: 1rem;
    }

    .clear-icon {
        @apply text-lg transition-colors;
        cursor: pointer;
        position: absolute;
        right: 1.5rem;
        top: .8rem;
    }

    .clear-icon:hover {
        @apply text-emerald-800 bg-emerald-50 transition-colors rounded-full;
    }

    .clear-icon:active {
        @apply text-emerald-600;
    }
}
</style>