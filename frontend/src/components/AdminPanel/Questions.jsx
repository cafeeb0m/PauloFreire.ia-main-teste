import React from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { DataGrid, GridDeleteIcon, GridAddIcon } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteUserActionItem from './DeleteUserActionItem';

export async function loader() {
    try {
        const questions = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/questions`
        );
        const tableCols = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/questions/cols`
        );
        return { questions: questions.data, tableCols: tableCols.data };
    } catch (error) {
        console.error(error);
    }
}

export default function Questions() {
    const { questions, tableCols } = useLoaderData();

    const cols = tableCols.map((col) => col.Field);
    const smallCols = ['codQuestao'];
    const bigCols = ['Questao'];

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
                    table="questão"
                />,
            ],
        },
    ];

    const rows = questions.map((question) => {
        return { id: question.codQuestao, ...question };
    });

    const handleAddClick = async () => {
        const data = {
            questao: '',
            ano: '',
            numQuestao: 0,
            codSimulado: null,
            codChatBot: null,
        };
        await axios
            .post(`${import.meta.env.VITE_API_URL}/api/questions`, data)
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
                `${import.meta.env.VITE_API_URL}/api/questions/${
                    updatedRow.codQuestao
                }`,
                values
            )
            .then((res) => console.log(res))
            .catch((error) => console.error(error));

        return updatedRow;
    };

    const handleDeleteClick = async (id) => {
        await axios
            .delete(`${import.meta.env.VITE_API_URL}/api/questions/${id}`)
            .then(() => location.reload())
            .catch((error) => console.error(error));
    };

    return (
        <div className="admin-child">
            <h3>Questões</h3>
            <div className="questions">
                <div className="add">
                    <Button
                        color="primary"
                        onClick={handleAddClick}
                        startIcon={<GridAddIcon />}
                    >
                        Adicionar questão
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
