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
        console.log(data); 

        if (data.status) {
            document.getElementById('message').innerText = 'Login successful!';
            showinfo(data); 
        } else {
            document.getElementById('message').innerText = data.message || 'Login failed. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred. Please try again later.';
    });
}

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


document.addEventListener("DOMContentLoaded", function() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const roleSelect = document.getElementById('role');
    const loginButton = document.getElementById('loginButton');

    function validateForm() {
        if (usernameInput.value && passwordInput.value && roleSelect.value) {
            loginButton.disabled = false; 
            loginButton.style.cursor = 'pointer'; 
        } else {
            loginButton.disabled = true; 
            loginButton.style.cursor = 'not-allowed'; 
        }
    }

    
    usernameInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);
    roleSelect.addEventListener('change', validateForm);

    
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault(); 
        submitLogin(); 
    });
});

function showinfo(data) {
    const account = document.getElementById('Show');

    
    console.log('Data received in showinfo:', data);

    
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