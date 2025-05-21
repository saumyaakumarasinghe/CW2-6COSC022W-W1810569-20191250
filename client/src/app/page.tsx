'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { blogService } from '@/services/blogService';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header';

const ITEMS_PER_PAGE = 10;
const DEFAULT_COVER_IMAGE =
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=60';

// Add type tag colors mapping
const TYPE_COLORS = {
  most_liked: 'bg-rose-100 text-rose-700',
  most_recent: 'bg-blue-100 text-blue-700',
};

// Helper function to validate image URL
const isValidImageUrl = (url: string | null): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Helper function to get author name
const getAuthorName = (user: {
  firstName: string | null;
  lastName: string | null;
  userName: string;
}) => {
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  return user.userName;
};

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate skip value for pagination
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  // Fetch blog posts using React Query
  const { data: blogData, isLoading } = useQuery({
    queryKey: ['blog-post', searchTerm, skip],
    queryFn: () => blogService.getPosts(searchTerm, skip, ITEMS_PER_PAGE),
  });

  // Calculate total pages
  const totalPages = Math.ceil((blogData?.total || 0) / ITEMS_PER_PAGE);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-gray-600 max-w-4xl mx-auto">
            Discover amazing travel stories, hidden gems, and unforgettable experiences from around
            the world. From local adventures to international journeys, we share authentic travel
            experiences and tips to help you plan your next adventure.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search Results Info */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            {blogData?.total || 0} results found
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-6">
          {isLoading
            ? // Loading skeletons
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <Skeleton className="h-8 w-3/4 mb-4" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                    <div className="md:w-1/4">
                      <Skeleton className="h-40 w-full rounded-lg" />
                    </div>
                  </div>
                </div>
              ))
            : blogData?.posts.map((post) => (
                <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Content Section */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-2xl font-bold">{post.title}</h3>
                        {post.type && post.type !== 'regular' && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${TYPE_COLORS[post.type as keyof typeof TYPE_COLORS]}`}
                          >
                            {post.type === 'most_liked' ? 'Most Liked' : 'Latest'}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          {getAuthorName(post.user)}
                        </span>
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {post.country}
                        </span>
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          {post.likes} likes
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      <Button
                        variant="outline"
                        className="hover:bg-gray-100 cursor-pointer"
                        onClick={() => router.push(`/post/${post.id}`)}
                      >
                        Read More
                      </Button>
                    </div>

                    {/* Image Section */}
                    <div className="md:w-1/4 relative h-40 md:h-[200px]">
                      <div className="relative w-full h-full rounded-xl overflow-hidden">
                        <Image
                          src={
                            isValidImageUrl(post.coverImage)
                              ? post.coverImage!
                              : DEFAULT_COVER_IMAGE
                          }
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover"
                          priority={post.id === blogData?.posts[0]?.id}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="cursor-pointer"
          >
            Previous
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1).map((pageNum) => (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? 'default' : 'outline'}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 p-0 cursor-pointer ${
                  currentPage === pageNum ? 'bg-blue-600 text-white' : ''
                }`}
              >
                {pageNum}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="cursor-pointer"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
