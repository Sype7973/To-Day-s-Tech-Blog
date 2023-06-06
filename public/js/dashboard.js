// delete button functionality for dashboard handlebars removes is-hidden class from delete button if it belongs to the user
const deleteBlogPost = async (event) => {
    const blogPostId = event.target.getAttribute('data-blogpost-id');
    const response = await fetch('/api/blogposts/' + blogPostId, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.reload();
    }
    else {
        alert(response.statusText);
    }
};
document.querySelectorAll('.deleteBlogPost').forEach((button) => {
    button.addEventListener('click', deleteBlogPost);
}
);
