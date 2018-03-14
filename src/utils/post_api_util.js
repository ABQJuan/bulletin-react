//Get posts from WordPress

export const fetchPosts = () => (
  fetch('http://jesseweigel.com/wp-json/wp/v2/posts')
  .then(data=>data.json())
)