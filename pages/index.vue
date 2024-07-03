<script setup lang="ts">
import type { ErrorResponse, PaginationParams, Photo, PhotosWithTotalResults } from 'pexels';
import { initClient, searchPhotos } from '~/utils/api/pexels.service';
const query = defineModel();
const searching = ref(false);
const mounted = ref(false);
const currentPage = ref(1);

const runtimeConfig = useRuntimeConfig();
initClient(runtimeConfig.public.pexelsApiKey);

let photos = ref<Photo[]>([]);

let container: HTMLElement | null;

onMounted(() => {
	container = document.getElementById('masonryContainer');
	mounted.value = true;
})

function performSearch () {
	if (query.value !== '') {
	searching.value = true;
	const params: PaginationParams & { query: string }  = {
		page: currentPage.value,
		query: String(query.value),
		per_page: 30,
	};
	searchPhotos(params)
		.then((res: PhotosWithTotalResults | ErrorResponse) => {
			if ('photos' in res) {
				photos.value = res.photos;
			}
			
			imagesLoaded(container, () => {
				searching.value = false;
			});
		})
	}
};

const debounceSearch = () => {
	if (query.value !== '') {
		debounce(performSearch);
	} else {
		photos.value = [];
	}
}

</script>

<template>
	<div class="py-4 px-8 flex flex-col gap-4 pb-24">
		<Search
			v-model="query"
			@update:modelValue="debounceSearch"
		></Search>

		<div class="no-photos" v-if="photos.length === 0">
			<h5>Nothing to see here...try search for some other photos</h5>
		</div>
		<div id="masonryContainer">
			<masonry-wall v-if="searching" :items="Array(50).fill(0)" :ssr-columns="1" :column-width="300" :gap="16">
				<template #default="{ item, index }">
					<SkeletonLoader class="item" />
				</template>
			</masonry-wall>
			<masonry-wall v-if="photos.length && !searching" :items="photos" :ssr-columns="1" :column-width="300" :gap="16">
				<template #default="{ item, index }">
					<Photo class="item" :photo="item"></Photo>
				</template>
			</masonry-wall>
		</div>
	</div>
</template>

<style lang="css">

.no-photos {
	margin: 0 auto;
	@apply text-slate-600;
}
</style>