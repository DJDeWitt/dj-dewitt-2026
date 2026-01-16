import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>This is a minimal Vite + TanStack Router SPA deployed on Heroku.</p>
    </div>
  )
}
