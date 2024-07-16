<script setup lang="ts">
import type { ErrorResponse, PaginationParams, Photo, PhotosWithTotalResults } from 'pexels';
import { initClient, searchPhotos } from '~/utils/api/pexels.service';
import { DotLoader } from 'vue3-spinner';

const query = ref('');
let oldQuery:string | undefined;
const searching = ref(false);
const mounted = ref(false);
const currentPage = ref(1);
const totalResults = ref(0);

const runtimeConfig = useRuntimeConfig();
initClient(runtimeConfig.public.pexelsApiKey);

const photos = ref<Photo[]>([]);

onMounted(() => {
	mounted.value = true;
	registerScroll();
})

function registerScroll () {
    window.addEventListener('scroll', () => {
		if (query.value) {
			let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

			if (bottomOfWindow && !searching.value && !(photos.value.length === totalResults.value)) {
				currentPage.value++;
				performSearch();
			}
		}
	});
};

function performSearch () {
	if (query.value !== '') {
		if ((query.value !== oldQuery) && oldQuery !== '' ) {
			resetRefs();
			oldQuery = query.value;
		} else if (oldQuery === '') {
			oldQuery = query.value;
		}

		searching.value = true;
		const params: PaginationParams & { query: string }  = {
			page: currentPage.value,
			query: String(query.value),
			per_page: 30,
		};
		searchPhotos(params)
			.then((res: PhotosWithTotalResults | ErrorResponse) => {
				if ('photos' in res) {
					photos.value = [...photos.value, ...res.photos];
					totalResults.value = res.total_results;
					searching.value = false;
				}
			})
	}
};

const debounceSearch = () => {
	if (query.value !== '') {
		debounce(performSearch);
	} else {
		resetRefs();
	}
}

const resetRefs = () => {
	photos.value = [];
	currentPage.value = 1;
	totalResults.value = 0;
};

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
		
		<masonry-wall v-if="photos.length" :items="photos" :ssr-columns="1" :column-width="300" :gap="16">
			<template #default="{ item, index }">
				<Photo class="item" :photo="item"></Photo>
			</template>
		</masonry-wall>
		<masonry-wall v-if="!photos.length && searching" :items="Array(50).fill(0)" :ssr-columns="1" :column-width="300" :gap="16">
			<template #default="{ item, index }">
				<SkeletonLoader class="item" />
			</template>
		</masonry-wall>

		<div class="m-auto my-4" v-if="photos.length && searching">
			<ClientOnly>
				<DotLoader />
			</ClientOnly>
		</div>
	</div>
	<ClientOnly>
		<FloatingButton></FloatingButton>
	</ClientOnly>
</template>

<style lang="css">

.no-photos {
	margin: 0 auto;
	@apply text-slate-600;
}
</style>