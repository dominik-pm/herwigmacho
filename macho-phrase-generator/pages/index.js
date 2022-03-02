import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Grid, IconButton, Typography } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import Phrase from '../components/Phrase'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'

export default function Home() {

    const [worddata, setWorddata] = useState('')
    const [phrase, setPhrase] = useState('')

    useEffect(async () => {
        const response = await fetch("./worddata.json")
        const jsonData = await response.json()

        setWorddata(jsonData)
    }, [])

    // won si wordsdata ändert, also nur am anfang beim einlesen, generier ma a neiche phrase
    useEffect(() => {
        generatePhrase()
    }, [worddata])


    function generatePhrase() {
        const phrases = worddata.phrases
        const nouns = worddata.nouns

        if (!phrases || !nouns) {
            console.log('Error loading phrases and nouns')
            console.log('worddata:', worddata)
            console.log('phrases:', phrases)
            console.log('nouns:', nouns)
            return
        }

        console.log(phrases)

        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
        console.log(randomPhrase)
        let phrase = 'test'

        setPhrase(randomPhrase)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Macho-Sprüche</title>
                <meta name="description" content="Macho-Sprüche Generator" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* Header */}
            <Grid container width="100%" alignItems="center" justifyContent="space-between" marginBottom={4}>
                <Grid item>
                    <Typography variant="h1">Macho sagt:</Typography>
                </Grid>
                <Grid item justifySelf="flex-end">
                    <IconButton onClick={generatePhrase}>
                        <RefreshIcon />
                    </IconButton>
                </Grid>
            </Grid>

            {/* Phrase Container */}
            <Grid container width="100%" direction="column" alignItems="center">
                <Grid item width="80%">
                    <Button onClick={generatePhrase} sx={{textTransform: 'none'}}>
                        <Phrase text={phrase}></Phrase>
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}