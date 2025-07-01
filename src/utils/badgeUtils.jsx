import React from 'react';

export const getStatusBadge = (status) => {
  const badges = {
    pending: {
      className: 'bg-orange-100 text-orange-800 border-orange-200',
      text: 'Pending'
    },
    approved: {
      className: 'bg-green-100 text-green-800 border-green-200',
      text: 'Approved'
    },
    rejected: {
      className: 'bg-red-100 text-red-800 border-red-200',
      text: 'Rejected'
    }
  };

  const badge = badges[status] || badges.pending;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badge.className}`}>
      {badge.text}
    </span>
  );
};

export const getReportReasonBadge = (reason) => {
  const badges = {
    'Spam': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Harassment': 'bg-red-100 text-red-800 border-red-200',
    'Hate Speech': 'bg-purple-100 text-purple-800 border-purple-200',
    'Inappropriate Content': 'bg-pink-100 text-pink-800 border-pink-200',
    'Copyright': 'bg-blue-100 text-blue-800 border-blue-200',
    'Misinformation': 'bg-orange-100 text-orange-800 border-orange-200',
  };

  const className = badges[reason] || 'bg-gray-100 text-gray-800 border-gray-200';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}>
      {reason}
    </span>
  );
};