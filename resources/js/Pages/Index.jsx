export default function Index({ posts }) {
    return (
        <>
            <h1 className="text-3xl font-bold text-blue-700 mb-4">My Super Blog</h1>
            <hr/>
            { posts && posts.map( (item) => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                    <p>{item.body}</p>
                </div>
            )) }
        </>
    )
}
