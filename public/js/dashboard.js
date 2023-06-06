// delete button functionality for dashboard handlebars
const deleteBlogPost = async (event) => {
    const blogPostId = event.target.getAttribute('data-blogpost-id');
    const response = await fetch('/api/blogposts/' + blogPostId, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelectorAll('#dashboardDelete').forEach(item => {
    item.addEventListener('click', deleteBlogPost);
}
);
