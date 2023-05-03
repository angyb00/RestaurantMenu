import {auth} from '../firebase';

const API_URL = 'https://restaurante-api.vercel.app';

const getNearbyRegion = async () => {

    const regions = await fetch(`${API_URL}/getRegion`);
    const regionData = await regions.json();

    return regionData;
};

const fetchRestaurants = async () => {

    const restaurant = await fetch(`${API_URL}/fetchNearbyRestaurants`);
    const responseData = await restaurant.json();
    
    return responseData;
};

const fetchPhotos = async (photoRef) => {

    const photo = await fetch(`${API_URL}/fetchPhotos?photoRef=${photoRef}`);
    const photoData = await photo.json();

    return photoData;

};

const fetchMapsKey = async () => {
    const key = await fetch(`${API_URL}/mapsKey`);
    const keyData = await key.json();

    return keyData;
}




export { getNearbyRegion, fetchRestaurants, fetchPhotos, fetchMapsKey };