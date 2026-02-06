import { Link } from "react-router"
export default function Home() {
  return (
    <main className="intro">
      <section className="intro_mid">
        <h1>Quizzical</h1>
        <h3>Some description if needed</h3>
      </section>
      <Link to='quiz'>Start quiz</Link>
    </main>
  )
}