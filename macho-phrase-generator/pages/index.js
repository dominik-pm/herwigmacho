import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import {} from '@mui'

export default function Home() {

  const schnellzug = ''

  function getPhrase() {
    return 'A oida mau is ka schnözug'
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Macho-Sprüche</title>
        <meta name="description" content="Macho-Sprüche Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Macho</h1>
      <h2>{getPhrase()}</h2>
    </div>
  )
}
