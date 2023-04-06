import {apiKeys} from "./api-keys";
import axios from "axios";

const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.getElementById('address')! as HTMLInputElement;

type GoogleGeocodeResponse = {
    results: { geometry: { location: { lat: number, lng: number } } }[],
    status: 'OK' | 'ZERO_RESULTS'
};

function searchAddressHandler(event: SubmitEvent): void {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    axios
        .get<GoogleGeocodeResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${apiKeys.googleMapsAPIKey}`)
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