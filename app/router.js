import express from 'express';

import bodyparser from 'body-parser';

const router = new express.Router();

import {
  getHome,
  getRestos,
  getExplore,
  getRestaurantName,
  getRestaurantBorCui
} from './controller/controller.js';


/**
 * Déclaration des routes de l'app
 */

router.get("/", getHome);
router.get("/restos", getRestos);
router.get("/explore", getExplore);
router.get("/search_restaurant", getRestaurantName);
router.get("/search_restaurantby", getRestaurantBorCui);



// Exporte le routeur pour le fichier principal

export default router;
