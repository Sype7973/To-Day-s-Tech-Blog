// grabs submit button from newBlogPost.handlebars
const newBlogPostHandler = async (event) => {
    event.preventDefault();
    
    // Collect values from the login form
    const title = document.querySelector('#blogTitle').value.trim();
    const body = document.querySelector('#blogBody').value.trim();
    
    if (title && body) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/blogposts/', {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
        // If successful, redirect the browser to the profile page (list of blogposts)
        document.location.replace('/');
        } else {
        alert(response.statusText);
        }
    }
    }
    // event handling for submit button for new blog post
    document
    .querySelector('#newBlogPostbtn')
    .addEventListener('click', newBlogPostHandler);

