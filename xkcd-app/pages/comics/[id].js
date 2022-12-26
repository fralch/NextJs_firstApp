import { Header } from './../../components/Header'
import Link from 'next/link'
import Image from 'next/image'
import {readFile, stat, readdir} from 'fs/promises'


export default function Comic({id, img, alt, title, width, height, tieneAntes, tieneDespues, prevId, nextId}) { // aqui se reciben los datos de cada ruta estatica
    return (
        <div>
            <Header />
            <main>
                <h2 className='text-3xl font-bold text-center'>{title}</h2>
                <section className='max-w-lg m-auto'>
                    <Image width={width} height={height} src={img} alt={alt} />
                    <p> {alt}</p>
                    {/* create pagination with nextId and prevId if available*/}
                    <div className='flex justify-between'>
                        {tieneAntes && (
                            <Link href={`/comics/${prevId}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                    Anterior 
                            </Link>
                        )}
                        {tieneDespues && (
                            <Link href={`/comics/${nextId}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                             
                                    Siguiente 
                                
                            </Link>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}

// aqui se genera las rutas estaticas
export async function getStaticPaths() {
    const files = await readdir('./comics'); // aqui se obtiene los archivos de la carpeta comics
    const paths = files.map(file => {
        const id = file.replace('.json', ''); // aqui se obtiene el id de cada archivo
        return { params: { id } } // aqui se crea la ruta estatica
    })

    return {
        paths,
        fallback: false
    };        
}

// aqui se obtiene los datos de cada ruta estatica
export async function getStaticProps({params}) {
    // console.log(params)
    const {id}= params; 
    const data = await readFile(`./comics/${id}.json`, 'utf-8')
    const comic = JSON.parse(data); 

    const idNumber = +id;
    const prevId = idNumber - 1;
    const nextId = idNumber + 1;

    const [prevResult, nextResult] = await Promise.allSettled([
        stat(`./comics/${prevId}.json`), 
        stat(`./comics/${nextId}.json`)
    ])
    const tieneAntes = prevResult.status === 'fulfilled';
    const tieneDespues = nextResult.status === 'fulfilled';
    return {
        props: {
            ... comic,
            tieneAntes, 
            tieneDespues,
            prevId,
            nextId
            }
    }
}