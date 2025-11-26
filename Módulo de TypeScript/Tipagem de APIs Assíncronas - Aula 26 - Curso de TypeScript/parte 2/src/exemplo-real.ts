async function getPosts() {
    const response = await fetch("http://dummyjson.com/posts")
    return response.json();
}