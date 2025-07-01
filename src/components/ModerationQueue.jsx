import React, { useState, useEffect } from 'react';
import useModerationStore from '../store/moderationStore';
import PostList from './PostList';
import StatusTabs from './StatusTabs';
import BatchActions from './BatchActions';
import PostModal from './PostModal';
import Toast from './Toast';
import ConfirmationDialog from './ConfirmationDialog';
import { AlertCircle, Users, Clock } from 'lucide-react';

const ModerationQueue = () => {
  const {
    posts,
    loading,
    error,
    selectedPosts,
    currentFilter,
    getFilteredPosts,
    getStatusCounts,
    setFilter,
    clearSelection,
    approvePosts,
    rejectPosts,
    recentActions,
    undoAction
  } = useModerationStore();

  const [modalPost, setModalPost] = useState(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectPostIds, setRejectPostIds] = useState([]);
  const [toast, setToast] = useState(null);

  const filteredPosts = getFilteredPosts();
  const statusCounts = getStatusCounts();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key.toLowerCase()) {
        case 'a':
          if (selectedPosts.length > 0) {
            e.preventDefault();
            handleApprove(selectedPosts);
          }
          break;
        case 'r':
          if (selectedPosts.length > 0) {
            e.preventDefault();
            handleRejectClick(selectedPosts);
          }
          break;
        case ' ':
          if (selectedPosts.length === 1) {
            e.preventDefault();
            const post = posts.find(p => p.id === selectedPosts[0]);
            if (post) setModalPost(post);
          }
          break;
        case 'escape':
          e.preventDefault();
          if (modalPost) setModalPost(null);
          else if (selectedPosts.length > 0) clearSelection();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPosts, posts, modalPost, clearSelection]);

  const handleApprove = (postIds) => {
    approvePosts(postIds);
    showToast(`${postIds.length} post(s) approved`, 'success');
  };

  const handleRejectClick = (postIds) => {
    setRejectPostIds(postIds);
    setShowRejectDialog(true);
  };

  const handleRejectConfirm = (reason) => {
    rejectPosts(rejectPostIds, reason);
    setShowRejectDialog(false);
    setRejectPostIds([]);
    showToast(`${rejectPostIds.length} post(s) rejected`, 'error');
  };

  const showToast = (message, type) => {
    const toastData = {
      id: Date.now(),
      message,
      type,
      action: recentActions[0]
    };
    setToast(toastData);
    setTimeout(() => setToast(null), 5000);
  };

  const handleUndo = (actionId) => {
    undoAction(actionId);
    setToast(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Content Moderation Queue
        </h1>
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{statusCounts.pending} pending reviews</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{posts.length} total posts</span>
          </div>
        </div>
      </div>

      {/* Keyboard shortcuts help */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Keyboard Shortcuts:</h3>
        <div className="text-sm text-blue-700 space-x-4">
          <span><kbd className="px-1 py-0.5 bg-white rounded">A</kbd> Approve</span>
          <span><kbd className="px-1 py-0.5 bg-white rounded">R</kbd> Reject</span>
          <span><kbd className="px-1 py-0.5 bg-white rounded">Space</kbd> Preview</span>
          <span><kbd className="px-1 py-0.5 bg-white rounded">Esc</kbd> Close/Clear</span>
        </div>
      </div>

      {/* Status Tabs */}
      <StatusTabs
        currentFilter={currentFilter}
        onFilterChange={setFilter}
        statusCounts={statusCounts}
      />

      {/* Batch Actions */}
      {selectedPosts.length > 0 && (
        <BatchActions
          selectedCount={selectedPosts.length}
          onApprove={() => handleApprove(selectedPosts)}
          onReject={() => handleRejectClick(selectedPosts)}
          onClear={clearSelection}
        />
      )}

      {/* Post List */}
      <PostList
        posts={filteredPosts}
        onPostClick={setModalPost}
        onApprove={(postId) => handleApprove([postId])}
        onReject={(postId) => handleRejectClick([postId])}
      />

      {/* Post Modal */}
      {modalPost && (
        <PostModal
          post={modalPost}
          posts={filteredPosts}
          onClose={() => setModalPost(null)}
          onApprove={(postId) => handleApprove([postId])}
          onReject={(postId) => handleRejectClick([postId])}
          onNavigate={setModalPost}
        />
      )}

      {/* Confirmation Dialog */}
      {showRejectDialog && (
        <ConfirmationDialog
          title="Reject Posts"
          message={`Are you sure you want to reject ${rejectPostIds.length} post(s)?`}
          onConfirm={handleRejectConfirm}
          onCancel={() => setShowRejectDialog(false)}
          requireReason={true}
        />
      )}

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          onUndo={toast.action ? () => handleUndo(toast.action.id) : null}
        />
      )}
    </div>
  );
};

export default ModerationQueue;





// import React, { useState, useEffect } from 'react';
// import useModerationStore from '../store/moderationStore';
// import PostList from './PostList';
// import StatusTabs from './StatusTabs';
// import BatchActions from './BatchActions';
// import PostModal from './PostModal';
// import Toast from './Toast';
// import ConfirmationDialog from './ConfirmationDialog';
// import { AlertCircle, Users, Clock } from 'lucide-react';

