import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Phrase from './phrase'

export default function Home() {

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
      <Phrase text={getPhrase()}></Phrase>
    </div>
  )
}
