<script lang="ts">
	import './layout.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import '../app.css';
	import { House, Bookmark, Bell, User, Plus } from '@lucide/svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { onMount } from 'svelte';
	import { initMiniApp, handleLogin, handleLogout } from '../utils/miniappInitializer.ts';
	import LoginPage from '../Components/Login/LoginPage.svelte';
	// import { loggedIn } from '../Store/auth.ts';

	onMount(() => {
		initMiniApp();
		// const profile =
		// 	JSON.parse(localStorage.getItem('mini-app-profile') ?? '{}')?.user_profile ?? false;
		// loggedIn.set(!!profile);
	});

	const bottomNavs = [
		{ name: 'Home', icon: House, route: '/' },
		{ name: 'Saved Recipes', icon: Bookmark, route: '/saved-recipe' },
		{ name: 'Create Recipe', icon: Plus, route: '/recipe-form' },
		{ name: 'Notifications', icon: Bell, route: '/notifications' },
		{ name: 'Profile', icon: User, route: '/user' }
	];

	let loggedIn = $derived(
		JSON.parse(localStorage.getItem('mini-app-profile') ?? '{}')?.user_profile ?? false
	);

	function handleLoginWrapper() {
		handleLogin().then(() => {
			loggedIn.set(true);
		});
		loggedIn = true;
	}

	$effect(() => {
		console.log('is logged in', loggedIn);
	});

	function handleLogoutWrapper() {
		handleLogout().then(() => {
			loggedIn = false;
			goto('/');
			window.location.reload();
		});
	}

	let currentRoute = $derived(page.url.pathname);
	let currentTitle = $derived(bottomNavs.find((nav) => nav.route === currentRoute)?.name || '');
</script>

{#if !loggedIn}
	<LoginPage {handleLoginWrapper} />
	<!-- <button onclick={() => handleLogin()}>Login</button> -->
{:else}
	<nav class="navbar flex md:hidden bg-white">
		<ul
			class="navlinks flex justify-between items-center px-10 py-5 fixed bottom-0 left-0 z-50 bg-white w-full border-t-2"
		>
			{#each bottomNavs as nav}
				{#if nav.name === 'Create Recipe'}
					<li>
						<button class="bg-emerald-600 p-3 rounded-full" onclick={() => goto('/recipe-form')}>
							<Plus color="white" />
						</button>
					</li>
				{:else}
					{@const Icon = nav.icon}
					<li>
						<button
							onclick={() => goto(nav.route)}
							class={page.url.pathname === nav.route ? 'text-emerald-600' : 'text-gray-400'}
						>
							<Icon />
						</button>
					</li>
				{/if}
			{/each}
			<!-- <li>
			<button
				onclick={() => goto('/')}
				class={page.url.pathname === '/' ? 'text-emerald-600' : 'text-gray-400'}
			>
				<House />
				<svelte:component this={House} />
			</button>
		</li>

		<li>
			<button onclick={() => goto('/')}>
				<Bookmark />
			</button>
		</li>
		<li>
			<button class="bg-emerald-600 p-3 rounded-full" onclick={() => goto('/RecipeForm')}>
				<Plus color="white" />
			</button>
		</li>

		<li>
			<button
				onclick={() => goto('/')}
				class={page.url.pathname === '/' ? 'text-emerald-600' : 'text-gray-400'}
			>
				<Bell />
			</button>
		</li>

		<li>
			<button
				onclick={() => goto('/UserRoute')}
				class={page.url.pathname === '/UserRoute' ? 'text-emerald-600' : 'text-gray-400'}
			>
				<User />
			</button>
		</li> -->
		</ul>
	</nav>

	<nav class="md:visible max-sm:hidden">
		<ul class="flex justify-between items-center py-2 px-10 bg-white w-full border-b-2">
			<li>
				<button onclick={() => goto('/')} class="font-bold text-4xl cursor-pointer"> Recipe</button>
			</li>

			<!-- <li>
			<button onclick={() => goto('/')}>
				<Bookmark />
			</button>
		</li> -->

			<!-- <li>
			<button
				onclick={() => goto('/')}
				class={page.url.pathname === '/' ? 'text-emerald-600' : 'text-gray-400'}
			>
				<Bell />
			</button>
		</li> -->
			<div class="flex justify-between items-center gap-5">
				<li>
					<button
						class="bg-emerald-600 p-3 rounded-xl flex text-white"
						onclick={() => goto('/recipe-form')}
					>
						<Plus color="white" />
						<span>Add Recipe</span>
					</button>
				</li>
				<li>
					<button
						onclick={() => goto('/user')}
						class={page.url.pathname === '/user' ? 'text-emerald-600' : 'text-gray-400'}
					>
						<div class="cursor-pointer">
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Avatar.Root class="w-15 h-15 ">
										<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
										<Avatar.Fallback>CN</Avatar.Fallback>
									</Avatar.Root></DropdownMenu.Trigger
								>
								<DropdownMenu.Content>
									<DropdownMenu.Group>
										<DropdownMenu.Label>My Account</DropdownMenu.Label>
										<DropdownMenu.Separator />
										<DropdownMenu.Item onclick={() => goto('/user')}>Profile</DropdownMenu.Item>
										<DropdownMenu.Item
											onclick={() => {
												goto('/notifications');
											}}>Notification</DropdownMenu.Item
										>
										<DropdownMenu.Item
											onclick={() => {
												goto('/saved-recipe');
											}}>Saved</DropdownMenu.Item
										>
										<DropdownMenu.Item
											><button
												onclick={() => handleLogoutWrapper}
												class="text-black md:text-white hover:bg-red-500">Logout</button
											></DropdownMenu.Item
										>
									</DropdownMenu.Group>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</div>
					</button>
				</li>
			</div>
		</ul>
	</nav>

	{#if currentRoute !== '/' && !currentRoute.startsWith('/meal')}
		<div class="flex p-10 pb-0 md:hidden">
			<button class="font-bold" onclick={() => history.back()}>&lt;-</button>
			<p class="text-center flex-1 font-bold text-2xl">
				{#if currentRoute.startsWith('/search')}
					Search Recipe
				{:else}
					{currentTitle}
				{/if}
			</p>
		</div>
	{/if}

	<div class="pb-24 md:pb-0">
		<slot />
	</div>
{/if}

<style>
	button {
		cursor: pointer;
	}
</style>
