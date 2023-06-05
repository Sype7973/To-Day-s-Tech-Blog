// update button on blogPost.handlebars event handling and listener
const updatehandler = async (event) => {
    const title = document.querySelector('#blogTitle').value.trim();
    const content = document.querySelector('#blogContent').value.trim();
    const blogPostId = document.querySelector('#blogPostId').value.trim();
    if (title && content) {
        const userID_EL = document.querySelector('#userID');
        const userID = userID_EL.getAttribute('data-user-id');

        // send a PUT request to the API endpoint
        const response = await fetch('/api/blogposts/' + blogPostId, {
            method: 'PUT',
            body: JSON.stringify({ title, content, userID }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {

            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document 
    .querySelector('#updateBlogPostbtn')
    .addEventListener('click', updatehandler);

