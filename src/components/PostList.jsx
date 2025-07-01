import React from 'react';
import PostItem from './PostItem';
import EmptyState from './EmptyState';

const PostList = ({ posts, onPostClick, onApprove, onReject }) => {
  if (posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onClick={() => onPostClick(post)}
          onApprove={() => onApprove(post.id)}
          onReject={() => onReject(post.id)}
        />
      ))}
    </div>
  );
};

export default PostList;