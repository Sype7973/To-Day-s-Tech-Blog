// update button on blogPost.handlebars event handling and listener
document.addEventListener('DOMContentLoaded', function() {
  const updateHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blogTitle').value.trim();
    const body = document.querySelector('#blogContent').value.trim();
    const blogPostId = document.querySelector('#blogPostId').getAttribute('data-blog-id');
    console.log(title, body, blogPostId);
    if (title && body) {
      try {
        const response = await fetch(`/api/blogposts/${blogPostId}`, {
          method: 'PUT',
          body: JSON.stringify({ title, body}),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          window.history.back();
        } else {
          alert(response.statusText);
        }
      } catch (err) {
        alert(err.message);
      }
    }
  };

  document.querySelector('#updateBlogPostbtn').addEventListener('click', updateHandler);
});