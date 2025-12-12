import { writable } from 'svelte/store';

export interface Recipe {
	idMeal: string;
	strMeal: string;
	strCategory: string;
	strArea: string;
	strInstructions: string;
	strTags: string | null;
	strYoutube: string | null;
}

export interface Category {
	idCategory: string;
	strCategory: string;
	strCategoryThumb: string;
	strCategoryDescription: string;
}

export type Area = {
	strArea: string;
};

export const categories = writable<Category[] | null>(null);

export const area = writable<Area[] | null>(null);

const saved = JSON.parse(localStorage.getItem('meals') || '{"meals": []}');

export const recipes = writable<Recipe[]>(saved.meals || []);
