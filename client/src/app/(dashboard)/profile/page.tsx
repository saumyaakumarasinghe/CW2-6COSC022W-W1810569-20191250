'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { UserProfile, Follower, BlogPostResponse, blogService } from '@/services/blogService';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/store/authStore';
import Header from '@/components/Header';

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const { user } = useAuthStore();

  // Fetch user profile
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useQuery<UserProfile>({
    queryKey: ['profile', user?.id],
    queryFn: () => blogService.getProfile(user?.id?.toString()),
    enabled: !!user?.id,
  });

  // Fetch user's posts
  const { data: posts, isLoading: isPostsLoading } = useQuery<BlogPostResponse>({
    queryKey: ['posts', user?.id],
    queryFn: () => blogService.getPosts(),
    enabled: activeTab === 'posts',
  });

  // Fetch user's followers
  const { data: followers, isLoading: isFollowersLoading } = useQuery<Follower[]>({
    queryKey: ['followers', user?.id],
    queryFn: () => blogService.getFollowers(user?.id?.toString()),
    enabled: activeTab === 'followers',
  });

  // Fetch user's following
  const { data: following, isLoading: isFollowingLoading } = useQuery<Follower[]>({
    queryKey: ['following', user?.id],
    queryFn: () => blogService.getFollowing(user?.id?.toString()),
    enabled: activeTab === 'following',
  });

  if (!user) {
    return (
      <>
        <Header />
        <div className="container mx-auto p-4">
          <div className="text-center text-red-500">Please login to view your profile</div>
        </div>
      </>
    );
  }

  if (isProfileLoading) {
    return (
      <>
        <Header />
        <div className="container mx-auto p-4">
          <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (profileError) {
    return (
      <>
        <Header />
        <div className="container mx-auto p-4">
          <div className="text-center text-red-500">
            Error loading profile: {profileError.message}
          </div>
        </div>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Header />
        <div className="container mx-auto p-4">
          <div className="text-center text-red-500">Profile not found</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        {/* User Info Section */}
        <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
          <div className="flex items-center space-x-4">
            {profile.avatarUrl && (
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                width={96}
                height={96}
                className="rounded-full"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-gray-600">@{profile.username}</p>
            </div>
          </div>
          {profile.bio && <p className="mt-4 text-gray-700">{profile.bio}</p>}
        </div>

        {/* Tab Navigation */}
        <div className="mb-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('posts')}
              className={`${
                activeTab === 'posts'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Blog Posts ({profile.postsCount})
            </button>
            <button
              onClick={() => setActiveTab('followers')}
              className={`${
                activeTab === 'followers'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Followers ({profile.followersCount})
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`${
                activeTab === 'following'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Following ({profile.followingCount})
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'posts' && (
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
              {isPostsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 border rounded-md">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/4 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {posts?.posts.map((post) => (
                    <div
                      key={post.id}
                      className="p-4 border rounded-md hover:shadow-md transition-shadow duration-200"
                    >
                      <h3 className="text-xl font-bold">{post.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Published on: {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700">{post.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'followers' && (
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Followers</h2>
              {isFollowersLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="py-2">
                      <Skeleton className="h-6 w-1/3" />
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-2">
                  {followers?.map((follower) => (
                    <li
                      key={follower.id}
                      className="py-2 px-4 border rounded-md hover:bg-gray-50 transition-colors duration-200"
                    >
                      {follower.name} (@{follower.username})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'following' && (
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Following</h2>
              {isFollowingLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="py-2">
                      <Skeleton className="h-6 w-1/3" />
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-2">
                  {following?.map((followedUser) => (
                    <li
                      key={followedUser.id}
                      className="py-2 px-4 border rounded-md hover:bg-gray-50 transition-colors duration-200"
                    >
                      {followedUser.name} (@{followedUser.username})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
