// Component data for PC parts
export const componentData = {
  cpu: [
    { id: 'c1', name: 'Intel Core i9-13900K', price: 48887, socket: 'LGA1700', power: 125, core_count: 24 },
    { id: 'c14', name: 'Intel Core i7-13700K', price: 38500, socket: 'LGA1700', power: 125, core_count: 16 },
    { id: 'c2', name: 'AMD Ryzen 9 7950X', price: 45567, socket: 'AM5', power: 170, core_count: 16 },
    { id: 'c3', name: 'Intel Core i5-13600K', price: 26477, socket: 'LGA1700', power: 125, core_count: 14 },
    { id: 'c4', name: 'AMD Ryzen 7 7800X3D', price: 37267, socket: 'AM5', power: 120, core_count: 8 },
    { id: 'c5', name: 'Intel Core i9-12900K', price: 41500, socket: 'LGA1700', power: 125, core_count: 16 },
    { id: 'c6', name: 'Intel Core i7-12700K', price: 31540, socket: 'LGA1700', power: 125, core_count: 12 },
    { id: 'c7', name: 'Intel Core i5-12600K', price: 20750, socket: 'LGA1700', power: 125, core_count: 10 },
    { id: 'c8', name: 'Intel Core i9-11900K', price: 37350, socket: 'LGA1200', power: 125, core_count: 8 },
    { id: 'c9', name: 'Intel Core i7-11700K', price: 29050, socket: 'LGA1200', power: 125, core_count: 8 },
    { id: 'c10', name: 'Intel Core i5-11600K', price: 18260, socket: 'LGA1200', power: 125, core_count: 6 },
    { id: 'c11', name: 'Intel Core i9-10900K', price: 32370, socket: 'LGA1200', power: 125, core_count: 10 },
    { id: 'c12', name: 'Intel Core i7-10700K', price: 23240, socket: 'LGA1200', power: 125, core_count: 8 },
    { id: 'c13', name: 'Intel Core i5-10600K', price: 14940, socket: 'LGA1200', power: 125, core_count: 6 },
  ],
  motherboard: [
    { id: 'm1', name: 'ASUS ROG Strix Z790-E', price: 41417, socket: 'LGA1700', ram_type: 'DDR5' },
    { id: 'm2', name: 'MSI MAG B650 Tomahawk', price: 18177, socket: 'AM5', ram_type: 'DDR5' },
    { id: 'm3', name: 'Gigabyte Z790 AORUS Elite', price: 21497, socket: 'LGA1700', ram_type: 'DDR5' },
    { id: 'm4', name: 'ASRock X670E Steel Legend', price: 23987, socket: 'AM5', ram_type: 'DDR5' },
    { id: 'm5', name: 'ASUS ROG Strix Z590-E Gaming', price: 29050, socket: 'LGA1200', ram_type: 'DDR4' },
    { id: 'm6', name: 'MSI MPG Z490 GAMING EDGE', price: 20750, socket: 'LGA1200', ram_type: 'DDR4' },
  ],
  ram: [
    { id: 'r1', name: 'Corsair Vengeance 32GB DDR5', price: 9877, type: 'DDR5', speed: 5600, capacity: 32 },
    { id: 'r2', name: 'G.Skill Trident Z5 32GB DDR5', price: 10707, type: 'DDR5', speed: 6000, capacity: 32 },
    { id: 'r3', name: 'Crucial Pro 16GB DDR4', price: 3735, type: 'DDR4', speed: 3200, capacity: 16 },
    { id: 'r4', name: 'Corsair Vengeance LPX 16GB DDR4', price: 4565, type: 'DDR4', speed: 3600, capacity: 16 },
  ],
  storage: [
    { id: 's1', name: 'Samsung 980 Pro 1TB NVMe', price: 8217, type: 'NVMe', capacity: 1000 },
    { id: 's2', name: 'Crucial P3 2TB NVMe', price: 7387, type: 'NVMe', capacity: 2000 },
    { id: 's3', name: 'Seagate Barracuda 4TB HDD', price: 6557, type: 'HDD', capacity: 4000 },
  ],
  gpu: [
    { id: 'g1', name: 'NVIDIA GeForce RTX 4090', price: 132717, power: 450 },
    { id: 'g2', name: 'NVIDIA GeForce RTX 4070 Ti', price: 66317, power: 285 },
    { id: 'g3', name: 'AMD Radeon RX 7900 XTX', price: 82917, power: 355 },
    { id: 'g4', name: 'NVIDIA GeForce RTX 3060', price: 28967, power: 170 },
    { id: 'g5', name: 'NVIDIA GeForce RTX 4050', price: 25000, power: 100 },
    { id: 'g6', name: 'NVIDIA GeForce RTX 4060', price: 30500, power: 115 },
    { id: 'g7', name: 'NVIDIA GeForce RTX 5050', price: 29000, power: 110 },
    { id: 'g8', name: 'NVIDIA GeForce RTX 5060', price: 45000, power: 140 },
  ],
  psu: [
    { id: 'p1', name: 'Corsair RM1000e 1000W', price: 14857, wattage: 1000 },
    { id: 'p2', name: 'SeaSonic FOCUS Plus 850W', price: 13197, wattage: 850 },
    { id: 'p3', name: 'EVGA SuperNOVA 750 G6 750W', price: 10707, wattage: 750 },
  ],
};

