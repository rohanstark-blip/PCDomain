// Featured builds data
import { componentData } from './componentData.js';

export const featuredBuilds = [
  {
    iconType: 'Gamepad2',
    iconClass: "w-8 h-8 text-rose-400",
    title: "The Entry Gamer",
    description: "A solid starting point for 1080p gaming with great value components.",
    price: 76182,
    keyComponents: { cpu: 'Intel Core i5-12600K', gpu: 'NVIDIA GeForce RTX 4050' },
    buildData: {
      cpu: componentData.cpu.find(c => c.id === 'c7'),
      motherboard: componentData.motherboard.find(m => m.id === 'm6'),
      ram: componentData.ram.find(r => r.id === 'r4'),
      storage: componentData.storage.find(s => s.id === 's1'),
      gpu: componentData.gpu.find(g => g.id === 'g5'),
      psu: componentData.psu.find(p => p.id === 'p3'),
    }
  },
  {
    iconType: 'Video',
    iconClass: "w-8 h-8 text-fuchsia-400",
    title: "The Content Creator",
    description: "Powerful multi-core CPU and ample RAM for smooth video editing and streaming.",
    price: 130351,
    keyComponents: { cpu: 'Intel Core i7-13700K', gpu: 'NVIDIA GeForce RTX 4060' },
    buildData: {
      cpu: componentData.cpu.find(c => c.id === 'c14'),
      motherboard: componentData.motherboard.find(m => m.id === 'm3'),
      ram: componentData.ram.find(r => r.id === 'r2'),
      storage: componentData.storage.find(s => s.id === 's2'),
      gpu: componentData.gpu.find(g => g.id === 'g6'),
      psu: componentData.psu.find(p => p.id === 'p2'),
    }
  },
  {
    iconType: 'Rocket',
    iconClass: "w-8 h-8 text-amber-400",
    title: "The Ultimate Rig",
    description: "Top-of-the-line components for enthusiast-level 4K gaming and performance.",
    price: 260845,
    keyComponents: { cpu: 'Intel Core i9-13900K', gpu: 'NVIDIA GeForce RTX 4090' },
    buildData: {
      cpu: componentData.cpu.find(c => c.id === 'c1'),
      motherboard: componentData.motherboard.find(m => m.id === 'm1'),
      ram: componentData.ram.find(r => r.id === 'r1'),
      storage: componentData.storage.find(s => s.id === 's1'),
      gpu: componentData.gpu.find(g => g.id === 'g1'),
      psu: componentData.psu.find(p => p.id === 'p1'),
    }
  },
  {
    iconType: 'TrendingUp',
    iconClass: "w-8 h-8 text-lime-400",
    title: "The Streaming Pro",
    description: "A balanced build for high-quality streaming and competitive gaming performance.",
    price: 132565,
    keyComponents: { cpu: 'AMD Ryzen 7 7800X3D', gpu: 'NVIDIA GeForce RTX 5060' },
    buildData: {
      cpu: componentData.cpu.find(c => c.id === 'c4'),
      motherboard: componentData.motherboard.find(m => m.id === 'm2'),
      ram: componentData.ram.find(r => r.id === 'r2'),
      storage: componentData.storage.find(s => s.id === 's1'),
      gpu: componentData.gpu.find(g => g.id === 'g8'),
      psu: componentData.psu.find(p => p.id === 'p2'),
    }
  }
];
