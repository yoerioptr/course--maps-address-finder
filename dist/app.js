"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_keys_1 = require("./api-keys");
const axios_1 = __importDefault(require("axios"));
const form = document.querySelector('form');
const addressInput = document.getElementById('address');
function searchAddressHandler(event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;
    axios_1.default
        .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${api_keys_1.apiKeys.googleMapsAPIKey}`)
        .then(response => {
        if (response.data.status !== 'OK') {
            throw new Error('Could not fetch location!');
        }
        const coordinates = response.data.results[0].geometry.location;
        console.log(coordinates);
    })
        .catch(error => {
        alert(error.message);
    });
}
form.addEventListener('submit', searchAddressHandler);
//# sourceMappingURL=app.js.map