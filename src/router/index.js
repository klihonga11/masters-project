import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Cookbooks from '@/components/Cookbooks'
import Account from '@/components/Account'
import ManageCookbook from '@/components/ManageCookbook'
import RecipeCategories from '@/components/RecipeCategories'
import ManageRecipeCategory from '@/components/ManageRecipeCategory'
import Recipes from '@/components/Recipes'
import RecipeIngredients from '@/components/RecipeIngredients'
import RecipeDirections from '@/components/RecipeDirections'
import ManageRecipe from '@/components/ManageRecipe'
import ManageRecipeIngredient from '@/components/ManageRecipeIngredient'
import ManageRecipeDirection from '@/components/ManageRecipeDirection'

Vue.use(Router);

let router = new Router({
  routes: [
    {
		path: '*', //redirect every path that doesn't exist to the login component
		redirect: Login
    },
	{
		path: '/',
		redirect: Login
    },
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/register',
		//name: 'SignUp',
		component: Register
	},
	{
		//remove name and blank out the path for welcome so that it is loaded when the home page is loaded by default
		path: '/home',
		component: Home,
		props: true,
		meta : {
			requiresAuth: true,
		},
		children: [
			{
				path: '',
				name: 'Welcome',
				component: Welcome,
			},
			{
				path: '/cookbooks',
				name: 'Cookbooks',
				component: Cookbooks,
			},
			{
				path: '/account',
				name: 'Account',
				component: Account,
			},
			{
				path: '/cookbooks/add',
				name: 'AddCookbook',
				component: ManageCookbook,
				props: true,
			},
			{
				path: '/cookbooks/:cookbookId/edit',
				name: 'EditCookbook',
				component: ManageCookbook,
				props: true,
			},
			{
				path: '/cookbooks/:cookbookId/recipe_categories',
				name: 'RecipeCategories',
				component: RecipeCategories,
				props: true,
			},
			{
				path: '/cookbooks/:cookbookId/recipe_categories/add',
				name: 'AddRecipeCategory',
				component: ManageRecipeCategory,
				props: true,
			},
			{
				path: '/cookbooks/:cookbookId/recipe_categories/:recipeCategoryId/edit',
				name: 'EditRecipeCategory',
				component: ManageRecipeCategory,
				props: true,
			},
			{
				path: '/cookbooks/:cookbookId/recipe_categories/:recipeCategoryId/recipes',
				name: 'Recipes',
				component: Recipes,
				props: true,
			},
			{
				path: '/cookbooks/:cookbookId/recipe_categories/:recipeCategoryId/recipes/add',
				name: 'AddRecipe',
				component: ManageRecipe,
				props: true,
			},
			{
				path: '/cookbooks/:cookbookId/recipe_categories/:recipeCategoryId/recipes/:recipeId/edit',
				name: 'EditRecipe',
				component: ManageRecipe,
				props: true,
			},
			{
				path: '/cookbooks/:cookbookId/recipe_categories/:recipeCategoryId/recipes/:recipeId/recipe_ingredients',
				name: 'RecipeIngredients',
				component: RecipeIngredients,
				props: true
			},
			{
				path: '/cookbooks/:cookbookId/recipe_categories/:recipeCategoryId/recipes/:recipeId/recipe_directions',
				name: 'RecipeDirections',
				component: RecipeDirections,
				props: true
			},
			{
				path: '/cookbooks/:cookbookId/recipe_categories/:recipeCategoryId/recipes/:recipeId/manage_recipe_ingredient',
				name: 'ManageRecipeIngredient',
				component: ManageRecipeIngredient,
				props: true,
			},
			{
				path: '/cookbooks/:cookbookId/recipe_categories/:recipeCategoryId/recipes/:recipeId/manage_recipe_direction',
				name: 'ManageRecipeDirection',
				component: ManageRecipeDirection,
				props: true,
			}
		]
	}
  ]
})

//navigation guard
router.beforeEach((to, from, next) => {
	let currentUser = firebase.auth().currentUser;
	let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	
	if(requiresAuth && !currentUser) {
		next("login");
	} else if(!requiresAuth && currentUser) {
		next("home");
	} else {
		next();
	}
});

export default router;