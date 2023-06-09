// // handle submit button for editing comment on editComment.handlebars
document.addEventListener('DOMContentLoaded', function() {
  // handle submit button for editing comment on editComment.handlebars
  const updateCommentHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#edit-comment').value.trim();
    const commentId = document.querySelector('#commentId').getAttribute('data-comment-id');
    console.log(content, commentId);
    
    if (content && commentId) {
      try {
        const response = await fetch(`/api/comments/${commentId}`, {
          method: 'PUT',
          // comment_body: content,
          body: JSON.stringify({ content }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          window.location.replace(document.referrer);
        } else {
          throw new Error(response.statusText);
        }
      } catch (err) {
        alert(err.message);
      }
    }
  };

  document.querySelector('#updateCommentbtn').addEventListener('click', updateCommentHandler);
});