"use strict";
const form = document.querySelector('form');
const addressInput = document.getElementById('address');
function searchAddressHandler(event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;
    console.log(enteredAddress);
}
form.addEventListener('submit', searchAddressHandler);
//# sourceMappingURL=app.js.map