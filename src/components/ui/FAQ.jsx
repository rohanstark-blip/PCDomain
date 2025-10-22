import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqData } from '../../data/faqData.js';

export function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="lg:col-span-3">
             <h4 className="text-4xl md:text-5xl font-bold mb-2 text-center text-cyan-400" style={{fontFamily: 'cursive'}}>FREQUENTLY ASKED QUESTIONS (FAQs)</h4>
            <p className="text-gray-400 mb-6 text-center">Quick answers to help you get started.</p>
            <div className="space-y-2">
                {faqData.map((item, index) => (
                    <div key={index} className="glassmorphic rounded-lg">
                        <button onClick={() => toggleFAQ(index)} className="w-full flex justify-between items-center p-4 text-left font-semibold">
                            <span>{item.q}</span>
                            <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
                        </button>
                        {openIndex === index && (
                            <div className="p-4 pt-0 text-gray-400 text-sm">
                                <p>{item.a}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

