import React from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { DataGrid, GridDeleteIcon, GridAddIcon } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteUserActionItem from './DeleteUserActionItem';

export async function loader() {
    try {
        const tests = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/tests`
        );
        const tableCols = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/tests/cols`
        );
        return { tests: tests.data, tableCols: tableCols.data };
    } catch (error) {
        console.error(error);
    }
}

export default function Tests() {
    const { tests, tableCols } = useLoaderData();

    const cols = tableCols.map((col) => col.Field);
    const smallCols = ['codSimulado'];
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
                    table="simulado"
                />,
            ],
        },
    ];

    const rows = tests.map((test) => {
        return { id: test.codSimulado, ...test };
    });

    const handleAddClick = async () => {
        const data = {
            ano: '',
            idPerfil: null,
        };
        await axios
            .post(`${import.meta.env.VITE_API_URL}/api/tests`, data)
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

        console.log(updatedRow)

        // doesn't work with "idPerfil" attribute
        await axios
            .put(
                `${import.meta.env.VITE_API_URL}/api/tests/${
                    updatedRow.codSimulado
                }`,
                values
            )
            .then(res => console.log(res))
            .catch((error) => console.error(error));

        return updatedRow;
    };

    const handleDeleteClick = async (id) => {
        await axios
            .delete(`${import.meta.env.VITE_API_URL}/api/tests/${id}`)
            .then(() => location.reload())
            .catch((error) => console.error(error));
    };

    return (
        <div className="admin-child">
            <h3>Simulados</h3>
            <div className="tests">
                <div className="add">
                    <Button
                        color="primary"
                        onClick={handleAddClick}
                        startIcon={<GridAddIcon />}
                    >
                        Adicionar Simulado
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
