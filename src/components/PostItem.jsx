import React from "react";
import { formatDistanceToNow } from "../utils/dateUtils";
import { getStatusBadge, getReportReasonBadge } from "../utils/badgeUtils";
import useModerationStore from "../store/moderationStore";
import { User, Calendar, Flag, MessageSquare } from "lucide-react";

const PostItem = ({ post, onClick, onApprove, onReject }) => {
  const { selectedPosts, togglePostSelection } = useModerationStore();
  const isSelected = selectedPosts.includes(post.id);
  const isPending = post.status === "pending";

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    togglePostSelection(post.id);
  };

  const handleApprove = (e) => {
    e.stopPropagation();
    onApprove();
  };

  const handleReject = (e) => {
    e.stopPropagation();
    onReject();
  };

  return (
    <div
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer
        transition-all duration-200 hover:shadow-md hover:border-gray-300
        ${isSelected ? "ring-2 ring-blue-500 border-blue-300" : ""}
      `}
    >
      <div className="flex items-start space-x-4">
        {/* Checkbox */}
        <div className="flex-shrink-0 mt-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0" onClick={onClick}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {post.title}
              </h3>

              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{post.author.username}</span>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDistanceToNow(post.reportedAt)}</span>
                </div>

                <div className="flex items-center">
                  <Flag className="h-4 w-4 mr-1" />
                  <span>{post.reportCount} reports</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-3">
                {getStatusBadge(post.status)}
                {getReportReasonBadge(post.reportedReason)}
              </div>

              <div className="flex items-start">
                <MessageSquare className="h-4 w-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                <p className="text-gray-600 text-sm line-clamp-2">
                  {post.content}
                </p>
              </div>
            </div>

            {/* Actions */}
            {isPending && (
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={handleApprove}
                  className="btn-success text-sm px-3 py-1"
                  title="Approve post (A)"
                >
                  Approve
                </button>
                <button
                  onClick={handleReject}
                  className="btn-danger text-sm px-3 py-1"
                  title="Reject post (R)"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
