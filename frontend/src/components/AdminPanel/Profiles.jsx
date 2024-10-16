import React from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { DataGrid, GridDeleteIcon, GridAddIcon } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteUserActionItem from './DeleteUserActionItem';

export async function loader() {
    try {
        const profiles = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/profiles`
        );
        const tableCols = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/profiles/cols`
        );
        return { profiles: profiles.data, tableCols: tableCols.data };
    } catch (error) {
        console.error(error);
    }
}

export default function Profiles() {
    const { profiles, tableCols } = useLoaderData();

    const cols = tableCols.map((col) => col.Field);
    const smallCols = ['idPerfil', 'Adm'];
    const bigCols = ['Email'];

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
                    table="perfil"
                />,
            ],
        },
    ];

    const rows = profiles.map((profile) => {
        return { id: profile.idPerfil, ...profile };
    });

    const handleAddClick = async () => {
        const data = {
            nome: '',
            email: '',
            senha: '',
            adm: 0,
            foto: null,
            organizacao: '',
            codAgenda: null,
        };
        await axios
            .post(`${import.meta.env.VITE_API_URL}/api/profiles`, data)
            .then(() => location.reload())
            .catch((error) => console.error(error));
    };

    const handleProcessRowUpdate = async (updatedRow, _originalRow) => {
        const values = {};
        const colsNotToLowerCase = ['codAgenda'];

        for (let col in updatedRow) {
            if (col != 'id' && updatedRow.hasOwnProperty(col)) {
                if (colsNotToLowerCase.includes(col)) {
                    values[col] = parseInt(updatedRow[col]);
                    continue;
                }
                values[col.toLowerCase()] = updatedRow[col];
            }
        }

        await axios
            .put(
                `${import.meta.env.VITE_API_URL}/api/profiles/${
                    updatedRow.idPerfil
                }`,
                values
            )
            // .then((res) => console.log(res))
            .catch((error) => console.error(error));

        return updatedRow;
    };

    const handleDeleteClick = async (id) => {
        await axios
            .delete(`${import.meta.env.VITE_API_URL}/api/profiles/${id}`)
            .then(() => location.reload())
            .catch((error) => console.error(error));
    };

    return (
        <div className="admin-child">
            <h3>Perfis</h3>
            <div className="profiles">
                <div className="add">
                    <Button
                        color="primary"
                        onClick={handleAddClick}
                        startIcon={<GridAddIcon />}
                    >
                        Adicionar perfil
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
