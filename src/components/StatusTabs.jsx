import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const StatusTabs = ({ currentFilter, onFilterChange, statusCounts }) => {
  const tabs = [
    {
      id: 'pending',
      label: 'Pending',
      icon: Clock,
      count: statusCounts.pending,
      color: 'border-orange-500 text-orange-600'
    },
    {
      id: 'approved',
      label: 'Approved',
      icon: CheckCircle,
      count: statusCounts.approved,
      color: 'border-green-500 text-green-600'
    },
    {
      id: 'rejected',
      label: 'Rejected',
      icon: XCircle,
      count: statusCounts.rejected,
      color: 'border-red-500 text-red-600'
    }
  ];

  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex space-x-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentFilter === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={`
                flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors
                ${isActive 
                  ? `${tab.color} border-current` 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <Icon className="h-4 w-4 mr-2" />
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                isActive ? 'bg-current bg-opacity-10' : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default StatusTabs;
