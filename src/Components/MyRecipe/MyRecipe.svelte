<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '../Card/Card.svelte';
	import { openDB, fetchRecipes } from '../../Store/MyRecipe.ts';
	import { savedRecipes } from '../../Store/MyRecipe.ts';
	import UserCard from '../User/UserCard.svelte';

	onMount(async () => {
		await openDB();
		const data: any = await fetchRecipes();
		savedRecipes.set(data);
	});
</script>

<div class="flex flex-col gap-6 md:grid md:grid-cols-2 ">
	{#if $savedRecipes.length > 0}
		{#each $savedRecipes as meal (meal.idMeal)}
			<UserCard {meal} routePrefix="myrecipe" />
		{/each}
	{:else}
		<p>No saved recipes yet!</p>
	{/if}
</div>
<!-- 
<style>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 20px;
		padding: 20px;
	}
</style> -->
