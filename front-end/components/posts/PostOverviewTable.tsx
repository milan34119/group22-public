import React, { useState } from 'react';
import { Post } from '@types';

type Props = {
  posts: Array<Post>;
};

const PostOverviewTable: React.FC<Props> = ({ posts }: Props) => {
  const selectedPost = useState<Post|null>
  return (
    <>
      {posts && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">title</th>
              <th scope="col">content</th>
              <th scope="col">created at</th>
              <th scope="col">location</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index} onClick={() => {}} role="button">
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>{String(post.createdAt)}</td>
                <td>{post.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default PostOverviewTable;
