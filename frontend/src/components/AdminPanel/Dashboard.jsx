import React from 'react';
import axios from 'axios';
import { useLoaderData, useNavigate } from 'react-router-dom';

export async function loader() {
    try {
        const countsData = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/counts`
        );
        return { countsData: countsData.data };
    } catch (error) {
        console.error(error);
    }
}
export default function Dashboard() {
    const { countsData } = useLoaderData();
    const navigate = useNavigate();

    const tables = Object.keys(countsData);

    const counts = Object.values(countsData)
        .map((count) => Object.values(count[0]))
        .map((count) => count[0]);

    const routes = [
        'profiles/',
        'chatbots/',
        'schedule/',
        'subjects/',
        'subjects/topics/',
        'subjects/questions',
        'tests/',
    ];

    const countsObj = counts.map((count, id) => {
        return { table: tables[id], count: count, route: routes[id] };
    });

    return (
        <div className="admin-child">
            <h3>Dashboard</h3>
            <div className="dashboard">
                {countsObj.map((count, id) => (
                    <div key={id} className="table" onClick={() => navigate(count.route)}>
                        {count.table}: {count.count}
                    </div>
                ))}
            </div>
        </div>
    );
}
