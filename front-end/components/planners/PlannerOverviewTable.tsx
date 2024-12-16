import React, { useState } from 'react';
import { Planner } from '@types';

type Props = {
    planners: Array<Planner>;
};

const PlannerOverviewTable: React.FC<Props> = ({ planners }: Props) => {
    return (
        <>
            {planners && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planners.map((planner, index) => (
                            <tr key={index} role="button">
                                <td>{planner.name}</td>
                                <td>{planner.description || 'No description'}</td>
                                {/* <td>{post.activity?.location || 'Unknown location'}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default PlannerOverviewTable;
