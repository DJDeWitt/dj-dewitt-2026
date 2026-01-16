import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>Write a short bio here.</p>
    </div>
  )
}
