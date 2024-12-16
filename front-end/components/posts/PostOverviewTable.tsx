import React, { useState } from 'react';
import { Post } from '@types';

type Props = {
    posts: Array<Post>;
};

const PostOverviewTable: React.FC<Props> = ({ posts }: Props) => {
    return (
        <>
            {posts && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Content</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post, index) => (
                            <tr key={index} role="button">
                                <td>{post.name}</td>
                                <td>{post.description || 'No description'}</td>
                                <td>{post.createdAt ? post.createdAt.toLocaleString() : 'N/A'}</td>
                                {/* <td>{post.activity?.location || 'Unknown location'}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default PostOverviewTable;
