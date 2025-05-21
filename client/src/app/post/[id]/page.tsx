'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Heart } from 'lucide-react';
import Header from '@/components/Header';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogService } from '@/services/blogService';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';

const DEFAULT_COVER_IMAGE =
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=60';

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

export default function PostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params?.id;
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();
  const [commentContent, setCommentContent] = useState('');

  // Fetch blog post using React Query
  const {
    data: post,
    isLoading: isPostLoading,
    error: postError,
  } = useQuery({
    queryKey: ['blog-post', postId],
    queryFn: () => blogService.getPostById(postId as string),
    enabled: !!postId,
  });

  // Fetch likes using React Query
  const { data: likesData } = useQuery({
    queryKey: ['like', postId],
    queryFn: () => blogService.getLikes(postId as string),
    enabled: !!postId,
  });

  // Fetch comments using React Query
  const { data: commentsData, isLoading: isCommentsLoading } = useQuery({
    queryKey: ['comment', postId],
    queryFn: () => blogService.getComments(postId as string),
    enabled: !!postId,
  });

  // Add comment mutation
  const { mutate: addComment, isPending: isCommenting } = useMutation({
    mutationFn: (content: string) => blogService.addComment(postId as string, content),
    onSuccess: () => {
      // Invalidate and refetch comments
      queryClient.invalidateQueries({ queryKey: ['comment', postId] });
      // Clear the comment input
      setCommentContent('');
    },
    onError: (error) => {
      console.error('Error adding comment:', error);
    },
  });

  // Toggle like mutation
  const { mutate: toggleLike, isPending: isLiking } = useMutation({
    mutationFn: () => blogService.toggleLike(postId as string),
    onSuccess: () => {
      // Invalidate and refetch both post and likes data
      queryClient.invalidateQueries({ queryKey: ['blog-post', postId] });
      queryClient.invalidateQueries({ queryKey: ['like', postId] });
    },
    onError: (error) => {
      console.error('Error toggling like:', error);
    },
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentContent.trim()) {
      addComment(commentContent.trim());
    }
  };

  if (postError) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <p className="text-xl text-gray-700">Error loading blog post.</p>
        <Button onClick={() => router.push('/')} className="mt-4">
          Back to Home
        </Button>
      </div>
    );
  }

  if (!post && !isPostLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <p className="text-xl text-gray-700">Blog post not found.</p>
        <Button onClick={() => router.push('/')} className="mt-4">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Post Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="outline" onClick={() => router.back()} className="flex items-center mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>

        {isPostLoading ? (
          // Loading skeleton
          <article className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="relative w-full h-64 md:h-96">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="p-6 md:p-8">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/2 mb-6" />
              <Skeleton className="h-20 w-full" />
            </div>
          </article>
        ) : post ? (
          <article className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={post.coverImage || DEFAULT_COVER_IMAGE}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <span className="font-medium text-gray-700">By {getAuthorName(post.user)}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>In {post.country}</span>
                </div>
                {isAuthenticated ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      likesData?.hasLiked
                        ? 'text-rose-500 bg-rose-100 border border-rose-200 hover:bg-rose-200 hover:text-rose-600'
                        : 'text-gray-500 hover:text-rose-500 hover:bg-rose-50'
                    }`}
                    onClick={() => toggleLike()}
                    disabled={isLiking}
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-200 ${
                        likesData?.hasLiked
                          ? 'fill-rose-500 scale-110'
                          : 'fill-none hover:scale-110'
                      }`}
                    />
                    <span className="font-medium text-base">{likesData?.totalLikes || 0}</span>
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-500">{likesData?.totalLikes || 0}</span>
                  </div>
                )}
              </div>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>{post.content}</p>
              </div>
            </div>
          </article>
        ) : null}

        {/* Comments Section */}
        <section className="mt-12 bg-white shadow-xl rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Comments ({commentsData?.total || 0})
          </h2>

          {/* Comment Form */}
          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={3}
                placeholder="Write a comment..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                disabled={isCommenting}
              />
              <Button
                type="submit"
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isCommenting}
              >
                {isCommenting ? 'Posting...' : 'Post Comment'}
              </Button>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-gray-50 rounded-md text-center">
              <p className="text-gray-600">Sign in to leave a comment</p>
            </div>
          )}

          {/* Display Comments */}
          <div className="space-y-6">
            {isCommentsLoading ? (
              // Loading skeleton for comments
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="p-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center mb-2">
                    <Skeleton className="h-4 w-32 mr-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-16 w-full" />
                </div>
              ))
            ) : commentsData?.comments && commentsData.comments.length > 0 ? (
              commentsData.comments.map((comment) => (
                <div key={comment.id} className="p-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center mb-1">
                    <p className="font-semibold text-gray-800 mr-2">
                      {getAuthorName(comment.user)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
