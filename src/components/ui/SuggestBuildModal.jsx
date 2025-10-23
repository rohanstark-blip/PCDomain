import React, { useState } from 'react';
import { Wand2, Loader } from 'lucide-react';
import { componentData } from '../../data/componentData.js';

export function SuggestBuildModal({ onClose, onSuggest }) {
    const [budget, setBudget] = useState('');
    const [useCase, setUseCase] = useState('Gaming');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSuggest = async (e) => {
        e.preventDefault();
        if (!budget) {
            setError('Please enter a budget.');
            return;
        }
        setIsLoading(true);
        setError('');

        const systemPrompt = `You are an expert PC builder AI. Your task is to suggest a complete, compatible PC build based on a user's budget and primary use case. You must select one component for each category (cpu, motherboard, ram, storage, gpu, psu) from the provided JSON list of available components.

RULES:
1.  **Compatibility is KEY**: The CPU socket must match the motherboard socket. The RAM type must match the motherboard's supported RAM type. The PSU wattage must be sufficient for the CPU and GPU power draw (assume base power + GPU power + 150W for other components).
2.  **Stay within Budget**: The total price of all selected components must be as close as possible to the user's budget without exceeding it.
3.  **Optimize for Use Case**: Prioritize components that benefit the user's primary use case. For 'Gaming', prioritize the GPU. For 'Video Editing', prioritize CPU core count and RAM capacity. For 'Office Work', focus on value and reliability.
4.  **Return JSON only**: Your entire response MUST be a single, valid JSON object containing the IDs of the selected components, like this: {"cpu": "c3", "motherboard": "m1", "ram": "r1", "storage": "s1", "gpu": "g4", "psu": "p3"}`;

        const userPrompt = `Available Components: ${JSON.stringify(componentData)}\n\nUser Request:\nBudget: Rs. ${budget}\nPrimary Use Case: ${useCase}`;

        try {
            const apiKey = import.meta.env.VITE_ANANNAS_API_KEY || "sk-cr-f07b1930043840469540da0a31903dca";

            const response = await fetch("https://api.anannas.ai/v1/chat/completions", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "z-ai/glm-4.6",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userPrompt }
                    ],
                    response_format: { type: "json_object" }
                })
            });

            if (!response.ok) throw new Error("API call failed");

            const result = await response.json();
            const jsonText = result.choices?.[0]?.message?.content;
            if (jsonText) {
                const suggestedIds = JSON.parse(jsonText);
                onSuggest(suggestedIds);
                onClose();
            } else {
                throw new Error("Could not generate a valid build suggestion.");
            }
        } catch (err) {
            console.error("Build Suggestion Error:", err);
            setError("Sorry, I couldn't generate a suggestion. Please try adjusting your budget.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeInUp" style={{animationDuration: '0.3s'}}>
            <div className="glassmorphic rounded-xl p-8 shadow-2xl w-full max-w-md m-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-fuchsia-400 flex items-center"><Wand2 className="w-6 h-6 mr-2"/> AI Build Suggester</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
                </div>
                <p className="text-gray-400 mb-6">Tell the AI your budget and what you'll use the PC for, and it will create a build for you.</p>
                
                <form onSubmit={handleSuggest}>
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-400">Your Budget (in Rs.)</label>
                            <input type="number" value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g., 100000" className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-400">Primary Use Case</label>
                            <select value={useCase} onChange={e => setUseCase(e.target.value)} className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5">
                                <option>Gaming</option>
                                <option>Video Editing</option>
                                <option>Streaming</option>
                                <option>Office Work / General Use</option>
                            </select>
                        </div>
                    </div>
                    {error && <p className="text-rose-400 text-sm text-center mt-4">{error}</p>}
                    <div className="mt-6">
                        <button type="submit" disabled={isLoading} className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-gray-600 transition-colors text-white font-bold py-2.5 px-5 rounded-lg text-center flex items-center justify-center">
                            {isLoading ? <><Loader className="w-5 h-5 mr-2 animate-spin"/> Generating...</> : 'Suggest My Build'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

