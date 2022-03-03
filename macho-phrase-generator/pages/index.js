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
    const [maxCombinations, setMaxCombinations] = useState(0)

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

        let randomPhrase = getRandomPhrase(phrases)
        console.log(randomPhrase)

        randomPhrase.split(' ').forEach(w => {
            if (w[0] == '{') {
                let word = ''

                const command = w.replace('{', '').replace('}', '')
                console.log('command:' + command)
                const args = command.split(':')
                const type = args[0]
                let wordData = {}
                console.log('type: ' + type);
                switch (type) {
                    case 'noun':
                        wordData = getRandomNoun(nouns)
                        break
                    default:
                        break
                }
                console.log('worddata:', wordData)

                if (wordData) {
                    word = wordData['word']
                    console.log('word:', word)

                    if (args[1]) {
                        switch (args[1]) {
                            case 'article_d':
                                word = `${wordData['article_d']} ${word}`
                                break
                            case 'article_e':
                                word = `${wordData['article_e']} ${word}`
                                break
                            default:
                                break
                        }
                    }
                }

                // w = word
                randomPhrase = randomPhrase.replace(w, word)
            }
        })

        setPhrase(randomPhrase)
    }
    function getRandomNoun(nouns) {
        return nouns[Math.floor(Math.random() * nouns.length)]
    }
    function getRandomPhrase(phrases) {
        return phrases[Math.floor(Math.random() * phrases.length)]
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
                <Grid item>
                    <Button onClick={generatePhrase} sx={{textTransform: 'none'}}>
                        <Phrase text={phrase} maxCount={maxCombinations}></Phrase>
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}