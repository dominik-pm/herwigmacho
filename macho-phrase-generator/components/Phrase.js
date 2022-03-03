import React from 'react'
import { Paper, Typography } from '@mui/material'

export default function Phrase({ text, maxCount }) {
    return (
        <Paper elevation={4} sx={{ padding: 4 }}>
            <Typography variant="h3">{text}</Typography>
            <Typography variant="body1">1/{maxCount}</Typography>
        </Paper>
    )
}
