import { Link, createFileRoute } from '@tanstack/react-router'

import SoftwareIcon from '@/assets/icons/icon-software'
import HomeHeroVisual from '@/assets/home-hero-visual.png'
import RgbWheel from '@/assets/rgb-wheel.png'
import RgbWheelAlt from '@/assets/rgb-wheel-2.png'
import PixelSvgLogo from '@/assets/logos/logo-pixel-svg.png'

export const Route = createFileRoute('/software/')({
  component: RouteComponent,
})

const description = {
  left: [
    "I'm a detail-oriented, hands-on, product-minded software developer who learned to code at a young age so that my ideas didn't live and die as graphite marginalia.",
    "My dad taught me Websites, games, little systems stitched together late at night—programming became the way I pulled those ideas out of the margins of notebooks and made them real.",
    "That instinct still drives me today. I care deeply about craft, clarity, and the small decisions that compound into software that feels right to use, not just correct to ship."
  ],
  right: [
    "Professionally, I bring over a decade of experience building production-grade software, paired with more than five years leading and growing engineering teams.",
    "I’m comfortable in the codebase and in the room where product decisions get made, translating vision into systems that scale and endure.",
    "Altogether, I’ve spent more than twenty years writing code to bring ideas to life—balancing curiosity with discipline, and creativity with responsibility—always focused on building software that solves real problems and earns its place in the world."
  ],
};

const software = [
  {
    title: 'Pixel SVG',
    description: 'A lightweight drawing tool for creating pixel art SVG files',
    image: PixelSvgLogo,
    alt: 'Pixel SVG logo',
    path: 'pixel-svg',
    imageBackground: '#0044ffff',
  },
  {
    title: 'Color Systems Lab',
    description: 'An interactive color workflow for designers and developers to validate palettes and accessibility.',
    image: RgbWheel,
    alt: 'RGB color wheel',
    path: 'color-systems-lab',
    imageBackground: '#f1f6ff',
  },
  {
    title: 'Signalboard',
    description: 'A focused dashboard that turns messy product data into clean, decision-ready signals.',
    image: RgbWheelAlt,
    alt: 'Stylized color wheel with gradients',
    path: 'signalboard',
    imageBackground: '#f6f4ef',
  },
]

function RouteComponent() {
  return (
      <div className="sheet">
        <div className="software-grid">
          <div>
            <h1 className="software-title">
              <SoftwareIcon />
              Software
            </h1>
            {description.left.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div>
            {description.right.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <button className="software-cta">
              I'm open to new opportunities. Let's work together!
            </button>
            </div>
        </div>
        <div className="software-cards">
          {software.map((item) => (
            <Link key={item.title} className="software-card-link" to={`/software/${item.path}`}>
              <article className="software-card">
                <div className="software-card-image-wrap" style={{ backgroundColor: item.imageBackground }}>
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="software-card-image"
                    loading="lazy"
                  />
                </div>
                <h3 className="software-card-title">{item.title}</h3>
                <p className="software-card-description">{item.description}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    )
}