// const ModerationQueue = () => {
//   const {
//     posts,
//     loading,
//     error,
//     selectedPosts,
//     currentFilter,
//     getFilteredPosts,
//     getStatusCounts,
//     setFilter,
//     clearSelection,
//     approvePosts,
//     rejectPosts,
//     recentActions,
//     undoAction
//   } = useModerationStore();

//   const [modalPost, setModalPost] = useState(null);
//   const [showRejectDialog, setShowRejectDialog] = useState(false);
//   const [rejectPostIds, setRejectPostIds] = useState([]);
//   const [toast, setToast] = useState(null);

//   const filteredPosts = getFilteredPosts();
//   const statusCounts = getStatusCounts();

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       // Don't trigger shortcuts when typing in inputs
//       if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

//       switch (e.key.toLowerCase()) {
//         case 'a':
//           if (selectedPosts.length > 0) {
//             e.preventDefault();
//             handleApprove(selectedPosts);
//           }
//           break;
//         case 'r':
//           if (selectedPosts.length > 0) {
//             e.preventDefault();
//             handleRejectClick(selectedPosts);
//           }
//           break;
//         case ' ':
//           if (selectedPosts.length === 1) {
//             e.preventDefault();
//             const post = posts.find(p => p.id === selectedPosts[0]);
//             if (post) setModalPost(post);
//           }
//           break;
//         case 'escape':
//           e.preventDefault();
//           if (modalPost) setModalPost(null);
//           else if (selectedPosts.length > 0) clearSelection();
//           break;
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [selectedPosts, posts, modalPost, clearSelection]);

//   const handleApprove = (postIds) => {
//     approvePosts(postIds);
//     showToast(`${postIds.length} post(s) approved`, 'success');
//   };

//   const handleRejectClick = (postIds) => {
//     setRejectPostIds(postIds);
//     setShowRejectDialog(true);
//   };

//   const handleRejectConfirm = (reason) => {
//     rejectPosts(rejectPostIds, reason);
//     setShowRejectDialog(false);
//     setRejectPostIds([]);
//     showToast(`${rejectPostIds.length} post(s) rejected`, 'error');
//   };

//   const showToast = (message, type) => {
//     const toastData = {
//       id: Date.now(),
//       message,
//       type,
//       action: recentActions[0]
//     };
//     setToast(toastData);
//     setTimeout(() => setToast(null), 5000);
//   };

//   const handleUndo = (actionId) => {
//     undoAction(actionId);
//     setToast(null);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
//           <p className="text-gray-600">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//           Content Moderation Queue
//         </h1>
//         <div className="flex items-center space-x-6 text-sm text-gray-600">
//           <div className="flex items-center">
//             <Clock className="h-4 w-4 mr-1" />
//             <span>{statusCounts.pending} pending reviews</span>
//           </div>
//           <div className="flex items-center">
//             <Users className="h-4 w-4 mr-1" />
//             <span>{posts.length} total posts</span>
//           </div>
//         </div>
//       </div>

//       {/* Keyboard shortcuts help */}
//       <div className="mb-6 p-4 bg-blue-50 rounded-lg">
//         <h3 className="font-medium text-blue-900 mb-2">Keyboard Shortcuts:</h3>
//         <div className="text-sm text-blue-700 space-x-4">
//           <span><kbd className="px-1 py-0.5 bg-white rounded">A</kbd> Approve</span>
//           <span><kbd className="px-1 py-0.5 bg-white rounded">R</kbd> Reject</span>
//           <span><kbd className="px-1 py-0.5 bg-white rounded">Space</kbd> Preview</span>
//           <span><kbd className="px-1 py-0.5 bg-white rounded">Esc</kbd> Close/Clear</span>
//         </div>
//       </div>

//       {/* Status Tabs */}
//       <StatusTabs
//         currentFilter={currentFilter}
//         onFilterChange={setFilter}
//         statusCounts={statusCounts}
//       />

//       {/* Batch Actions */}
//       {selectedPosts.length > 0 && (
//         <BatchActions
//           selectedCount={selectedPosts.length}
//           onApprove={() => handleApprove(selectedPosts)}
//           onReject={() => handleRejectClick(selectedPosts)}
//           onClear={clearSelection}
//         />
//       )}

//       {/* Post List */}
//       <PostList
//         posts={filteredPosts}
//         onPostClick={setModalPost}
//         onApprove={(postId) => handleApprove([postId])}
//         onReject={(postId) => handleRejectClick([postId])}
//       />

//       {/* Post Modal */}
//       {modalPost && (
//         <PostModal
//           post={modalPost}
//           posts={filteredPosts}
//           onClose={() => setModalPost(null)}
//           onApprove={(postId) => handleApprove([postId])}
//           onReject={(postId) => handleRejectClick([postId])}
//           onNavigate={setModalPost}
//         />
//       )}

//       {/* Confirmation Dialog */}
//       {showRejectDialog && (
//         <ConfirmationDialog
//           title="Reject Posts"
//           message={`Are you sure you want to reject ${rejectPostIds.length} post(s)?`}
//           onConfirm={handleRejectConfirm}
//           onCancel={() => setShowRejectDialog(false)}
//           requireReason={true}
//         />
//       )}

//       {/* Toast Notifications */}
//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//           onUndo={toast.action ? () => handleUndo(toast.action.id) : null}
//         />
//       )}
//     </div>
//   );
// };

// export default ModerationQueue;