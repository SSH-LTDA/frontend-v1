import './index.css'

export default function App() {
  return (
    <main className="h-screen bg-zinc-50">
      <form action="">
        <label htmlFor="Email"></label>
        <input type="email" name="email" />

        <label htmlFor="Senha"></label>
        <input type="password" name="password" />

        <button type="submit">Enviar</button>
      </form>
    </main>
  )
}  
