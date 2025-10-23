import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Info, X } from 'lucide-react';
import { componentIcons } from '../../config/componentIcons.js';
import processorImage from '../../assets/processor.jpeg';

export function ComponentSelector({ type, options, selected, onSelect, onRemove }) {
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState(null);
    
    const acronyms = ['cpu', 'ram', 'gpu', 'psu'];
    const typeLabel = acronyms.includes(type) ? type.toUpperCase() : type.charAt(0).toUpperCase() + type.slice(1);
    
    const IconComponent = componentIcons[type].component;
    const iconClassName = componentIcons[type].className;
    
    // Component type images
    const componentImages = {
        cpu: processorImage,
    };
    
    const handleInfoClick = (component) => {
        setSelectedInfo(component);
        setShowInfoModal(true);
    };
    
    const closeModal = () => {
        setShowInfoModal(false);
        setSelectedInfo(null);
    };
    
    return (
        <>
            {selected ? (
                <div className="flex items-center justify-between bg-gray-800/60 p-6 rounded-lg max-w-5xl mx-auto">
                    <div className="flex items-center gap-4">
                        <IconComponent className={iconClassName} />
                        <div>
                            <p className="font-semibold text-gray-300">{typeLabel}</p>
                            <p className="text-white">{selected.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="font-bold text-cyan-400">Rs. {selected.price}</p>
                            <button onClick={() => onRemove(type)} className="text-rose-400 hover:text-rose-300 transition-colors text-sm">
                                Remove
                            </button>
                        </div>
                        <button
                            onClick={() => handleInfoClick(selected)}
                            className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full transition-colors"
                        >
                            <Info className="w-5 h-5 text-cyan-400" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between bg-gray-900/80 p-6 rounded-lg border-2 border-dashed border-gray-700 max-w-5xl mx-auto">
                    <div className="flex items-center gap-4">
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
                                {option.name} (Rs. {option.price})
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Info Modal */}
            {showInfoModal && selectedInfo && createPortal(
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center p-4 pointer-events-auto" style={{ zIndex: 99999 }}>
                    {/* Backdrop with blur */}
                    <div
                        className="absolute top-0 left-0 right-0 bottom-0 bg-black/95 backdrop-blur-md pointer-events-auto"
                        onClick={closeModal}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative bg-gray-900 border border-cyan-500/30 rounded-xl p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl" style={{ zIndex: 1 }}>
                        {/* Close Button */}
                        <button 
                            onClick={closeModal}
                            className="absolute top-4 right-4 p-1 hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-300 hover:text-white" />
                        </button>
                        
                        {/* Component Details */}
                        <div>
                            <div className="flex items-center gap-3 mb-6 pr-8">
                                <IconComponent className={iconClassName} />
                                <h2 className="text-2xl font-bold text-white">{selectedInfo.name}</h2>
                            </div>

                            {componentImages[type] && (
                                <div className="flex justify-center mb-6">
                                    <img
                                        src={componentImages[type]}
                                        alt={selectedInfo.name}
                                        className="w-64 h-64 object-cover rounded-lg"
                                    />
                                </div>
                            )}

                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                                    <span className="text-gray-400 font-medium">Price:</span>
                                    <span className="text-cyan-400 font-bold text-lg">Rs. {selectedInfo.price.toLocaleString('en-IN')}</span>
                                </div>

                                {/* Display all properties of the component */}
                                {Object.entries(selectedInfo).map(([key, value]) => {
                                    if (key !== 'id' && key !== 'name' && key !== 'price') {
                                        return (
                                            <div key={key} className="flex justify-between items-center border-b border-gray-700 pb-3">
                                                <span className="text-gray-400 font-medium capitalize">{key.replace(/_/g, ' ')}:</span>
                                                <span className="text-white font-semibold">{value}</span>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
