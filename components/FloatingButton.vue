<script setup lang="js">
const showButton = ref(false);

/**
 * Scrolls to the top of the page
 */
function scrollToTop() {
    window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
    });
}

onMounted(() => {
    window.addEventListener('scroll', checkScroll);
})


/**
 * Targets the window to see if is needed to hide the button
 */
function checkScroll() {
    if (document.scrollingElement) {
        if (document.scrollingElement?.scrollTop > 400) {
            showButton.value = true;
        } else if(showButton.value) {
            showButton.value = false;
        }
    }
}
</script>

<template>
    <button
        id="floating-button"
        type="button"
        @click="scrollToTop()"
        v-if="showButton"
    >
        <ChevronUpIcon/>
    </button>
</template>

<style lang="scss">
#floating-button{
    @apply p-4 bottom-28 right-14 text-white bg-emerald-800 shadow-lg hover:bg-emerald-600 transition-colors;
    display: flex;
    position: fixed;
    border-radius: 50%;
    z-index: 1000;
}
</style>