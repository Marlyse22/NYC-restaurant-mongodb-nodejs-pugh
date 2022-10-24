
import { getBoroughs, getRestaurant, getCuisines, getRestaurantBybocui } from '../database/database.js';

/**
 * Déclaration des controlleurs de l'app
 */

/**
 * GET /
 * Page d'accueil
 */
export async function getHome(req, res) {
  try {
    const boroughs = await getBoroughs();
    res.render('index', { boroughs });
  } catch (error) {
    res.status(400).json({message: error.message});
  }
  
}

export function getRestos(req, res) {
  try {
    const restaurant = {};
    res.render('restos', { restaurant });
  } catch (error) {
    res.status(400).json({message: error.message});
  }
  
}

export async function getExplore(req, res) {
  try {
    const boroughs = await getBoroughs();
  const cuisines = await getCuisines();
  const restos = {};
  res.render('explore', { boroughs, cuisines, restos })
  } catch (error) {
    res.status(400).json({message: error.message});
  }
  
}
export async function getRestaurantName(req, res) {
  try {
    const restaurantName = req.query.restaurant_name;
  console.log('Voici restaurantName : ', restaurantName);
  
    const restaurant = await getRestaurant(restaurantName);
    // let restaurants = await restaurantName;
    res.render('restos', { restaurant });
     
  
  } catch (error) {
    res.status(400).json({message: error.message});
  }
  
}

export async function getRestaurantBorCui(req, res) {
  try {
    const boroughs = await getBoroughs();
  const cuisines = await getCuisines();
  const restaurantBorough = req.query.restaurant_borough;
  const restaurantCuisine = req.query.restaurant_cuisine;
  
 const restos = await getRestaurantBybocui(restaurantBorough, restaurantCuisine);
 console.log('Voici restaurantBor : ', restos);
 // let restaurants = await restaurantName;
  res.render('explore', { boroughs,cuisines, restos });
    
  } catch (error) {
    res.status(400).json({message: error.message});
  }
  
}
