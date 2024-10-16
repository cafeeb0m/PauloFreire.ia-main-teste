import React from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { DataGrid, GridDeleteIcon, GridAddIcon } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteUserActionItem from './DeleteUserActionItem';

export async function loader() {
    try {
        const subjects = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/subjects`
        );
        const tableCols = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/subjects/cols`
        );
        return { subjects: subjects.data, tableCols: tableCols.data };
    } catch (error) {
        console.error(error);
    }
}

export default function Subjects() {
    const { subjects, tableCols } = useLoaderData();

    const cols = tableCols.map((col) => col.Field);
    const smallCols = ['codDisciplina'];
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
                    table="disciplina"
                />,
            ],
        },
    ];

    const rows = subjects.map((subject) => {
        return { id: subject.codDisciplina, ...subject };
    });

    const handleAddClick = async () => {
        const data = {
            nome: '',
        };
        await axios
            .post(`${import.meta.env.VITE_API_URL}/api/subjects`, data)
            .then(() => location.reload())
            .catch((error) => console.error(error));
    };

    const handleProcessRowUpdate = async (updatedRow, originalRow) => {
        const values = {};

        for (let col in updatedRow) {
            if (col != 'id' && updatedRow.hasOwnProperty(col)) {
                values[col.toLowerCase()] = updatedRow[col];
            }
        }

        if (updatedRow.idPerfil !== originalRow.idPerfil) {
            updatedRow.idPerfil = parseInt(updatedRow.idPerfil);
        }

        console.log(updatedRow);

        await axios
            .put(
                `${import.meta.env.VITE_API_URL}/api/subjects/${
                    updatedRow.codDisciplina
                }`,
                values
            )
            .then((res) => console.log(res))
            .catch((error) => console.error(error));

        return updatedRow;
    };

    const handleDeleteClick = async (id) => {
        await axios
            .delete(`${import.meta.env.VITE_API_URL}/api/subjects/${id}`)
            .then(() => location.reload())
            .catch((error) => console.error(error));
    };

    return (
        <div className="admin-child">
            <h3>Disciplinas</h3>
            <div className="subjects">
                <div className="add">
                    <Button
                        color="primary"
                        onClick={handleAddClick}
                        startIcon={<GridAddIcon />}
                    >
                        Adicionar disciplina
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
