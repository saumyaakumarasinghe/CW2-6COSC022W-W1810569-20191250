import axiosInstance from '@/lib/axios';

export interface BlogPost {
  id: number;
  userId: number;
  title: string;
  content: string;
  country: string;
  visitDate: string | null;
  coverImage: string | null;
  likes: number;
  status: string;
  commentsEnabled: boolean;
  likesEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    userName: string;
    email: string;
  };
}

export interface BlogPostResponse {
  posts: BlogPost[];
  total: number;
  limit: string;
  skip: string;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

export interface Follower {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  followedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    userName: string;
  };
}

export interface CommentResponse {
  comments: Comment[];
  total: number;
}

export interface LikeResponse {
  totalLikes: number;
  hasLiked: boolean;
}

export interface AddCommentRequest {
  postId: number;
  content: string;
}

export const blogService = {
  // Get user's blog posts
  getPosts: async (searchKey: string = '', skip: number = 0, limit: number = 10) => {
    const { data } = await axiosInstance.get<BlogPostResponse>('/v1/blog-post', {
      params: { search_key: searchKey, limit, skip },
    });
    return data;
  },

  // Get user's posts
  getUserPosts: async (): Promise<BlogPost[]> => {
    const { data } = await axiosInstance.get<BlogPost[]>(`/v1/blog-post/user`);
    return data;
  },

  // Get user's followers
  getFollowers: async () => {
    const { data } = await axiosInstance.get<Follower[]>(`/v1/follow/followers`);
    return data;
  },

  // Get users that the user is following
  getFollowing: async () => {
    const { data } = await axiosInstance.get<Follower[]>(`/v1/follow/following`);
    return data;
  },

  getPostById: async (id: string) => {
    const { data } = await axiosInstance.get<BlogPost>(`/v1/blog-post/${id}`);
    return data;
  },

  getComments: async (id: string): Promise<CommentResponse> => {
    const { data } = await axiosInstance.get<CommentResponse>(`/v1/comment/${id}`);
    return data;
  },

  getLikes: async (id: string): Promise<LikeResponse> => {
    const { data } = await axiosInstance.get<LikeResponse>(`/v1/like/${id}`);
    return data;
  },

  toggleLike: async (id: string): Promise<LikeResponse> => {
    const { data } = await axiosInstance.post<LikeResponse>(`/v1/like/${id}`);
    return data;
  },

  addComment: async (postId: string, content: string): Promise<CommentResponse> => {
    const { data } = await axiosInstance.post<CommentResponse>(`/v1/comment`, {
      postId: parseInt(postId),
      content,
    });
    return data;
  },

  // Create a new blog post
  createBlogPost: async (post: {
    title: string;
    content: string;
    country?: string;
    visitDate?: string | null;
    coverImage?: string;
  }): Promise<BlogPost> => {
    const { data } = await axiosInstance.post<BlogPost>('/v1/blog-post', post);
    return data;
  },

  // Update a blog post
  updateBlogPost: async (
    id: number,
    post: {
      title?: string;
      content?: string;
      country?: string;
      visitDate?: string | null;
      coverImage?: string;
    }
  ): Promise<BlogPost> => {
    const { data } = await axiosInstance.put<BlogPost>(`/v1/blog-post/${id}`, post);
    return data;
  },

  // Delete a blog post
  deleteBlogPost: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/v1/blog-post/${id}`);
  },

  getCountries: async (): Promise<string[]> => {
    const { data } = await axiosInstance.get<string[]>('/v1/country/');
    return data;
  },
};
