import { useEffect, useState } from 'react'  
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PageLayout from '../components/PageLayout'

export default function Home() {
  const [articles , setArticles] = useState([]) 

  const router = useRouter()

  useEffect(() => {
    fetch('https://newsapi.org/v2/everything?q=apple&from=2022-12-06&to=2022-12-06&sortBy=popularity&apiKey=a907e6a4cb7d479fb55abdae7f4a35a2')
      .then(response => response.json())
      .then(json => {
        const { articles } = json
        setArticles(articles)
      })

  }, [])
  return (
    <div className={styles.container}>
      <PageLayout title='My App desde index'>
        <p>Hola mundo</p>
        {/* navegar a la ruta /about */}
        <Link href="/about"> About</Link> 
        <button onClick={() => router.push('/about')}>About</button>
        {articles.length === 0 && <p>Cargando...</p>}
        {articles.length > 0 && articles.map((article, index) => (
          <div key={index}>
            <img src={article.urlToImage} alt={article.title} width={450} height={300} />
            <h3>{article.title}</h3>
            <p>{article.description}</p>
          </div>
        ))
}
      </PageLayout>
    </div>
  )
}
