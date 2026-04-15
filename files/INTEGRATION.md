# Piyush 3D Avatar — Portfolio Integration Guide

## Files in this package
```
PiyushAvatar3D.jsx     ← Main React component (drop into /components/)
HeroWithAvatar.jsx     ← Ready-to-use Hero section replacement
preview.html           ← Standalone preview (no setup needed)
INTEGRATION.md         ← This file
```

---

## Step 1: Install dependencies
```bash
npm install three @react-three/fiber @react-three/drei
```

---

## Step 2: Copy component
```bash
cp PiyushAvatar3D.jsx  your-portfolio/components/
cp HeroWithAvatar.jsx  your-portfolio/components/
```

---

## Step 3: Use in your Hero section (Next.js)

In `pages/index.jsx` or wherever your Hero is:

```jsx
import dynamic from 'next/dynamic'

// MUST use dynamic import (no SSR) — Three.js needs browser
const PiyushAvatar3D = dynamic(
  () => import('../components/PiyushAvatar3D'),
  { ssr: false }
)

// In your Hero component:
<div className="hero-grid">
  <div className="hero-text">
    <h1>Hi, I'm Piyush</h1>
    <p>Full Stack Developer · AI/ML · IEM Kolkata</p>
  </div>
  <PiyushAvatar3D height="520px" width="100%" />
</div>
```

---

## Step 4: Update next.config.js (if needed)
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...(config.externals || [])];
    return config;
  },
};
module.exports = nextConfig;
```

---

## Avatar Features
- Stylized 3D character matching your photo (blazer, tie, glasses, beard)
- Continuous handshake/wave animation on right arm
- Idle breathing animation (subtle body bob)
- Mouse-follow head rotation (head looks toward cursor)
- Drag to rotate (OrbitControls)
- Contact shadow on ground
- Floating glow ring
- Fully transparent background (adapts to any theme)

---

## Customization props
```jsx
<PiyushAvatar3D 
  height="520px"   // container height
  width="100%"     // container width
  className=""     // additional CSS class
/>
```

---

## For the REAL you as 3D model (next level)
If you want photorealistic avatar, go to:
1. **readyplayer.me** → upload your photo → exports .glb
2. **tripo3d.ai** → AI photo-to-3D
3. **luma.ai** → NeRF from video (best quality)

Then replace the character geometry with:
```jsx
import { useGLTF } from '@react-three/drei'
const { scene } = useGLTF('/avatar.glb')
return <primitive object={scene} />
```
