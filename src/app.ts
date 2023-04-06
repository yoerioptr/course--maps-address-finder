const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.getElementById('address')! as HTMLInputElement;

function searchAddressHandler(event: SubmitEvent): void {
    event.preventDefault();
    const enteredAddress = addressInput.value;
    console.log(enteredAddress);
}

form.addEventListener('submit', searchAddressHandler);