import React from 'react'
import { Paper, Typography } from '@mui/material'

export default function Phrase({ text }) {
    return (
        <Paper elevation={4} sx={{ padding: 4 }}>
            <Typography variant="h2">{text}</Typography>
        </Paper>
    )
}
