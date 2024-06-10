document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = this.name.value;
        const email = this.email.value;
        const address = this.address.value;
        const size = this.size.value;

        const pricePerSqFt = 0.5; // Example price per square foot
        const estimate = size * pricePerSqFt;

        alert(`Thank you, ${name}! Your estimated price is $${estimate.toFixed(2)}. We will contact you at ${email}.`);
    });
});
