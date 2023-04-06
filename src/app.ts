import {apiKeys} from "./api-keys";
import axios from "axios";

// This has to be specifically declared as we provide a dynamic Google Maps API key.
declare var google: any;

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

            //@ts-ignore
            let map: google.maps.Map;

            async function initMap(): Promise<void> {
                const {Map} = await google.maps.importLibrary("maps");
                map = new Map(document.getElementById("map")! as HTMLElement, {
                    center: coordinates,
                    zoom: 16
                });
            }

            initMap().then(() => {
                new google.maps.Marker({position: coordinates, map: map});
            });
        })
        .catch(error => {
            alert(error.message);
        });
}

form.addEventListener('submit', searchAddressHandler);

function attachGoogleMapsSript(): void {
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKeys.googleMapsAPIKey}`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    document.head.appendChild(googleMapsScript);
}

attachGoogleMapsSript();