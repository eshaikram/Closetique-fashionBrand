"use client";
import React, { useState } from "react";
import { Star, ThumbsUp, User } from "lucide-react";

const ProductReview = () => {
  const [reviews] = useState([
    {
      id: "r1",
      user: "Daniel Steward",
      rating: 5,
      comment: "This is amazing product I love it.",
      date: "Aug 10, 2025",
    },
    {
      id: "r2",
      user: "Bushra Mehtab",
      rating: 4,
      comment: "This is amazing product I love it.",
      date: "Aug 12, 2025",
    },
    {
      id: "r3",
      user: "Kathryn Murphy",
      rating: 5,
      comment: "This is amazing product I love it.",
      date: "Aug 14, 2025",
    },
    {
      id: "r4",
      user: "Robert Richards",
      rating: 3,
      comment: "This is amazing product I love it.",
      date: "Aug 15, 2025",
    },
  ]);

  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;

  const ratingsCount = [5, 4, 3, 2, 1].map(
    (star) => reviews.filter((r) => Math.floor(r.rating) === star).length
  );

  return (
    <div className="w-full bg-white rounded-lg p-6 shadow mt-10">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Product Reviews
      </h2>

      {/* Rating Overview */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
        {/* Average Rating Circle */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="8"
                strokeDasharray={283}
                strokeDashoffset={283 - (averageRating / 5) * 283}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-orange-500">
                {averageRating.toFixed(1)}
              </span>
              <div className="flex mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-500 mt-2 text-sm">User Satisfaction</p>
        </div>

        {/* Rating Breakdown */}
        <div className="flex-1 space-y-2 w-full">
          {[5, 4, 3, 2, 1].map((star, index) => {
            const count = ratingsCount[index];
            const percent = (count / totalReviews) * 100 || 0;
            return (
              <div key={star} className="flex items-center gap-3">
                <span className="w-8 text-sm font-medium">{star}.0</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-black rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters + Sorting */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex gap-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              className="px-3 py-1 border rounded-full text-sm hover:bg-orange-100"
            >
              {star} ★
            </button>
          ))}
        </div>
        <select className="border rounded px-3 py-1 text-sm">
          <option>Most Recent</option>
          <option>Highest Rating</option>
          <option>Lowest Rating</option>
        </select>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b pb-4 flex items-start justify-between"
          >
            <div className="flex gap-3">
              <User className="w-10 h-10 text-gray-400" />
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(review.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-800 mt-1">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {review.user} • {review.date}
                </p>
              </div>
            </div>
            <button className="flex items-center gap-1 text-gray-500 hover:text-orange-500">
              <ThumbsUp className="w-4 h-4" /> 0
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button className="px-3 py-1 border rounded hover:bg-orange-100">
          &lt;
        </button>
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className="px-3 py-1 border rounded hover:bg-orange-100"
          >
            {page}
          </button>
        ))}
        <button className="px-3 py-1 border rounded hover:bg-orange-100">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ProductReview;
