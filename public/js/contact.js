

// Near the top of the file, add:
const emailjsServiceId = process.env.EMAILJS_SERVICE_ID;
const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID;

// // js/contact.js
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

// Disable the submit button to prevent double submission
const submitButton = document.querySelector('button[type="submit"]');
submitButton.disabled = true;
    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validate the form fields (example validation, adjust as needed)
    if (!name || !email || !subject || !message) {
      submitButton.disabled = false;
        return;
    }

    // Send the email using EmailJS
    emailjs.send(process.env.EMAILJS_SERVICE_ID,process.env.EMAILJS_TEMPLATE_ID, {
        name: name,
        email: email,
        subject: subject,
        message: message
    }).then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert("Email sent successfully!");
        // Reset the form after successful submission
        document.getElementById('contact-form').reset();
        submitButton.disabled = false;
    }, function(error) {
        console.log('FAILED...', error);
        alert('Message failed to send. Please try again later.');
        submitButton.disabled = false;
    });
});



 // Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


