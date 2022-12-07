import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PageLayout from '../components/PageLayout'

export default function Home() {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <PageLayout title='My App desde index'>
        <p>Hola mundo</p>
        {/* navegar a la ruta /about */}
        <Link href="/about"> About</Link> 
        <button onClick={() => router.push('/about')}>About</button>
      </PageLayout>
    </div>
  )
}
