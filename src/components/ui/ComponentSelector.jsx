import React from 'react';
import { componentIcons } from '../../config/componentIcons.js';

export function ComponentSelector({ type, options, selected, onSelect, onRemove }) {
    const acronyms = ['cpu', 'ram', 'gpu', 'psu'];
    const typeLabel = acronyms.includes(type) ? type.toUpperCase() : type.charAt(0).toUpperCase() + type.slice(1);
    
    const IconComponent = componentIcons[type].component;
    const iconClassName = componentIcons[type].className;
    
    if (selected) {
        return (
             <div className="flex items-center justify-between bg-gray-800/60 p-4 rounded-lg">
                <div className="flex items-center">
                    <IconComponent className={iconClassName} />
                    <div>
                        <p className="font-semibold text-gray-300">{typeLabel}</p>
                        <p className="text-white">{selected.name}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-bold text-cyan-400">₹{selected.price}</p>
                    <button onClick={() => onRemove(type)} className="text-rose-400 hover:text-rose-300 transition-colors text-sm">
                        Remove
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-between bg-gray-900/80 p-4 rounded-lg border-2 border-dashed border-gray-700">
            <div className="flex items-center">
                <IconComponent className={iconClassName} />
                <p className="font-semibold text-gray-300">{typeLabel}</p>
            </div>
            <select
                onChange={(e) => onSelect(type, options.find(o => o.id === e.target.value))}
                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-1/2 p-2.5"
            >
                <option value="">Choose a {typeLabel}...</option>
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.name} (₹{option.price})
                    </option>
                ))}
            </select>
        </div>
    );
}
