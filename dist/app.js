"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        let map;
        function initMap() {
            return __awaiter(this, void 0, void 0, function* () {
                const { Map } = yield google.maps.importLibrary("maps");
                map = new Map(document.getElementById("map"), {
                    center: coordinates,
                    zoom: 16
                });
            });
        }
        initMap().then(() => {
            new google.maps.Marker({ position: coordinates, map: map });
        });
    })
        .catch(error => {
        alert(error.message);
    });
}
form.addEventListener('submit', searchAddressHandler);
function attachGoogleMapsSript() {
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${api_keys_1.apiKeys.googleMapsAPIKey}`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    document.head.appendChild(googleMapsScript);
}
attachGoogleMapsSript();
//# sourceMappingURL=app.js.map