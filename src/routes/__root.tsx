import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  return (
    <div style={{ fontFamily: 'system-ui', padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <header style={{ display: 'flex', gap: 16, alignItems: 'baseline', marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 22 }}>DJ’s Portfolio</h1>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/" activeProps={{ style: { fontWeight: 700 } }}>Home</Link>
          <Link to="/projects" activeProps={{ style: { fontWeight: 700 } }}>Projects</Link>
          <Link to="/about" activeProps={{ style: { fontWeight: 700 } }}>About</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer style={{ marginTop: 40, opacity: 0.6, fontSize: 12 }}>
        © {new Date().getFullYear()}
      </footer>
    </div>
  )
}
