// Existing users array (in a real app, this would be in a database)
let users = [
    { id: '1', username: 'admin', password: 'admin123' },
];

// Registration Form Submission
document.getElementById('registerForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Check if passwords match
    if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Check if the username already exists
    const existingUser = users.find(user => user.username === newUsername);
    if (existingUser) {
        alert('Username already exists');
        return;
    }

    // Create a new user object
    const newUser = {
        id: String(users.length + 1), // Simple way to assign a new ID
        username: newUsername,
        password: newPassword,
    };

    // Add the new user to the users array
    users.push(newUser);

    // Save users to localStorage (this is for the demo; in a real app, you'd save to a database)
    localStorage.setItem('users', JSON.stringify(users));

    // Redirect to login page after successful registration
    alert('Registration successful! Please login.');
    window.location.href = 'login.html';
});

// Load users from localStorage if available
document.addEventListener('DOMContentLoaded', function () {
    const savedUsers = JSON.parse(localStorage.getItem('users'));
    if (savedUsers) {
        users = savedUsers;
    }
});


// Login Form Submission (Already Existing)
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        // Save user session (this is a simple mock, not secure for production)
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = '../user/dashboard.html';
    } else {
        alert('Invalid username or password');
    }
});

// On Dashboard Load
document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (!loggedInUser && window.location.pathname.endsWith('dashboard.html')) {
        // Redirect to login if no user is logged in
        window.location.href = 'login.html';
    }

    if (loggedInUser) {
        // Show user info
        document.getElementById('userId').textContent = `ID: ${loggedInUser.id}`;
        document.getElementById('userAvatar').textContent = loggedInUser.username;

        // Display a welcome message
        document.getElementById('welcomeMessage').textContent = `Bienvenue, ${loggedInUser.username} !`;
    }
});

// Function to create a new project (mock function)
function createProject() {
    const projectContainer = document.getElementById('projects');

    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project-item');

    projectDiv.innerHTML = `
        <div class="project-thumb"></div>
        <div class="project-info">
            <h4>New Project</h4>
            <p>Created just now</p>
        </div>
    `;

    projectContainer.appendChild(projectDiv);
}

// Logout Button Functionality
document.getElementById('logoutBtn').addEventListener('click', function () {
    // Clear user session from localStorage
    localStorage.removeItem('loggedInUser');
    
    // Redirect to login page
    window.location.href = 'login.html';
});
