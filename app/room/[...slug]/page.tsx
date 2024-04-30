export default function Page({ params}: { params: { slug: string }}) {
    return <div>Room: {params.slug} </div>
}