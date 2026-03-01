document.addEventListener('DOMContentLoaded', () => {
    // This script handles the "Create Post" button redirection.
    const createButton = document.getElementById('create');
    if (createButton) {
        createButton.addEventListener('click', () => {
            window.location.href = '/posts/new';
        });
    }

    // This script handles deleting posts without a page reload.
    // It uses event delegation on the body to catch clicks on any delete button.
    document.body.addEventListener('click', async (event) => {
        // Check if a delete button was clicked
        if (event.target.classList.contains('delete-btn')) {
            const postId = event.target.dataset.id;

            // Ask for confirmation before deleting
            if (!confirm('Are you sure you want to delete this post?')) {
                return; // Stop if the user cancels
            }

            try {
                const response = await fetch(`/posts/${postId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // If the server confirms deletion (status 200-299),
                    // find the closest parent '.post' element and remove it from the page.
                    event.target.closest('.post').remove();
                } else {
                    // If the server sends an error response
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message || 'Failed to delete post.'}`);
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('An error occurred while trying to delete the post.');
            }
        }
    });
});
