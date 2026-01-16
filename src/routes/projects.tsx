import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

function Projects() {
  return (
    <div>
      <h2>Projects</h2>
      <ul>
        <li>Field Ops (Rails API + React/React Native)</li>
        <li>Next Text (interactive posts)</li>
        <li>Glass Cannon (game)</li>
      </ul>
    </div>
  )
}
