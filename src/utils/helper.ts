import {Ingredient} from '../types/entities';

export function getIngredientString(ingredients: Ingredient[]) {
  return ingredients.map(ingredient => ingredient.name).join(', ');
}
export function getModifiedAmount(amount: number) {
  return parseFloat(`${amount / 100}`).toFixed(2);
}
