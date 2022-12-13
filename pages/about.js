import PageLayout from "../components/PageLayout";
const about = ({articles}) => {
    return (
        <PageLayout title="About">
            <h1>About / service side rendering</h1>
            {articles.length === 0 && <p>Sin articulos</p>}
            {articles.length > 0 && articles.map((article, index) => (
                <div key={index}>
                    <img src={article.urlToImage} alt={article.title} />
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                </div>
            ))}
        </PageLayout>
    );
};
export default about;

//N request -> 1 ejecucion
export async function getStaticProps() {
    const res = await fetch(`https://newsapi.org/v2/everything?q=apple&from=2022-12-06&to=2022-12-06&sortBy=popularity&apiKey=a907e6a4cb7d479fb55abdae7f4a35a2`);
    const articles = await res.json();
    return {    
        props: {
            articles: articles.articles,
        },
    };
}

//N request -> N ejecucion

// export async function getServerSideProps() {
//     const res = await fetch(`https://newsapi.org/v2/everything?q=apple&from=2022-12-06&to=2022-12-06&sortBy=popularity&apiKey=a907e6a4cb7d479fb55abdae7f4a35a2`);
//     const articles = await res.json();
//     return {    
//         props: {
//             articles: articles.articles,
//         },
//     };
// }
