const commentFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the comment form
    const comment_body = document.querySelector('#new-comment').value.trim();
    const user_id = document.querySelector('#user-id').dataset.userId;
    const blogPost_id = document.querySelector('#blog-title').dataset.blogId;
  
    if (comment_body) {
      try {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/comments/', {
          method: 'POST',
          body: JSON.stringify({ comment_body, user_id, blogPost_id }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          // If successful, refresh to view comment
          document.location.reload();
        } else {
          throw new Error(response.statusText);
        }
      } catch (err) {
        alert(err.message);
      }
    }
  };
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
  
  const deleteBlogButton = document.querySelector('#delete-blog');
  
  if (deleteBlogButton) {
    const blogID = document.querySelector('#blog-title').dataset.blogId;
    const userID = deleteBlogButton.dataset.userId;
  
    if (blogID === userID) {
      deleteBlogButton.classList.remove('hide');
    } else {
      deleteBlogButton.classList.add('hide');
    }
  
    deleteBlogButton.addEventListener('click', async (event) => {
      event.preventDefault();
  
      try {
        const response = await fetch(`/api/blogPost/${blogID}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          // If successful, refresh to view comment
          document.location.replace(`/blogPost/${blogID}`);
        } else {
          throw new Error(response.statusText);
        }
      } catch (err) {
        alert(err.message);
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll('.comment-delete');
    const userID = deleteBlogButton ? deleteBlogButton.dataset.userId : null;
  
    deleteButtons.forEach(button => {
      const commentOwner = button.dataset.commentUser;
      if (commentOwner === userID) {
        button.classList.remove('is-hidden');
      } else {
        button.classList.add('is-hidden');
      }
    });
  });
  
  const deleteButtons = document.querySelectorAll('.comment-delete');
  
  deleteButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      event.stopPropagation();
  
      const commentID = event.target.dataset.id;
  
      try {
        const response = await fetch(`/api/comments/${commentID}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.reload();
        } else {
          throw new Error(response.statusText);
        }
      } catch (err) {
        alert(err.message);
      }
    });
  });
  