'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Follower, BlogPost, blogService } from '@/services/blogService';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/store/authStore';
import Header from '@/components/Header';
import Image from 'next/image';

const DEFAULT_COVER_IMAGE =
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=60';

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const { user } = useAuthStore();

  // Fetch user's posts
  const { data: posts, isLoading: isPostsLoading } = useQuery<BlogPost[]>({
    queryKey: ['posts'],
    queryFn: () => blogService.getUserPosts(),
    enabled: activeTab === 'posts',
  });

  // Fetch user's followers
  const { data: followers, isLoading: isFollowersLoading } = useQuery<Follower[]>({
    queryKey: ['followers'],
    queryFn: () => blogService.getFollowers(),
    enabled: activeTab === 'followers',
  });

  // Fetch user's following
  const { data: following, isLoading: isFollowingLoading } = useQuery<Follower[]>({
    queryKey: ['following'],
    queryFn: () => blogService.getFollowing(),
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

  return (
    <>
      <Header />
      <div className="container mx-auto max-w-4xl px-4">
        {/* User Info Section */}
        <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">Profile Information</h1>
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Personal Details</h2>
                  <div className="mt-2 space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Full Name:</span> {user?.firstName}{' '}
                      {user?.lastName}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Username:</span> @{user?.userName}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Email:</span> {user?.email}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">User ID:</span> {user?.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {posts && posts.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-600">Latest Post</h3>
                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                      <p className="font-medium">{posts[0].title}</p>
                      <p className="text-sm text-gray-500">
                        Posted on {new Date(posts[0].createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {followers && followers.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-600">Latest Follower</h3>
                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                      <p className="font-medium">
                        {followers[0].firstName} {followers[0].lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Started following on{' '}
                        {new Date(followers[0].followedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
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
              Blog Posts ({posts?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('followers')}
              className={`${
                activeTab === 'followers'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Followers ({followers?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`${
                activeTab === 'following'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Following ({following?.length || 0})
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
              ) : posts && posts.length > 0 ? (
                <div className="space-y-6">
                  {posts.map((post: BlogPost) => (
                    <div
                      key={post.id}
                      className="p-4 border rounded-md hover:shadow-md transition-shadow duration-200"
                    >
                      <h3 className="text-xl font-bold">{post.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Published on: {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700">{post.content}</p>
                      {post.country && (
                        <p className="text-sm text-gray-500 mt-2">Location: {post.country}</p>
                      )}
                      {post.visitDate && (
                        <p className="text-sm text-gray-500">
                          Visit Date: {new Date(post.visitDate).toLocaleDateString()}
                        </p>
                      )}
                      {post.coverImage && (
                        <div className="mt-4 relative w-full h-48">
                          <Image
                            src={post.coverImage || DEFAULT_COVER_IMAGE}
                            alt={post.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                      )}
                      <div className="mt-4 flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          {post.likes} {post.likes === 1 ? 'like' : 'likes'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {post.commentsEnabled ? 'Comments enabled' : 'Comments disabled'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No posts found</p>
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
              ) : followers && Array.isArray(followers) ? (
                <ul className="space-y-2">
                  {followers.map((follower) => (
                    <li
                      key={follower.id}
                      className="py-2 px-4 border rounded-md hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">
                            {follower.firstName} {follower.lastName}
                          </p>
                          <p className="text-sm text-gray-600">@{follower.userName}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          Followed on {new Date(follower.followedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No followers found</p>
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
              ) : following && Array.isArray(following) ? (
                <ul className="space-y-2">
                  {following.map((followedUser) => (
                    <li
                      key={followedUser.id}
                      className="py-2 px-4 border rounded-md hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">
                            {followedUser.firstName} {followedUser.lastName}
                          </p>
                          <p className="text-sm text-gray-600">@{followedUser.userName}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          Followed on {new Date(followedUser.followedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No following found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
