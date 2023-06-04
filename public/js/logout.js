// logout button on dashboard.handlebars event handling and listener
 const logout = async (event) => {
    event.preventDefault();
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    // If successful, redirect the browser to the profile page
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
    }
    // event listener for logout button
    document
    .querySelector('#logout')
    .addEventListener('click', logout);
    
