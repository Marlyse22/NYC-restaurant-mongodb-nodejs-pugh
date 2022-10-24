// Connexion persistente à la base MongoDB
import { MongoClient } from "mongodb";

export const DB_NAME = 'ny';
export const DB_COLLECTION = 'restaurants';

// Déclaration de la connectionString
const CONNECTION_STRING = "mongodb://root:example@mongo:27017"; // Avec Docker
// const CONNECTION_STRING = 'mongodb://localhost:27017'; // Installation locale de MongoDB

// Initialise une connexion à la base MongoDB
export const client = new MongoClient(CONNECTION_STRING);
let db = null;

export function openDatabase() {
  return client.connect().then(() => {
    db = client.db(DB_NAME); 
    return db;
  });
};


export async function getBoroughs() {
  const db = await client.db(DB_NAME);
  const restaurants = await db.collection(DB_COLLECTION);
  const boroughs = await restaurants.distinct("borough");
  return boroughs.slice() || null;
}

//recuperer les cuisines
export async function getCuisines() {
  const db = await client.db(DB_NAME);
  const restaurants = await db.collection(DB_COLLECTION);
  const cuisines = await restaurants.distinct("cuisine");

  return cuisines.slice() || null;
}

// Search 
export async function getRestaurant(req) {
  console.log("pName : ", req)
  const db = await client.db(DB_NAME);
  const restaurants = await db.collection(DB_COLLECTION);
  const restaurant = await restaurants.findOne(
    { name: req },
    { _id: 0, name: 1, cuisine:1, address:1}
  )
  console.log("restaurant", restaurant)
  return restaurant || null; 
}

// Search restaurant by boroughs and cuisine 
export async function getRestaurantBybocui(restaurantBorough,restaurantCuisine) {
  console.log("quartier : ", restaurantBorough, "cuisine : ", restaurantCuisine)
  
  const db = await client.db(DB_NAME);
  const restaurants = await db.collection(DB_COLLECTION);
  const resto = await restaurants.find(
    { borough: restaurantBorough,cuisine: restaurantCuisine },
    {_id:0, name:1, cuisine:1,address:1}
  ).toArray();
  
  console.log("restaurant", resto)
  return resto || null; 
}

//Search best restaurant by boroughs

export async function getBest() {
  const db = await client.db(DB_NAME);
  const restaurants = await db.collection(DB_COLLECTION);
  const best_restaurant_by = await restaurants.distinct("cuisine");

  return best_restaurant_by || null;
}