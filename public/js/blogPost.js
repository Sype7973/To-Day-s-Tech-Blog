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
        const response = await fetch(`/api/blogposts/${blogID}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          // If successful, refresh to view comment
          document.location.replace(`/blogposts/${blogID}`);
        } else {
          throw new Error(response.statusText);
        }
      } catch (err) {
        alert(err.message);
      }
    });
  }
//  once document content is fully loaded, for each delete button, get the comment owner id from the data attribute isCommmetOwner,
// if the comment owner id is the same as the logged-in user's Id, remote the is-hidden class from the delete button
// otherwise, add the is-hidden class to the delete button
document.addEventListener('DOMContentLoaded', function () {
 const deleteButtons = document.querySelectorAll('.comment-delete');
    deleteButtons.forEach((button) => {
        const isCommentOwner = button.getAttribute('data-isCommentOwner');
        if (isCommentOwner === 'true') {
            button.classList.remove('is-hidden');
        }
        else {
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
          document.location.replace('/');
        } else {
          throw new Error(response.statusText);
        }
      } catch (err) {
        alert(err.message);
      }
    });
  });

  const editButtons = document.querySelectorAll('.comment-edit');

  editButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      event.stopPropagation();
    
      const commentID = event.target.dataset.commentId;
      const commentElement = event.target.parentElement.parentElement.parentElement;
      const commentContent = commentElement.querySelector('.content');
      const currentComment = commentContent.textContent.trim();
    
      const newComment = prompt('Enter the updated comment:', currentComment);
    
      if (newComment) {
        try {
          const response = await fetch(`/api/comments/${commentID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment_body: newComment }),
          });
    
          if (response.ok) {
            document.location.reload();
          } else {
            throw new Error(response.statusText);
          }
        } catch (err) {
          alert(err.message);
        }
      }
    });
  });

    




