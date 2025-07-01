import React from 'react';
import { Inbox, CheckCircle, XCircle } from 'lucide-react';
import useModerationStore from '../store/moderationStore';

const EmptyState = () => {
  const { currentFilter } = useModerationStore();

  const getEmptyStateContent = () => {
    switch (currentFilter) {
      case 'pending':
        return {
          icon: <Inbox className="h-12 w-12 text-gray-400" />,
          title: 'No pending posts',
          description: 'All posts have been reviewed. Great job!',
        };
      case 'approved':
        return {
          icon: <CheckCircle className="h-12 w-12 text-green-400" />,
          title: 'No approved posts',
          description: 'Approved posts will appear here.',
        };
      case 'rejected':
        return {
          icon: <XCircle className="h-12 w-12 text-red-400" />,
          title: 'No rejected posts',
          description: 'Rejected posts will appear here.',
        };
      default:
        return {
          icon: <Inbox className="h-12 w-12 text-gray-400" />,
          title: 'No posts found',
          description: 'No posts match the current filter.',
        };
    }
  };

  const { icon, title, description } = getEmptyStateContent();

  return (
    <div className="text-center py-12">
      <div className="mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default EmptyState;