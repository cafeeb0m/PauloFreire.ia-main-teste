import React from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { DataGrid, GridDeleteIcon, GridAddIcon } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteUserActionItem from './DeleteUserActionItem';

export async function loader() {
    try {
        const chats = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/chats`
        );
        const tableCols = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/chats/cols`
        );
        return { chats: chats.data, tableCols: tableCols.data };
    } catch (error) {
        console.error(error);
    }
}

export default function Chats() {
    const { chats, tableCols } = useLoaderData();

    const cols = tableCols.map((col) => col.Field);
    const smallCols = ['codChat'];
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
            editable: col === 'idPerfil' ? true : col !== 'id',
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
                    table="chat"
                />,
            ],
        },
    ];

    const rows = chats.map((chat) => {
        return { id: chat.codChat, ...chat };
    });

    const handleAddClick = async () => {
        const data = {
            mensagem: '',
            input: 0,
            codChatBot: null,
            idPerfil: null,
        };
        await axios
            .post(`${import.meta.env.VITE_API_URL}/api/chats`, data)
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

        // doesn't work with "idPerfil" attribute
        await axios
            .put(
                `${import.meta.env.VITE_API_URL}/api/chats/${
                    updatedRow.codChat
                }`,
                values
            )
            .then((res) => console.log(res))
            .catch((error) => console.error(error));

        return updatedRow;
    };

    const handleDeleteClick = async (id) => {
        await axios
            .delete(`${import.meta.env.VITE_API_URL}/api/chats/${id}`)
            .then(() => location.reload())
            .catch((error) => console.error(error));
    };

    return (
        <div className="admin-child">
            <h3>Chats</h3>
            <div className="chats">
                <div className="add">
                    <Button
                        color="primary"
                        onClick={handleAddClick}
                        startIcon={<GridAddIcon />}
                    >
                        Adicionar Chat
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
