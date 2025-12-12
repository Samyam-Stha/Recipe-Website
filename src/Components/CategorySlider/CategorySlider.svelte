<script lang="ts">
	import { area } from '../../Store/Form.ts';
	import { selectedArea } from '../../Store/Recipe.ts';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	function SelectArea(areaName: string) {
		selectedArea.set(areaName);
	}
</script>

<div class="categorySlider flex overflow-auto gap-3">
	<Badge
		variant={$selectedArea === 'All' ? 'default' : 'outline'}
		class={`w-20 h-10 ${$selectedArea === 'All' ? 'bg-emerald-600 text-white font-bold' : 'bg-white text-emerald-600 cursor-pointer font-bold'}`}
		onclick={() => SelectArea('All')}
	>
		All
	</Badge>

	{#each $area as a}
		<Badge
			variant={$selectedArea === a.strArea ? 'default' : 'outline'}
			class={`w-20 h-10 ${
				$selectedArea === a.strArea
					? 'bg-emerald-600 text-white font-bold'
					: 'bg-white text-emerald-600 cursor-pointer font-bold'
			}`}
			onclick={() => SelectArea(a.strArea)}
		>
			{a.strArea}
		</Badge>
	{/each}
</div>

<style>
	.categorySlider::-webkit-scrollbar {
		display: none;
	}
</style>
