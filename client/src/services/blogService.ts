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
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
}

export const blogService = {
  // Get user profile
  getProfile: async (userId?: string) => {
    const { data } = await axiosInstance.get<UserProfile>(
      userId ? `/users/${userId}/profile` : '/users/profile'
    );
    return data;
  },

  // Get user's blog posts
  getPosts: async (searchKey: string = '', skip: number = 0, limit: number = 10) => {
    const { data } = await axiosInstance.get<BlogPostResponse>('/v1/blog-post', {
      params: { search_key: searchKey, limit, skip },
    });
    return data;
  },

  // Get user's followers
  getFollowers: async (userId?: string) => {
    const { data } = await axiosInstance.get<Follower[]>(
      userId ? `/users/${userId}/followers` : '/users/followers'
    );
    return data;
  },

  // Get users that the user is following
  getFollowing: async (userId?: string) => {
    const { data } = await axiosInstance.get<Follower[]>(
      userId ? `/users/${userId}/following` : '/users/following'
    );
    return data;
  },

  getPostById: async (id: string) => {
    const { data } = await axiosInstance.get<BlogPost>(`/blog-post/${id}`);
    return data;
  },
};
