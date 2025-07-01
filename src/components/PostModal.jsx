import React from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Calendar,
  Flag,
  Check,
  Ban,
} from "lucide-react";
import { formatDistanceToNow } from "../utils/dateUtils";
import { getStatusBadge, getReportReasonBadge } from "../utils/badgeUtils";

const PostModal = ({
  post,
  posts,
  onClose,
  onApprove,
  onReject,
  onNavigate,
}) => {
  const currentIndex = posts.findIndex((p) => p.id === post.id);
  const canNavigatePrev = currentIndex > 0;
  const canNavigateNext = currentIndex < posts.length - 1;
  const isPending = post.status === "pending";

  const handlePrevious = () => {
    if (canNavigatePrev) {
      onNavigate(posts[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (canNavigateNext) {
      onNavigate(posts[currentIndex + 1]);
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Escape":
        onClose();
        break;
      case "ArrowLeft":
        if (canNavigatePrev) handlePrevious();
        break;
      case "ArrowRight":
        if (canNavigateNext) handleNext();
        break;
      case "a":
      case "A":
        if (isPending) {
          e.preventDefault();
          onApprove(post.id);
        }
        break;
      case "r":
      case "R":
        if (isPending) {
          e.preventDefault();
          onReject(post.id);
        }
        break;
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [post.id, currentIndex, isPending]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Post Details
            </h2>
            <span className="text-sm text-gray-500">
              {currentIndex + 1} of {posts.length}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Navigation */}
            <button
              onClick={handlePrevious}
              disabled={!canNavigatePrev}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Previous post (←)"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={handleNext}
              disabled={!canNavigateNext}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Next post (→)"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
              title="Close modal (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{post.author.username}</span>
            </div>

            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Reported {formatDistanceToNow(post.reportedAt)}</span>
            </div>

            <div className="flex items-center">
              <Flag className="h-4 w-4 mr-1" />
              <span>{post.reportCount} reports</span>
            </div>
          </div>

          {/* Status and Reason Badges */}
          <div className="flex items-center space-x-3 mb-6">
            {getStatusBadge(post.status)}
            {getReportReasonBadge(post.reportedReason)}
          </div>

          {/* Image if available */}
          {post.imageUrl && (
            <div className="mb-6">
              <img
                src={post.imageUrl}
                alt="Post content"
                className="rounded-lg max-w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose max-w-none mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Content
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {post.content}
              </p>
            </div>
          </div>

          {/* Rejection Reason */}
          {post.rejectionReason && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Rejection Reason
              </h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">{post.rejectionReason}</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {isPending && (
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => onApprove(post.id)}
              className="btn-success"
              title="Approve post (A)"
            >
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2" />
                Approve
              </div>
            </button>

            <button
              onClick={() => onReject(post.id)}
              className="btn-danger"
              title="Reject post (R)"
            >
              <div className="flex items-center">
                <Ban className="h-4 w-4 mr-2" />
                Reject
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostModal;
