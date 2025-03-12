import Head from "next/head"

export default function Game({ children }) {
    return (
        <div className="container">
            <Head>
                <link rel = "icon" href="/favicon.ico" />
                <title>Monopoly Clone</title>
            </Head>
            <main>{children}</main>
        </div>
    )
}