<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { initMiniApp } from '../../utils/miniappInitializer.ts';

	export let handleLoginWrapper;
	export let loggingIn: boolean = false;

	let email = '';
	let password = '';

	onMount(() => {
		initMiniApp;
	});

	// const handleSubmit = (e: Event) => {
	// 	e.preventDefault();
	// 	console.log({ email, password });

	// 	goto('/');
	// };
</script>

<main class=" bg-[#f8f8f8] flex justify-center h-dvh items-center">
	<div></div>
	<section class="w-full max-w-sm px-6 pt-10 pb-8 flex flex-col justify-around">
		<div class="mb-10">
			<h1 class="font-bold text-2xl">Hello!</h1>
			<h1 class=" text-2xl">Welcome Back</h1>
		</div>

		<form class="space-y-6">
			<div class="space-y-2">
				<label for="email" class="text-sm font-medium text-gray-800"> Email </label>
				<input
					id="email"
					type="email"
					bind:value={email}
					placeholder="Enter Email"
					class="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
				/>
			</div>

			<div class="space-y-2">
				<label for="password" class="text-sm font-medium text-gray-800"> Enter Password </label>
				<input
					id="password"
					type="password"
					bind:value={password}
					placeholder="Enter Password"
					class="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
				/>
			</div>

			<div class="flex justify-between">
				<div>
					<input type="checkbox" /> Remember Me
				</div>
				<button type="button" class="text-xs font-medium text-[#F6A623] hover:underline">
					Forgot Password?
				</button>
			</div>

			<button
				disabled={loggingIn}
				type="submit"
				class="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0C9B59] py-3 text-sm font-semibold text-white shadow-md hover:bg-[#0a7f48] transition-colors"
			>
				<span>Sign In</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
				</svg>
			</button>
		</form>

		<div class="mt-8 flex items-center gap-3 text-xs text-gray-400">
			<div class="h-px flex-1 bg-gray-200"></div>
			<span>Or Sign in With</span>
			<div class="h-px flex-1 bg-gray-200"></div>
		</div>

		<div class="mt-5 flex items-center justify-center gap-4">
			<button
				disabled={loggingIn}
				type="button"
				class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md"
				on:click={() => {
					handleLoginWrapper();
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width="24"
					height="24"
					viewBox="0 0 48 48"
				>
					<path
						fill="#FFC107"
						d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
					></path><path
						fill="#FF3D00"
						d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
					></path><path
						fill="#4CAF50"
						d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
					></path><path
						fill="#1976D2"
						d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
					></path>
				</svg>
			</button>

			<button
				type="button"
				class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md"
			>
				<div class="flex h-7 w-7 items-center justify-center rounded-full bg-[#1877F2]">
					<span class="text-base font-semibold text-white">f</span>
				</div>
			</button>
		</div>

		<p class="mt-10 text-center text-xs text-gray-500">
			Don’t have an account?
			<a href="/signup" class="font-semibold text-[#F6A623] hover:underline"> Sign up </a>
		</p>
	</section>
</main>
