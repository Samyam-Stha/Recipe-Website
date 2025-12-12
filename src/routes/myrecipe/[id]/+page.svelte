<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import * as Avatar from '$lib/components/ui/avatar/index.js';

	const id = page.params?.id;

	type Ingredient = {
		name: string;
		measure: string;
	};

	type Meal = {
		idMeal: string;
		strMeal: string;
		strCategory: string;
		strArea: string;
		strInstructions: string;
		strMealThumb?: string;
		strTags?: string;
		strYoutube?: string;
		ingredients: Ingredient[];
	};

	let mealData: Meal | null = null;
	let loading = false;

	let db: IDBDatabase;

	function openDB() {
		return new Promise<IDBDatabase>((resolve, reject) => {
			const request = indexedDB.open('recipesDB', 1);

			request.onupgradeneeded = () => {
				const db = request.result;
				if (!db.objectStoreNames.contains('recipes')) {
					db.createObjectStore('recipes', { keyPath: 'idMeal' });
				}
			};

			request.onsuccess = () => {
				db = request.result;
				resolve(db);
			};

			request.onerror = () => reject(request.error);
		});
	}

	function fetchRecipeById(id: string) {
		return new Promise<Meal | null>((resolve, reject) => {
			const tx = db.transaction('recipes', 'readonly');
			const store = tx.objectStore('recipes');
			const request = store.get(id);

			request.onsuccess = () => resolve(request.result || null);
			request.onerror = () => reject(request.error);
		});
	}

	async function fetchRecipeDetail() {
		loading = true;
		try {
			await openDB();
			const res = await fetchRecipeById(id!);
			mealData = res;

			if (mealData) {
				mealData.ingredients = mealData.ingredients || [];
				mealData.strInstructions = mealData.strInstructions || '';
			}
		} catch (err) {
			console.error('Recipe detail fetch error', err);
		} finally {
			loading = false;
			console.log(mealData?.strInstructions);
		}
	}

	onMount(() => {
		fetchRecipeDetail();
	});

	let totalIngredient = '0';
	let selected = 'Ingredient';

	function selectedTerm(Name: string) {
		selected = Name;
	}
</script>

{#if loading}
	<p>Loading meal...</p>
{:else if mealData}
	<section class="detailbox p-8 flex flex-col gap-2">
		<div class="flex justify-between mb-6">
			<h1 class="font-bold">&lt;-</h1>
			<h1 class="font-bold">...</h1>
		</div>
		<div
			class="detailscontent rounded-xl w-full h-[150px] bg-center bg-cover bg-no-repeat"
			style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url({mealData.strMealThumb});"
		></div>
		<div class="flex flex-col gap-4">
			<div class="flex justify-between">
				<h1 class="font-bold text-xl">{mealData.strMeal}</h1>
				<h1 class="text-gray-400">(13k Reviews)</h1>
			</div>

			<div class=" flex gap-3 items-center justify-between mb-5">
				<div class="flex gap-3 items-center">
					<Avatar.Root class="w-15 h-15">
						<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
					<div>
						<h1 class="font-bold">Some Name</h1>
						<h1>Some, Place</h1>
					</div>
				</div>
				<button
					class="border-none outline-none bg-emerald-600 text-white h-10 w-20 text-center rounded-xl"
					>Follow</button
				>
			</div>

			<!-- <div>
				<p>Category: {mealData.strCategory}</p>
				<p>Area: {mealData.strArea}</p>
			</div> -->
		</div>

		<section>
			<div class="flex w-full gap-4">
				<button
					class={`flex-1 border-none outline-non h-10 w-20 text-center rounded-xl ${selected === 'Ingredient' ? ' bg-emerald-600 text-white' : 'bg-white text-emerald-600'}`}
					onclick={() => selectedTerm('Ingredient')}>Ingredients</button
				>
				<button
					class={`flex-1 border-none outline-non h-10 w-20 text-center rounded-xl ${selected === 'Procedure' ? ' bg-emerald-600 text-white' : 'bg-white text-emerald-600'}`}
					onclick={() => selectedTerm('Procedure')}>Procedures</button
				>
			</div>
		</section>

		{#if selected === 'Ingredient'}
			<div class="flex justify-between">
				<h1 class="text-gray-500">1 serve</h1>
				<h1 class="text-gray-500">{totalIngredient} Items</h1>
			</div>
			<div class="instructionbox">
				<div class="ingredients">
					<div class="flex flex-col gap-5">
						{#each mealData.ingredients as item, index}
							<div class="flex flex-row border-2 justify-between p-5 rounded-xl bg-gray-200">
								<h1 class="font-bold">{item.name}</h1>
								<h1 class="text-gray-500">{item.measure}</h1>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{:else}
			<div class="flex justify-between">
				<h1 class="text-gray-500">1 serve</h1>
				<h1 class="text-gray-500">{totalIngredient} Items</h1>
			</div>
			<div>
				<div class="instructions">
					<div class="flex flex-col gap-3">
						<!-- {#each mealData.strInstructions as step, index} -->
						<div class="bg-gray-200 rounded-xl p-5 text-justify flex flex-col gap-2">
							<h1 class="font-bold">{mealData.strInstructions}</h1>
						</div>
						<!-- {/each} -->
					</div>
				</div>
			</div>
		{/if}
	</section>
{:else}
	<p>No meal found for this ID.</p>
{/if}
