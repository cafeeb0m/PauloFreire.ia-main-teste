import React from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { DataGrid, GridDeleteIcon, GridAddIcon } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteUserActionItem from './DeleteUserActionItem';

export async function loader() {
    try {
        const topics = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/topics`
        );
        const tableCols = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/topics/cols`
        );
        return { topics: topics.data, tableCols: tableCols.data };
    } catch (error) {
        console.error(error);
    }
}

export default function Topics() {
    const { topics, tableCols } = useLoaderData();

    const cols = tableCols.map((col) => col.Field);
    const smallCols = ['codAssunto'];
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
                    table="assunto"
                />,
            ],
        },
    ];

    const rows = topics.map((topic) => {
        return { id: topic.codAssunto, ...topic };
    });

    const handleAddClick = async () => {
        const data = {
            titulo: '',
            conteudoTreino: '',
            codDisciplina: 1, // change column in database to accept "null"
            codChatBot: 1, // change column in database to accept "null"
        };
        await axios
            .post(`${import.meta.env.VITE_API_URL}/api/topics`, data)
            .then(() => location.reload())
            // .then((res) => console.log(res))
            .catch((error) => console.error(error));
    };

    const handleProcessRowUpdate = async (updatedRow, originalRow) => {
        const values = {};

        for (let col in updatedRow) {
            if (col != 'id' && updatedRow.hasOwnProperty(col)) {
                values[col.toLowerCase()] = updatedRow[col];
            }
        }

        if (updatedRow.codDisciplina !== originalRow.codDisciplina) {
            updatedRow.codDisciplina = parseInt(updatedRow.codDisciplina);
        }
        if (updatedRow.codChatBot !== originalRow.codChatBot) {
            updatedRow.codChatBot = parseInt(updatedRow.codChatBot);
        }

        // console.log(updatedRow);

        await axios
            .put(
                `${import.meta.env.VITE_API_URL}/api/topics/${
                    updatedRow.codAssunto
                }`,
                values
            )
            .then((res) => console.log(res))
            .catch((error) => console.error(error));

        return updatedRow;
    };

    const handleDeleteClick = async (id) => {
        await axios
            .delete(`${import.meta.env.VITE_API_URL}/api/topics/${id}`)
            .then(() => location.reload())
            .catch((error) => console.error(error));
    };

    return (
        <div className="admin-child">
            <h3>Assuntos</h3>
            <div className="topics">
                <div className="add">
                    <Button
                        color="primary"
                        onClick={handleAddClick}
                        startIcon={<GridAddIcon />}
                    >
                        Adicionar assunto
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
