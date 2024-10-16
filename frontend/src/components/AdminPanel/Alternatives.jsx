import React from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { DataGrid, GridDeleteIcon, GridAddIcon } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteUserActionItem from './DeleteUserActionItem';

export async function loader() {
    try {
        const alternatives = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/alternatives`
        );
        const tableCols = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/alternatives/cols`
        );
        return { alternatives: alternatives.data, tableCols: tableCols.data };
    } catch (error) {
        console.error(error);
    }
}

export default function Alternatives() {
    const { alternatives, tableCols } = useLoaderData();

    const cols = tableCols.map((col) => col.Field);
    const smallCols = ['codAlternativa'];
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
                    table="alternativa"
                />,
            ],
        },
    ];

    const rows = alternatives.map((alternative) => {
        return { id: alternative.codAlternativa, ...alternative };
    });

    const handleAddClick = async () => {
        const data = {
            alternativa: '',
            correta: false,
            codQuestao: null,
        };
        await axios
            .post(`${import.meta.env.VITE_API_URL}/api/alternatives`, data)
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
                `${import.meta.env.VITE_API_URL}/api/alternatives/${
                    updatedRow.codAlternativa
                }`,
                values
            )
            .then((res) => console.log(res))
            .catch((error) => console.error(error));

        return updatedRow;
    };

    const handleDeleteClick = async (id) => {
        await axios
            .delete(`${import.meta.env.VITE_API_URL}/api/alternatives/${id}`)
            .then(() => location.reload())
            .catch((error) => console.error(error));
    };

    return (
        <div className="admin-child">
            <h3>Alternativas</h3>
            <div className="alternatives">
                <div className="add">
                    <Button
                        color="primary"
                        onClick={handleAddClick}
                        startIcon={<GridAddIcon />}
                    >
                        Adicionar alternativa
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
