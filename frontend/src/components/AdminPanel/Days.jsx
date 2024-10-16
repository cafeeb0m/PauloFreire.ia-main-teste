import React from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { DataGrid, GridDeleteIcon, GridAddIcon } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteUserActionItem from './DeleteUserActionItem';

export async function loader() {
    try {
        const days = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/days`
        );
        const tableCols = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/days/cols`
        );
        return { days: days.data, tableCols: tableCols.data };
    } catch (error) {
        console.error(error);
    }
}

export default function Days() {
    const { days, tableCols } = useLoaderData();

    const cols = tableCols.map((col) => col.Field);
    const smallCols = ['codDiaUtil'];
    const bigCols = ['Dia'];

    let columns = cols.map((col, id) => {
        if (col === 'Dia') {
            return {
                field: 'date',
                headerName: 'Dia',
                width: 180,
                type: 'date',
                editable: true,
                valueGetter: (value) => value && new Date(value),
            };
        }

        return {
            field: col,
            headerName: id === 0 ? 'ID' : col,
            width: smallCols.includes(col)
                ? 70
                : bigCols.includes(col)
                ? 200
                : 150,
            editable: col !== 'id',
        };
    });
    columns = [
        ...columns,
        {
            field: 'actions',
            headerName: 'Ações',
            width: 100,
            type: 'actions',
            getActions: ({ id }) => [
                <DeleteUserActionItem
                    label="Delete"
                    icon={<GridDeleteIcon />}
                    deleteUser={() => handleDeleteClick(id)}
                    table="dia"
                />,
            ],
        },
    ];

    const rows = days.map((day) => {
        return { id: day.codDiaUtil, date: day.Dia, ...day };
    });

    const handleAddClick = async () => {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        const data = {
            dia: formattedDate,
            codAgenda: null,
        };
        await axios
            .post(`${import.meta.env.VITE_API_URL}/api/days`, data)
            .then(() => location.reload())
            .catch((error) => console.error(error));
    };

    const handleProcessRowUpdate = async (updatedRow, originalRow) => {
        const values = {};

        for (let col in updatedRow) {
            if (col != 'id' && col != 'Dia' && updatedRow.hasOwnProperty(col)) {
                if (col == 'date') {
                    values['dia'] = updatedRow[col];
                } else {
                    values[col.toLowerCase()] = updatedRow[col];
                }
            }
        }

        await axios
            .put(
                `${import.meta.env.VITE_API_URL}/api/days/${
                    updatedRow.codDiaUtil
                }`,
                values
            )
            .then((res) => console.log(res))
            .catch((error) => console.error(error));

        return updatedRow;
    };

    const handleDeleteClick = async (id) => {
        await axios
            .delete(`${import.meta.env.VITE_API_URL}/api/days/${id}`)
            .then(() => location.reload())
            .catch((error) => console.error(error));
    };

    return (
        <div className="admin-child">
            <h3>Dia</h3>
            <div className="days">
                <div className="add">
                    <Button
                        color="primary"
                        onClick={handleAddClick}
                        startIcon={<GridAddIcon />}
                    >
                        Adicionar Dia
                    </Button>
                </div>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    processRowUpdate={handleProcessRowUpdate}
                    sx={{ px: 2 }}
                />
            </div>
        </div>
    );
}
