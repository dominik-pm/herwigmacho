import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Grid, IconButton } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import Phrase from '../components/Phrase'
import { useEffect, useState } from 'react'

export default function Home() {

  const [worddata, setWorddata] = useState('')
  const [phrase, setPhrase] = useState('')

  useEffect(async () => {
    const response = fetch("./worddata.json")
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
    
    setPhrase(phrase)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Macho-Sprüche</title>
        <meta name="description" content="Macho-Sprüche Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container width="100%" direction="column" justifyContent="center">
        <Grid item>
          <Phrase text={phrase}></Phrase>
        </Grid>
        <Grid item>
          <IconButton onClick={generatePhrase}>
            <RefreshIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  )
}