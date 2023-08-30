const BASE_URL = "https://strangers-things.herokuapp.com/api/305-ftb-pt-web-pt";

export async function registerUser(user) {
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const result = await response.json();
    return result;
}

export async function userLogin(user) {
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const result = await response.json();
    return result;
}

export async function fetchAllPost () {
    const response = await fetch(`${BASE_URL}/posts`);
    const result = await response.json();
    return result.data.posts;
}

export async function userPost(token) {
    const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json();
    console.log("get user data", result);
    return result.posts;
}

export async function userMessages (token) {
    const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json();
    return result.data;
}

export async function sendMessage (message, postId, token) {
    const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(message)
    })
    const result = await response.json();
    console.log(result)
    return result.data.message;
}

export async function addNewPost (post, token) {
    const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(post)
    })
    const result = await response.json();
    return result.data.post;
}

export async function editPost (post, postId, token) {
    console.log("post", post);
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(post)
    })
    const result = await response.json();
    return result.data.post;
}

export async function deletePost (postId, token) {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json();
    console.log("delete", result);
    if (result.error) throw result.error;
    return;
}