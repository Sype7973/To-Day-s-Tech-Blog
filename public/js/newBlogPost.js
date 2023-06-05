// grabs submit button from newBlogPost.handlebars
const newBlogPostHandler = async (event) => {
    event.preventDefault();
    
    // Collect values from the login form
    const title = document.querySelector('#blogTitle').value.trim();
    const content = document.querySelector('#blogContent').value.trim();
    
    if (title && content) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/blogposts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
        // If successful, redirect the browser to the profile page (list of all pets)
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

