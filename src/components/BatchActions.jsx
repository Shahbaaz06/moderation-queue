import React from "react";
import { Check, X, Trash2 } from "lucide-react";

const BatchActions = ({ selectedCount, onApprove, onReject, onClear }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-sm font-medium text-blue-900">
            {selectedCount} post{selectedCount !== 1 ? "s" : ""} selected
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onApprove}
            className="btn-success text-sm"
            title="Approve selected posts (A)"
          >
            <div className="flex items-center ">
              <Check className="h-4 w-4 mr-1" />
              Approve All
            </div>
          </button>

          <button
            onClick={onReject}
            className="btn-danger text-sm"
            title="Reject selected posts (R)"
          >
            <div className="flex items-center ">
              <X className="h-4 w-4 mr-1" />
              Reject All
            </div>
          </button>

          <button
            onClick={onClear}
            className="btn-outline text-sm"
            title="Clear selection (Esc)"
          >
            <div className="flex items-center ">
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchActions;
