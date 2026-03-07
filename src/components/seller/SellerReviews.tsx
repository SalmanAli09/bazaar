'use client';

import { useEffect, useState } from 'react';
import { Star, MessageSquare, Loader2 } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  review_text: string;
  created_at: string;
  reviewer: {
    full_name: string;
  };
  product: {
    ad_title: string;
    product_pictures: string[];
  };
}

interface SellerReviewsProps {
  sellerId: string;
}

export default function SellerReviews({ sellerId }: SellerReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ratingDistribution, setRatingDistribution] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/sellers/${sellerId}/reviews?page=${pagination.page}&limit=${pagination.limit}`
        );
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch reviews');
        }
        
        setReviews(data.reviews);
        setRatingDistribution(data.ratingDistribution);
        setPagination(data.pagination);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    if (sellerId) {
      fetchReviews();
    }
  }, [sellerId, pagination.page]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? 'fill-current text-amber-400' : 'text-slate-300 dark:text-slate-600'
          }`}
        />
      );
    }
    return stars;
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const calculateAverageRating = () => {
    const totalReviews = Object.values(ratingDistribution).reduce((sum, count) => sum + count, 0);
    if (totalReviews === 0) return 0;
    
    const weightedSum = Object.entries(ratingDistribution).reduce(
      (sum, [rating, count]) => sum + parseInt(rating) * count,
      0
    );
    return (weightedSum / totalReviews).toFixed(1);
  };

  if (loading && reviews.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-slate-600 dark:text-slate-400">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Rating Summary */}
      <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              {calculateAverageRating()}
            </div>
            <div className="flex justify-center gap-1 mb-2">
              {renderStars(parseFloat(calculateAverageRating()))}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Based on {pagination.total} reviews
            </div>
          </div>
          
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 w-12">
                  {rating}
                  <Star className="w-3 h-3 fill-current text-amber-400" />
                </div>
                <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-amber-400 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${pagination.total > 0 ? (ratingDistribution[rating as keyof typeof ratingDistribution] / pagination.total) * 100 : 0}%`
                    }}
                  />
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 w-8 text-right">
                  {ratingDistribution[rating as keyof typeof ratingDistribution]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {getInitials(review.reviewer.full_name)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {review.reviewer.full_name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-0.5">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {getTimeAgo(review.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {review.review_text && (
                    <p className="text-slate-700 dark:text-slate-300 mb-3">
                      {review.review_text}
                    </p>
                  )}
                  
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Reviewed: <span className="font-medium">{review.product.ad_title}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
            No reviews yet
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">
            This seller hasn't received any reviews yet.
          </p>
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
            disabled={pagination.page === 1}
            className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <span className="text-sm text-slate-600 dark:text-slate-400 px-4">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }))}
            disabled={pagination.page === pagination.totalPages}
            className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
