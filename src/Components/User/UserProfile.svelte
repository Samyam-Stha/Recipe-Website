<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
</script>

<section>
	<div class="mt-10 flex items-center gap-6">
		<Avatar.Root class="w-30 h-30">
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<div class="flex flex-1 justify-around">
			<div class="flex flex-col justify-center items-center">
				<h1 class="text-gray-500">My Recipe</h1>
				<h1 class="font-bold text-xl">4</h1>
			</div>
			<div class="flex flex-col justify-center items-center">
				<h1 class="text-gray-500">Saved</h1>
				<h1 class="font-bold text-xl">7</h1>
			</div>
		</div>
	</div>
</section>
