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
  
  
  document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll('.comment-delete');
    const userID = document.querySelector('#user-id').dataset.userId;
  
    deleteButtons.forEach(button => {
      const commentOwner = button.getAttribute('data-comment-user');
      console.log('commentOwner', commentOwner);
      console.log('userID', userID);
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

    const commentID = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${commentID}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  });
});


const deleteBlogButton = document.querySelector('#delete-blog');
  
if (deleteBlogButton) {
  // here is broken and not showing delete
  const blogID = document.querySelector('#blog-title').dataset.blog_id;
  const userID = deleteBlogButton.dataset.user_id;

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
//  hide edit button if not comment owner based on id in data-comment-user
document.addEventListener('DOMContentLoaded', function () {
  const editButtons = document.querySelectorAll('.comment-edit');
  
  editButtons.forEach(button => {
    button.addEventListener('click', () => {
      const commentID = button.getAttribute('data-comment-id');
      console.log(commentID);
      const url = `/comments/edit/${commentID}`;
      window.location.href = url;
    });

    const commentOwner = button.getAttribute('data-comment-user');
    const userID = document.querySelector('#user-id').dataset.userId;

    if (commentOwner === userID) {
      button.classList.remove('is-hidden');
    } else {
      button.classList.add('is-hidden');
    }
  });
});
