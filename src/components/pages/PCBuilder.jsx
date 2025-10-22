import React, { useState, useEffect } from 'react';
import { Home, Wand2, Save, Loader } from 'lucide-react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, appId } from '../../config/firebase.js';
import { componentData } from '../../data/componentData.js';
import { SuggestBuildModal } from '../ui/SuggestBuildModal.jsx';
import { ComponentSelector } from '../ui/ComponentSelector.jsx';
import { BuildSummary } from '../ui/BuildSummary.jsx';
import { AiChatAssistant } from '../ui/AiChatAssistant.jsx';

export function PCBuilder({ currentUser, initialBuild, setBuildToLoad }) {
    const [build, setBuild] = useState({
        cpu: null, motherboard: null, ram: null, storage: null, gpu: null, psu: null,
    });
    
    const [compatibility, setCompatibility] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showStatus, setShowStatus] = useState({ show: false, message: '', type: 'success' });
    const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);

    useEffect(() => {
        if(initialBuild) {
            setBuild(initialBuild);
            setBuildToLoad(null);
        }
    }, [initialBuild, setBuildToLoad]);

    const handleSelectComponent = (type, component) => {
        setBuild(prevBuild => ({ ...prevBuild, [type]: component }));
    };

    const handleRemoveComponent = (type) => {
        setBuild(prevBuild => ({ ...prevBuild, [type]: null }));
    };

    const handlePopulateBuild = (suggestedIds) => {
        const newBuild = {
            cpu: null, motherboard: null, ram: null, storage: null, gpu: null, psu: null,
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
    
    const handleSaveBuild = async () => {
        if (!currentUser || currentUser.isAnonymous) {
            setShowStatus({ show: true, message: 'Please log in to save your build.', type: 'error' });
            setTimeout(() => setShowStatus({ show: false, message: '', type: '' }), 3000);
            return;
        }

        const buildIsComplete = Object.values(build).every(component => component !== null);
        if (!buildIsComplete) {
            setShowStatus({ show: true, message: 'Please select all components before saving.', type: 'error' });
            setTimeout(() => setShowStatus({ show: false, message: '', type: '' }), 3000);
            return;
        }

        try {
            const userRef = doc(db, `/artifacts/${appId}/users`, currentUser.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const createdAt = new Date();
                const newBuild = {
                    name: `Build saved on ${createdAt.toLocaleDateString()}`,
                    totalPrice,
                    components: build,
                    createdAt: {
                        seconds: Math.floor(createdAt.getTime() / 1000),
                        nanoseconds: (createdAt.getTime() % 1000) * 1000000,
                    }
                };
                const updatedBuilds = [...(userData.savedBuilds || []), newBuild];
                await updateDoc(userRef, { savedBuilds: updatedBuilds });
                setShowStatus({ show: true, message: 'Build saved successfully!', type: 'success' });
                setTimeout(() => setShowStatus({ show: false, message: '', type: '' }), 3000);
            }
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
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    <div className="lg:col-span-2 glassmorphic rounded-xl p-6 shadow-2xl opacity-0 animate-fadeInUp glowing-border" style={{animationDelay: '100ms'}}>
                        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                            <h2 className="text-2xl font-bold text-cyan-300">Build Your PC</h2>
                            <div className="flex gap-2">
                                <button onClick={() => setIsSuggestModalOpen(true)} className="bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors text-white font-bold py-2 px-4 rounded-lg flex items-center">
                                    <Wand2 className="w-4 h-4 mr-2" /> ✨ Suggest a Build
                                </button>
                                <button onClick={handleSaveBuild} className="bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-bold py-2 px-4 rounded-lg flex items-center">
                                    <Save className="w-4 h-4 mr-2" /> Save Build
                                </button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {Object.keys(build).map(type => (
                                <ComponentSelector
                                    key={type} type={type} options={componentData[type]} selected={build[type]}
                                    onSelect={handleSelectComponent} onRemove={handleRemoveComponent}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 opacity-0 animate-fadeInUp" style={{animationDelay: '200ms'}}>
                       <BuildSummary build={build} totalPrice={totalPrice} compatibility={compatibility} />
                       <AiChatAssistant build={build} />
                    </div>
                </main>
            </div>
        </div>
    );
}

