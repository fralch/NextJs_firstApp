import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Card, Row, Text } from '@nextui-org/react'
import PageLayout from '../components/PageLayout'
import { Header } from '../components/Header'
import fs from 'fs/promises'; 



export default function Home({comics}) {
  return (
    <div > 
      <PageLayout>
        <Header />
        <main>
          <h2 className='text-3xl font-bold text-center'>Ultimos Comics</h2>
          
          <section className='grid grid-cols-1 gap-2  max-w-md m-auto sm:grid-cols-2 md:grid-cols-3 self-start'>
          {
            comics.map((comic) => {
              return (
                <Link href={'/comics/'+comic.id} key={comic.id}>
                   <h3 className='text-sm font-bold text-center'>{comic.safe_title}</h3>
                    <Image width={comic.width} height={comic.height} layout='intrinsic' objectFit='contain'  src={comic.img} alt={comic.alt}  />
                </Link>
              )
              
            })
          }
          </section>
        </main>
      </PageLayout>
    </div>
  )
}
export async function getStaticProps() {
  const Datos = await fs.readdir('./comics')
  const DatosLeidos = Datos.map(async (comic) => {
    const data = await fs.readFile(`./comics/${comic}`, 'utf-8')
    return JSON.parse(data)
  })
  const comics = await Promise.all(DatosLeidos); 
  console.log(comics)
  return {
    props: {
      comics
    },
  }
}
