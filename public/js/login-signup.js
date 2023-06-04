// // sign up functionality for the login-signup.handlebars page
// //

// const signupFormHandler = async (event) => {
//     event.preventDefault();
//     // collect the data from the sign up form
//     const username = document.querySelector('#username-signup').value.trim();
//     const password = document.querySelector('#password-signup').value.trim();
//     // if both fields have content, send the data to the API endpoint
//     if (username && password) {
//         const response = await fetch('/api/users/signup', {
//             method: 'POST',
//             body: JSON.stringify({ username, password }),
//             headers: { 'Content-Type': 'application/json' },
//         });
//         // if the sign up is successful, redirect to the dashboard page
//         if (response.ok) {
//             document.location.replace('/dashboard');
//         } else {
//             alert(response.statusText);
//         }
//     }
// }