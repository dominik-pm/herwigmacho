import React from 'react'
import { Box, Button, Typography } from '@mui/material'

export default function Phrase({text}) {
  return (
      <Box>
        <Typography variant="h1">Macho</Typography>
        <Typography variant="h2">{text}</Typography>
      </Box>
  )
}
