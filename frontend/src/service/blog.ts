const API_URL = "http://localhost:8080/api/v1";

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    author: string;
    isPinned: boolean;
    createdAt: string;
}

export interface BlogPostRequest {
    title: string;
    content: string;
    author: string;
    isPinned: boolean;
}

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const blogService = {
    // --- Public Methods ---
    async getAllBlogs(): Promise<BlogPost[]> {
        const response = await fetch(`${API_URL}/public/blogs`);
        if (!response.ok) throw new Error("Failed to fetch blogs");
        return response.json();
    },

    async getBlogBySlug(slug: string): Promise<BlogPost> {
        const response = await fetch(`${API_URL}/public/blogs/${slug}`);
        if (!response.ok) throw new Error("Failed to fetch blog post");
        return response.json();
    },

    // --- Admin Methods ---
    async createPost(data: BlogPostRequest): Promise<BlogPost> {
        const response = await fetch(`${API_URL}/admin/blogs`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to create post");
        return response.json();
    },

    async updatePost(id: number, data: BlogPostRequest): Promise<BlogPost> {
        const response = await fetch(`${API_URL}/admin/blogs/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to update post");
        return response.json();
    },

    async deletePost(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/admin/blogs/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Failed to delete post");
    },

    // Helper
    calculateReadTime(content: string): string {
        const wordsPerMinute = 200;
        const words = content ? content.split(/\s+/).length : 0;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    }
};