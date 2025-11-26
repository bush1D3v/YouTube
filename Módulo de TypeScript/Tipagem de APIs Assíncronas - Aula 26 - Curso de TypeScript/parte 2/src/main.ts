import { getPosts } from "./apiClient.js"

async function exibindoPosts() {
    const result = await getPosts();

    if (result.ok) {
        const { posts, total, limit } = result.value;

        console.log(`Total de posts: ${total} - Mostrando ${limit} posts.`);

        return posts;
    }
    console.error("Erro ao buscar posts: ", result.error)
}

console.log(await exibindoPosts());