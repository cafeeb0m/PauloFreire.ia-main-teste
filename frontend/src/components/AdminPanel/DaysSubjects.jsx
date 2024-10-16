import React from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { DataGrid, GridDeleteIcon, GridAddIcon } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteUserActionItem from './DeleteUserActionItem';

export async function loader() {
    try {
        const daysSubjects = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/daysSubjects`
        );
        const tableCols = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/daysSubjects/cols`
        );
        return { daysSubjects: daysSubjects.data, tableCols: tableCols.data };
    } catch (error) {
        console.error(error);
    }
}

export default function DaysSubjects() {
    const { daysSubjects, tableCols } = useLoaderData();

    const cols = tableCols.map((col) => col.Field);
    const smallCols = ['codDiaDisciplina'];
    const bigCols = [];

    let columns = cols.map((col, id) => {
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
                    table="dia-disciplina"
                />,
            ],
        },
    ];

    const rows = daysSubjects.map((daysSubject) => {
        return { id: daysSubject.codDiaDisciplina, ...daysSubject };
    });

    const handleAddClick = async () => {
        const data = {
            codDiaUtil: 1,
            codDisciplina: 1,
        };
        await axios
            .post(`${import.meta.env.VITE_API_URL}/api/daysSubjects`, data)
            .then(() => location.reload())
            .catch((error) => console.error(error));
    };

    const handleProcessRowUpdate = async (updatedRow, _originalRow) => {
        const values = {};

        for (let col in updatedRow) {
            if (col != 'id' && updatedRow.hasOwnProperty(col)) {
                values[col.toLowerCase()] = updatedRow[col];
            }
        }

        await axios
            .put(
                `${import.meta.env.VITE_API_URL}/api/daysSubjects/${
                    updatedRow.codDiaDisciplina
                }`,
                values
            )
            .catch((error) => console.error(error));

        return updatedRow;
    };

    const handleDeleteClick = async (id) => {
        await axios
            .delete(`${import.meta.env.VITE_API_URL}/api/daysSubjects/${id}`)
            .then(() => location.reload())
            .catch((error) => console.error(error));
    };

    return (
        <div className="admin-child">
            <h3>Dias / Disciplinas</h3>
            <div className="daysSubjects">
                <div className="add">
                    <Button
                        color="primary"
                        onClick={handleAddClick}
                        startIcon={<GridAddIcon />}
                    >
                        Adicionar Dia/Disciplina
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
