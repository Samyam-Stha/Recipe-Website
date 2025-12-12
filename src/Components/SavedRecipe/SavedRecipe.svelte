<script lang="ts">
	import { meals, fetchMeals } from '../../Store/Recipe.ts';
	import { onMount } from 'svelte';
	import SavedCard from './SavedCard.svelte';
	onMount(async () => {
		await fetchMeals('');
	});
</script>

<div class="p-10 ">
	<div class="flex w-full flex-col gap-8 md:grid md:grid-cols-3">
		{#each $meals as meal (meal.idMeal)}
			<button>
				<SavedCard {meal} />
			</button>
		{/each}
	</div>
</div>
