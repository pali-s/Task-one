export async function fetchPosts() {
    const response = await fetch('http://localhost:3000/posts');
    return response.json();
}

export async function fetchPostById(id: number) {
    const response = await fetch(`http://localhost:3000/posts/${id}`);
    return response.json();
}

export async function createPost(postData: { title: string; body: string; }) {
    const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });
    return response.json();
}

export async function deletePost(id: number) {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE',
    }
    );
    return id;
}

export async function updatePostById({
    id,
    postData,
}: {
    id: number;
    postData: { title: string; body: string };
}) {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });
    return response.json();
}