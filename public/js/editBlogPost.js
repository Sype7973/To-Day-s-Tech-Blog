// update button on blogPost.handlebars event handling and listener
const updatehandler = async (event) => {
    const title = document.querySelector('#blogTitle').value.trim();
    const content = document.querySelector('#blogContent').value.trim();
    const blogPostId = document.querySelector('#blogPostId').getAttribute('data-blog-id');
    console.log(blogPostId);
    if (title && content && blogPostId) {
        const userID_EL = document.querySelector('#blogPostId');
        const userID = userID_EL.getAttribute('data-blog-id');

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