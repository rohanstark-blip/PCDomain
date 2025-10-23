import React, { useState, useEffect, useRef } from 'react';
import { Home, Wand2, Save, Loader, Share2 } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useLocation } from 'react-router-dom';
import { api } from '../../config/api.js';
import { componentData } from '../../data/componentData.js';
import { SuggestBuildModal } from '../ui/SuggestBuildModal.jsx';
import { ComponentSelector } from '../ui/ComponentSelector.jsx';
import { BuildSummary } from '../ui/BuildSummary.jsx';
import { AiChatAssistant } from '../ui/AiChatAssistant.jsx';

export function PCBuilder({ initialBuild, setBuildToLoad }) {
    const { user: currentUser } = useUser();
    const location = useLocation();
    const [build, setBuild] = useState({
        cpu: null, motherboard: null, ram: null, storage: null, gpu: null, psu: null, case: null, monitor: null, keyboard: null, mouse: null,
    });

    const [compatibility, setCompatibility] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showStatus, setShowStatus] = useState({ show: false, message: '', type: 'success' });
    const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
    const [currentBuildId, setCurrentBuildId] = useState(null);
    const elementsRef = useRef([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fadeInUp');
                        entry.target.style.opacity = '1';
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        elementsRef.current.forEach((element) => {
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            elementsRef.current.forEach((element) => {
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [build]);

    useEffect(() => {
        // Check for build from router state first (ProfilePage, SharedBuildPage)
        const stateInitialBuild = location.state?.initialBuild;

        if(stateInitialBuild) {
            setBuild(stateInitialBuild);
        } else if(initialBuild) {
            setBuild(initialBuild);
            if(setBuildToLoad) setBuildToLoad(null);
        }
    }, [initialBuild, setBuildToLoad, location.state]);

    const handleSelectComponent = (type, component) => {
        setBuild(prevBuild => ({ ...prevBuild, [type]: component }));
    };

    const handleRemoveComponent = (type) => {
        setBuild(prevBuild => ({ ...prevBuild, [type]: null }));
    };

    const handlePopulateBuild = (suggestedIds) => {
        const newBuild = {
            cpu: null, motherboard: null, ram: null, storage: null, gpu: null, psu: null, case: null, monitor: null, keyboard: null, mouse: null,
        };
        for(const type in suggestedIds) {
            const componentId = suggestedIds[type];
            const component = componentData[type]?.find(c => c.id === componentId);
            if(component) {
                newBuild[type] = component;
            }
        }
        setBuild(newBuild);
    };
    
    const handleShareBuild = async () => {
        if (!currentBuildId) {
            setShowStatus({ show: true, message: 'Please save your build first to share it.', type: 'error' });
            setTimeout(() => setShowStatus({ show: false, message: '', type: '' }), 3000);
            return;
        }

        const shareUrl = `${window.location.origin}/build/${currentBuildId}`;

        try {
            await navigator.clipboard.writeText(shareUrl);
            setShowStatus({ show: true, message: 'Share link copied to clipboard!', type: 'success' });
            setTimeout(() => setShowStatus({ show: false, message: '', type: '' }), 3000);
        } catch (error) {
            setShowStatus({ show: true, message: 'Failed to copy link. Try again.', type: 'error' });
            setTimeout(() => setShowStatus({ show: false, message: '', type: '' }), 3000);
        }
    };

    const handleSaveBuild = async () => {
        if (!currentUser) {
            setShowStatus({ show: true, message: 'Please log in to save your build.', type: 'error' });
            setTimeout(() => setShowStatus({ show: false, message: '', type: '' }), 3000);
            return;
        }

        // Check only required components (not monitor, keyboard, mouse)
        const requiredComponents = ['cpu', 'motherboard', 'ram', 'storage', 'gpu', 'psu', 'case'];
        const requiredComplete = requiredComponents.every(type => build[type] !== null);

        if (!requiredComplete) {
            setShowStatus({ show: true, message: 'Please select all required components before saving.', type: 'error' });
            setTimeout(() => setShowStatus({ show: false, message: '', type: '' }), 3000);
            return;
        }

        try {
            const createdAt = new Date();
            const buildData = {
                name: `Build saved on ${createdAt.toLocaleDateString()}`,
                totalPrice,
                components: build,
                email: currentUser.emailAddresses[0]?.emailAddress
            };

            const result = await api.saveBuild(currentUser.id, buildData);
            const buildId = result.buildId || result.build?._id;
            setCurrentBuildId(buildId);

            setShowStatus({ show: true, message: 'Build saved successfully!', type: 'success' });
            setTimeout(() => setShowStatus({ show: false, message: '', type: '' }), 3000);
        } catch (error) {
            console.error("Error saving build:", error);
            setShowStatus({ show: true, message: 'Error saving build. Please try again.', type: 'error' });
            setTimeout(() => setShowStatus({ show: false, message: '', type: '' }), 3000);
        }
    };

    useEffect(() => {
        const issues = [];
        const { cpu, motherboard, ram, gpu, psu } = build;
        if (cpu && motherboard && cpu.socket !== motherboard.socket) {
            issues.push({ type: 'error', message: `CPU socket (${cpu.socket}) and Motherboard socket (${motherboard.socket}) do not match.` });
        } else if (cpu && motherboard) {
             issues.push({ type: 'success', message: `CPU and Motherboard sockets (${cpu.socket}) are compatible.` });
        }
        if (ram && motherboard && ram.type !== motherboard.ram_type) {
            issues.push({ type: 'error', message: `RAM type (${ram.type}) is not compatible with Motherboard RAM type (${motherboard.ram_type}).` });
        } else if (ram && motherboard) {
             issues.push({ type: 'success', message: `RAM type (${ram.type}) is compatible with the motherboard.` });
        }
        const totalPower = (cpu?.power || 0) + (gpu?.power || 0) + 150;
        if (psu && psu.wattage < totalPower) {
            issues.push({ type: 'error', message: `PSU wattage (${psu.wattage}W) may be insufficient for the estimated load (${totalPower}W).` });
        } else if (psu && psu.wattage >= totalPower) {
             issues.push({ type: 'success', message: `PSU wattage (${psu.wattage}W) is sufficient for the estimated load (${totalPower}W).` });
        }
        setCompatibility(issues);
        const price = Object.values(build).reduce((acc, component) => acc + (component ? component.price : 0), 0);
        setTotalPrice(price);
    }, [build]);

    return (
        <div className="font-sans">
            {isSuggestModalOpen && <SuggestBuildModal onClose={() => setIsSuggestModalOpen(false)} onSuggest={handlePopulateBuild}/>}
            <div className="container mx-auto p-4 md:p-8">
                 {showStatus.show && (
                    <div className={`fixed top-5 right-5 p-4 rounded-lg z-50 animate-fadeInUp ${showStatus.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                        {showStatus.message}
                    </div>
                )}
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 glassmorphic rounded-xl p-6 shadow-2xl opacity-0" ref={(el) => elementsRef.current[0] = el}>
                        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                            <h2 className="text-2xl font-bold text-cyan-300">Build Your PC</h2>
                            <div className="flex flex-wrap gap-2">
                                <button onClick={() => setIsSuggestModalOpen(true)} className="bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors text-white font-bold py-2 px-4 rounded-lg flex items-center text-sm">
                                    <Wand2 className="w-4 h-4 mr-2" /> Suggest
                                </button>
                                <button onClick={handleSaveBuild} className="bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-bold py-2 px-4 rounded-lg flex items-center text-sm">
                                    <Save className="w-4 h-4 mr-2" /> Save
                                </button>
                                {currentBuildId && (
                                    <button onClick={handleShareBuild} className="bg-cyan-600 hover:bg-cyan-700 transition-colors text-white font-bold py-2 px-4 rounded-lg flex items-center text-sm">
                                        <Share2 className="w-4 h-4 mr-2" /> Share
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="space-y-4">
                            {Object.keys(build).map((type, index) => {
                                const requiredComponents = ['cpu', 'motherboard', 'ram', 'storage', 'gpu', 'psu', 'case'];
                                const showOptionalHeader = type === 'monitor' && index > 0;

                                // Filter options based on compatibility
                                let filteredOptions = componentData[type];

                                if (type === 'cpu' && build.motherboard) {
                                    // Show only CPUs compatible with selected motherboard socket
                                    filteredOptions = componentData[type].filter(cpu => cpu.socket === build.motherboard.socket);
                                } else if (type === 'motherboard' && build.cpu) {
                                    // Show only motherboards compatible with selected CPU socket
                                    filteredOptions = componentData[type].filter(mb => mb.socket === build.cpu.socket);
                                } else if (type === 'ram' && build.motherboard) {
                                    // Show only RAM compatible with selected motherboard RAM type
                                    filteredOptions = componentData[type].filter(ram => ram.type === build.motherboard.ram_type);
                                } else if (type === 'motherboard' && build.ram) {
                                    // Show only motherboards compatible with selected RAM type
                                    filteredOptions = componentData[type].filter(mb => mb.ram_type === build.ram.type);
                                }

                                return (
                                    <React.Fragment key={type}>
                                        {showOptionalHeader && (
                                            <div className="pt-6 pb-2">
                                                <h3 className="text-xl font-bold text-gray-400 text-center">
                                                    Additional Components (Optional)
                                                </h3>
                                                <p className="text-sm text-gray-500 text-center mt-1">
                                                    Enhance your setup with these peripherals
                                                </p>
                                            </div>
                                        )}
                                        <div ref={(el) => elementsRef.current[index + 1] = el} className="opacity-0">
                                            <ComponentSelector
                                                type={type} options={filteredOptions} selected={build[type]}
                                                onSelect={handleSelectComponent} onRemove={handleRemoveComponent}
                                            />
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                       <div ref={(el) => elementsRef.current[11] = el} className="opacity-0">
                           <BuildSummary build={build} totalPrice={totalPrice} compatibility={compatibility} />
                       </div>
                       <div ref={(el) => elementsRef.current[12] = el} className="opacity-0">
                           <AiChatAssistant build={build} />
                       </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

