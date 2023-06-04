// login and sign up front-end buttons event handling
const loginFormHandler = async (event) => {
    event.preventDefault();
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    if (email && password) {
      try {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          // If successful, redirect the browser to the profile page
          document.location.replace('/');
        } else {
          // Show error message if login failed
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
    // Collect values from the signup form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    if (username && email && password) {
      try {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          // If successful, redirect the browser to the profile page
          document.location.replace('/');
        } else {
          // Show error message if signup failed
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };
  
  // Event listeners for login and sign up buttons
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);