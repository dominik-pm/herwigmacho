import React from 'react'
import { Paper, Button, Typography } from '@mui/material'

export default function Phrase({text}) {
  return (

      <Paper elevation={2} sx={{padding: 4}}>
        <Typography variant="h1">Macho sagt:</Typography>
        <Typography variant="h2">{text}</Typography>
      </Paper>
  )
}
