// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import PixelSvgPage from '@/pages/software/pixel-svg/PixelSvgPage'

export const Route = createFileRoute('/software/pixel-svg/')({
  component: PixelSvgPage,
})
