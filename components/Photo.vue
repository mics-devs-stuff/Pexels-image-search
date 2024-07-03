<script setup lang="ts">
import type { Photo } from 'pexels';

defineProps<{
  photo: Photo;
}>();

function goToExternalLink(url: string) {
    window.open(url, '_blank');
}

function getTextColor(backgroundColor: string) {
    const color = backgroundColor.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return (brightness > 125) ? 'black' : 'white';
}

</script>

<template>
    <div class="photo-card">
        <img :src="photo.src.medium" :alt="photo?.alt ?? undefined" class="image" @click="goToExternalLink(photo.url)">
        <div class="photographer" :style="{ background: photo?.avg_color ?? ''}" @click="goToExternalLink(photo.photographer_url)">
            <span 
                :class="[
                    'photographer-name',
                    getTextColor((photo?.avg_color ?? '#FFFFFF')) === 'black' ? 'text-black' : 'text-white']
                "
            >
                {{ photo.photographer }}
            </span>
            <ArrowRightIcon class="icon"></ArrowRightIcon>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.photo-card {
    @apply flex flex-col cursor-pointer hover:-translate-y-2 transition-all gap-2;
    .image {
        @apply rounded-lg transition-all;;
    }
    .photographer {
        &:hover {
            @apply brightness-125 opacity-100;
            .icon {
                animation: moveRightAndBack 1s ease-in-out;
            }
        }
        @apply p-4 text-white flex justify-between transition-all rounded-lg opacity-75;
    }
}

@keyframes moveRightAndBack {
    0% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(50px); /* Adjust this value as needed */
    }
    100% {
        transform: translateX(-50px); /* Adjust this value as needed */
    }
}
</style>