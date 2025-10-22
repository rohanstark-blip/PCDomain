import { Cpu, CircuitBoard, MemoryStick, HardDrive, Thermometer, Power } from 'lucide-react';

export const componentIcons = {
    cpu: { component: Cpu, className: "w-6 h-6 mr-3 text-cyan-400" },
    motherboard: { component: CircuitBoard, className: "w-6 h-6 mr-3 text-emerald-400" },
    ram: { component: MemoryStick, className: "w-6 h-6 mr-3 text-fuchsia-400" },
    storage: { component: HardDrive, className: "w-6 h-6 mr-3 text-rose-400" },
    gpu: { component: Thermometer, className: "w-6 h-6 mr-3 text-amber-400" },
    psu: { component: Power, className: "w-6 h-6 mr-3 text-lime-400" },
};
