// Original function to submit login
function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password || !role) {
        document.getElementById('message').innerText = 'Please fill out all fields.';
        return;
    }

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key':'TU606df8924f82b2ab5233f5e596523d3a88e8229e5b9a69fcea19944b94832600c8e348b27f8e51ca0d44dcc551e3400b'
        },
        body: JSON.stringify({ 
            "UserName":username, 
            "PassWord":password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Debugging: Log the response to inspect its structure

        if (data.status) {
            document.getElementById('message').innerText = 'Login successful!';
            showinfo(data); // Display user account information
        } else {
            document.getElementById('message').innerText = data.message || 'Login failed. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred. Please try again later.';
    });
}
// Original function to call REST API Hello
function call_REST_API_Hello() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const url = (
        'http://localhost:8080/hello?' +
        new URLSearchParams({ myName: username, lastName: password }).toString()
    );

    fetch(url)
    .then(response => response.text())
    .then(text => {
        if (text.status) {
            document.getElementById('message').innerText = text;
        } else {
            document.getElementById('message').innerText = text;
        }
    })
    .catch(error => console.error('Error:', error));
}

// Function to toggle password visibility
function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleText = document.querySelector('.toggle-password');
    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleText.textContent = "⚆";
    } else {
        passwordField.type = "password";
        toggleText.textContent = "◠"; 
    }
}

// Event listener for enabling/disabling the login button based on input validation
document.addEventListener("DOMContentLoaded", function() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const roleSelect = document.getElementById('role');
    const loginButton = document.getElementById('loginButton');

    function validateForm() {
        if (usernameInput.value && passwordInput.value && roleSelect.value) {
            loginButton.disabled = false; // Enable button
            loginButton.style.cursor = 'pointer'; // Change cursor to pointer
        } else {
            loginButton.disabled = true; // Disable button
            loginButton.style.cursor = 'not-allowed'; // Change cursor to not-allowed
        }
    }

    // Add input event listeners to validate form
    usernameInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);
    roleSelect.addEventListener('change', validateForm);

    // Attach the submitLogin function to the login form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        submitLogin(); // Call the submit login function
    });
});
// Function to display the returned data in the UI
function showinfo(data) {
    const account = document.getElementById('Show');

    // Log the data object to inspect its properties
    console.log('Data received in showinfo:', data);

    // Example update (modify these fields based on actual API response)
    account.innerHTML = `
         <h2>Account</h2>
        <p><strong>Student ID:</strong> ${data.username}</p>
        <p><strong>Name(thai):</strong>${data.displayname_th}</p>
        <p><strong>Name(eng):</strong>${data.displayname_en}</p>
        <p><strong>Email:</strong> ${data.email}</p> 
        <p><strong>Faculty:</strong>${data.faculty}</p>
        <p><strong>Department:</strong>${data.department}</p>
        
    `;
    account.style.display ='block';
}