import { create } from 'zustand';
import { mockPosts } from '../data/mockData';

const useModerationStore = create((set, get) => ({
  posts: mockPosts,
  loading: false,
  error: null,
  selectedPosts: [],
  currentFilter: 'pending',
  recentActions: [],

  // Filter posts by status
  getFilteredPosts: () => {
    const { posts, currentFilter } = get();
    return posts.filter(post => post.status === currentFilter);
  },

  // Get post counts for each status
  getStatusCounts: () => {
    const { posts } = get();
    return {
      pending: posts.filter(p => p.status === 'pending').length,
      approved: posts.filter(p => p.status === 'approved').length,
      rejected: posts.filter(p => p.status === 'rejected').length,
    };
  },

  // Set current filter
  setFilter: (filter) => set({ currentFilter: filter }),

  // Select/deselect posts
  togglePostSelection: (postId) => set((state) => ({
    selectedPosts: state.selectedPosts.includes(postId)
      ? state.selectedPosts.filter(id => id !== postId)
      : [...state.selectedPosts, postId]
  })),

  // Select all posts
  selectAllPosts: () => set((state) => ({
    selectedPosts: state.getFilteredPosts().map(post => post.id)
  })),

  // Clear selection
  clearSelection: () => set({ selectedPosts: [] }),

  // Approve posts
  approvePosts: (postIds) => set((state) => {
    const updatedPosts = state.posts.map(post =>
      postIds.includes(post.id) ? { ...post, status: 'approved' } : post
    );
    
    const action = {
      id: Date.now(),
      type: 'approve',
      postIds: [...postIds],
      timestamp: Date.now(),
    };

    return {
      posts: updatedPosts,
      selectedPosts: state.selectedPosts.filter(id => !postIds.includes(id)),
      recentActions: [action, ...state.recentActions.slice(0, 4)],
    };
  }),

  // Reject posts
  rejectPosts: (postIds, reason = '') => set((state) => {
    const updatedPosts = state.posts.map(post =>
      postIds.includes(post.id) 
        ? { ...post, status: 'rejected', rejectionReason: reason } 
        : post
    );
    
    const action = {
      id: Date.now(),
      type: 'reject',
      postIds: [...postIds],
      reason,
      timestamp: Date.now(),
    };

    return {
      posts: updatedPosts,
      selectedPosts: state.selectedPosts.filter(id => !postIds.includes(id)),
      recentActions: [action, ...state.recentActions.slice(0, 4)],
    };
  }),

  // Undo last action
  undoAction: (actionId) => set((state) => {
    const action = state.recentActions.find(a => a.id === actionId);
    if (!action) return state;

    const updatedPosts = state.posts.map(post => {
      if (action.postIds.includes(post.id)) {
        return { ...post, status: 'pending', rejectionReason: undefined };
      }
      return post;
    });

    return {
      posts: updatedPosts,
      recentActions: state.recentActions.filter(a => a.id !== actionId),
    };
  }),

  // Set loading state
  setLoading: (loading) => set({ loading }),

  // Set error
  setError: (error) => set({ error }),
}));

export default useModerationStore;
