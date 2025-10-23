// Featured builds data
import { componentData } from './componentData.js';

export const featuredBuilds = [
  {
    iconType: 'Gamepad2',
    iconClass: "w-8 h-8 text-rose-400",
    title: "The Entry Gamer",
    description: "A solid starting point for 1080p gaming with great value components.",
    price: 118422, // Updated calculated price
    keyComponents: { cpu: 'Intel Core i5-12600K', gpu: 'NVIDIA GeForce RTX 4060', ram: '16GB', storage: '1TB' },
    buildData: {
      cpu: componentData.cpu.find(c => c.id === 'c7'),        // i5-12600K: 20750
      motherboard: componentData.motherboard.find(m => m.id === 'm12'), // MSI MAG B660M Mortar: 15700
      ram: componentData.ram.find(r => r.id === 'r4'),        // Corsair Vengeance LPX 16GB DDR4: 4565
      storage: componentData.storage.find(s => s.id === 's1'), // Samsung 980 Pro 1TB: 8217
      gpu: componentData.gpu.find(g => g.id === 'g6'),        // RTX 4060: 30500
      psu: componentData.psu.find(p => p.id === 'p10'),       // Corsair RM650e 650W: 8900
      case: componentData.case.find(cs => cs.id === 'cs2'),   // Corsair 4000D: 7200
      monitor: componentData.monitor.find(m => m.id === 'mon5'), // AOC 24G2 1080p 144Hz: 14500
      keyboard: componentData.keyboard.find(kb => kb.id === 'kb10'), // Cooler Master CK550: 6200
      mouse: componentData.mouse.find(ms => ms.id === 'ms3'),  // SteelSeries Rival 3: 2800
    }
  },
  {
    iconType: 'Video',
    iconClass: "w-8 h-8 text-fuchsia-400",
    title: "The Content Creator",
    description: "Powerful multi-core CPU and ample RAM for smooth video editing and streaming.",
    price: 175362, // Updated calculated price
    keyComponents: { cpu: 'Intel Core i7-13700K', gpu: 'NVIDIA GeForce RTX 4070', ram: '16GB', storage: '1TB' },
    buildData: {
      cpu: componentData.cpu.find(c => c.id === 'c14'),       // i7-13700K: 38500
      motherboard: componentData.motherboard.find(m => m.id === 'm8'), // MSI PRO Z790-P: 19500
      ram: componentData.ram.find(r => r.id === 'r10'),       // Kingston Fury Renegade 16GB DDR5: 5800
      storage: componentData.storage.find(s => s.id === 's5'), // WD Black SN850X 1TB: 9800
      gpu: componentData.gpu.find(g => g.id === 'g11'),       // RTX 4070: 54200
      psu: componentData.psu.find(p => p.id === 'p2'),        // SeaSonic FOCUS Plus 850W: 13197
      case: componentData.case.find(cs => cs.id === 'cs5'),   // Cooler Master H500: 8200
      monitor: componentData.monitor.find(m => m.id === 'mon8'), // ASUS TUF VG27AQ 1440p 165Hz: 25800
      keyboard: componentData.keyboard.find(kb => kb.id === 'kb5'), // Keychron K8 Pro: 7800
      mouse: componentData.mouse.find(ms => ms.id === 'ms6'),  // Logitech G502 HERO: 4800
    }
  },
  {
    iconType: 'Rocket',
    iconClass: "w-8 h-8 text-amber-400",
    title: "The Ultimate Rig",
    description: "Top-of-the-line components for enthusiast-level 4K gaming and performance.",
    price: 400444, // Updated calculated price
    keyComponents: { cpu: 'Intel Core i9-13900K', gpu: 'NVIDIA GeForce RTX 4090', ram: '32GB', storage: '2TB' },
    buildData: {
      cpu: componentData.cpu.find(c => c.id === 'c1'),        // i9-13900K: 48887
      motherboard: componentData.motherboard.find(m => m.id === 'm1'), // ASUS ROG Strix Z790-E: 41417
      ram: componentData.ram.find(r => r.id === 'r2'),        // G.Skill Trident Z5 32GB DDR5: 10707
      storage: componentData.storage.find(s => s.id === 's4'), // Samsung 990 Pro 2TB: 16500
      gpu: componentData.gpu.find(g => g.id === 'g1'),        // RTX 4090: 132717
      psu: componentData.psu.find(p => p.id === 'p6'),        // be quiet! Dark Power Pro 12 1200W: 22800
      case: componentData.case.find(cs => cs.id === 'cs8'),   // Corsair iCUE 5000X RGB: 16800
      monitor: componentData.monitor.find(m => m.id === 'mon9'), // Acer Predator X27 4K 144Hz: 82500
      keyboard: componentData.keyboard.find(kb => kb.id === 'kb4'), // SteelSeries Apex Pro: 16800
      mouse: componentData.mouse.find(ms => ms.id === 'ms1'),  // Logitech G Pro X Superlight: 11500
    }
  },
  {
    iconType: 'TrendingUp',
    iconClass: "w-8 h-8 text-lime-400",
    title: "The Streaming Pro",
    description: "A balanced build for high-quality streaming and competitive gaming performance.",
    price: 201417, // Updated calculated price
    keyComponents: { cpu: 'AMD Ryzen 7 7800X3D', gpu: 'NVIDIA GeForce RTX 4070 Ti', ram: '24GB', storage: '1TB' },
    buildData: {
      cpu: componentData.cpu.find(c => c.id === 'c4'),        // Ryzen 7 7800X3D: 37267
      motherboard: componentData.motherboard.find(m => m.id === 'm9'), // Gigabyte B650 AORUS Elite AX: 16800
      ram: componentData.ram.find(r => r.id === 'r9'),        // TeamGroup T-Force Delta RGB 32GB DDR5 (using 32GB as close to 24GB): 9500
      storage: componentData.storage.find(s => s.id === 's7'), // Crucial P5 Plus 1TB: 7800
      gpu: componentData.gpu.find(g => g.id === 'g2'),        // RTX 4070 Ti: 66317
      psu: componentData.psu.find(p => p.id === 'p8'),        // MSI MPG A850G 850W: 10800
      case: componentData.case.find(cs => cs.id === 'cs7'),   // Phanteks Eclipse P500A: 9500
      monitor: componentData.monitor.find(m => m.id === 'mon4'), // Dell S2721DGF 1440p 165Hz: 32800
      keyboard: componentData.keyboard.find(kb => kb.id === 'kb7'), // HyperX Alloy Origins: 8500
      mouse: componentData.mouse.find(ms => ms.id === 'ms5'),  // Razer Viper Ultimate: 9500
    }
  }
];
