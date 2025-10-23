import React, { useState } from 'react';
import { XCircle, CheckCircle, Gauge, Loader } from 'lucide-react';

export function BuildSummary({ build, totalPrice, compatibility }) {
    const hasParts = Object.values(build).some(part => part !== null);
    const [performanceAnalysis, setPerformanceAnalysis] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyzePerformance = async () => {
        if (!build.cpu || !build.gpu) {
            setPerformanceAnalysis("Please select a CPU and GPU to analyze performance.");
            return;
        }
        setIsAnalyzing(true);
        setPerformanceAnalysis('');

        const prompt = `Analyze the gaming and productivity performance of a PC with a ${build.cpu.name} and a ${build.gpu.name}. Provide a concise, one-paragraph summary for a beginner. Mention what kind of gaming resolution (e.g., 1080p, 1440p, 4K) and settings it would be good for.`;

        try {
            const apiKey = import.meta.env.VITE_ANANNAS_API_KEY || "sk-cr-f07b1930043840469540da0a31903dca";
            const response = await fetch("https://api.anannas.ai/v1/chat/completions", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "grok/grok-4-fast-non-reasoning",
                    messages: [{ role: "user", content: prompt }]
                })
            });
            if (!response.ok) throw new Error("API call failed");
            const result = await response.json();
            const text = result.choices?.[0]?.message?.content;
            setPerformanceAnalysis(text || "Could not generate analysis.");
        } catch (error) {
            console.error(error);
            setPerformanceAnalysis("Sorry, there was an error generating the performance analysis.");
        } finally {
            setIsAnalyzing(false);
        }
    };
    
    return (
        <div className="glassmorphic rounded-xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-cyan-300">Build Summary</h3>
            <div className="space-y-4">
                {/* Total Price - First and Separated */}
                <div className="pb-4 border-b-2 border-cyan-400/30">
                     <div className="flex justify-between items-center text-2xl font-bold">
                        <span>Total Price:</span>
                        <span className="text-cyan-400">Rs. {totalPrice.toFixed(2)}</span>
                    </div>
                </div>

                {/* Compatibility Check - Second */}
                <div>
                    <h4 className="text-2xl font-bold mb-2">Compatibility Check:</h4>
                    {hasParts && compatibility.length > 0 ? (
                        <ul className="space-y-2 text-sm">
                            {compatibility.map((issue, index) => (
                                <li key={index} className={`flex items-start ${issue.type === 'error' ? 'text-rose-400' : 'text-emerald-400'}`}>
                                    {issue.type === 'error' ? <XCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" /> : <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />}
                                    <span>{issue.message}</span>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-sm text-gray-400">Select components to check compatibility.</p>}
                </div>

                {/* AI Performance Analyzer - Third */}
                <div className="border-t border-cyan-400/20 pt-4">
                     <button onClick={handleAnalyzePerformance} disabled={isAnalyzing || !build.cpu || !build.gpu} className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center">
                        {isAnalyzing ? <><Loader className="w-4 h-4 mr-2 animate-spin"/> Analyzing...</> : <><Gauge className="w-4 h-4 mr-2" /> Analyze Performance</>}
                     </button>
                     {performanceAnalysis && <p className="text-sm text-gray-300 mt-3 bg-gray-800/50 p-3 rounded-lg">{performanceAnalysis}</p>}
                </div>
            </div>
        </div>
    );
}

