// delete button on blogPost.handlebars event handling and listener
document.addEventListener('DOMContentLoaded', (event) => {
    const deleteBtn = document.querySelector('#deleteBlogPostbtn');
    const userID = document.querySelector('#userID').getAttribute('data-user-id');

    delete.buttons.forEach(button => {
        const blogOwner = button.getAttribute('data-blog-owner');
        console.log('blogowner', blogOwner);
        console.log('userID', userID);
        if (blogOwner === userID) {
            button.classList.remove('is-hidden');
        } else {
            button.classList.add('is-hidden');
        }
    });








// comments button on blogPost.handlebars event handling and listener
const commenthandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment').value.trim();
    const blogPostId = document.querySelector('#blogPostId').value.trim();
    if (comment) {
        // send a POST request to the API endpoint
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            // if successful, redirect the browser to the current page with the rendered comments
            document.location.replace('/' + blogPostId);
        } else {
            alert(response.statusText);
        }
    }
}