import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { CheckCircle, Bot, HardDrive, TrendingUp, Save, Gauge } from 'lucide-react';
import { HowItWorksFAB } from '../ui/HowItWorksFAB.jsx';
import { HowItWorksModal } from '../ui/HowItWorksModal.jsx';
import { FeaturedBuildCard } from '../ui/FeaturedBuildCard.jsx';
import { FAQ } from '../ui/FAQ.jsx';
import { FeatureCard } from '../ui/FeatureCard.jsx';
import { FeedbackCard } from '../ui/FeedbackCard.jsx';
import { featuredBuilds } from '../../data/featuredBuilds.js';
import motherboardImage from '../../assets/professional-gaming-empty-room-studio-with-neon-lights.jpg';

export function LandingPage({ setBuildToLoad }) {
    const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
    const sectionsRef = useRef([]);

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
                rootMargin: '0px 0px -100px 0px'
            }
        );

        sectionsRef.current.forEach((section) => {
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            sectionsRef.current.forEach((section) => {
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, []);

    return (
        <div className="font-sans">
            {isHowItWorksOpen && <HowItWorksModal onClose={() => setIsHowItWorksOpen(false)} />}
            <HowItWorksFAB onOpen={() => setIsHowItWorksOpen(true)} />
            
            <section className="relative py-4 md:py-8 px-4 min-h-screen flex items-center justify-center -mt-20 pt-24">
                <div className="absolute inset-0 overflow-hidden -top-20 left-0 right-0">
                    <img
                        src={motherboardImage}
                        alt="Motherboard Illustration"
                        className="w-full h-[calc(100%+5rem)] object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/70"></div>
                </div>

                <div className="relative z-10 text-center max-w-5xl mx-auto px-4 container">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight opacity-0 animate-fadeInUp" style={{animationDelay: '100ms'}}>
                        <span className="text-white">Craft Your Perfect</span> <span className="text-white">PC</span>, <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400 whitespace-nowrap text-5xl md:text-7xl lg:text-8xl" style={{fontFamily: 'cursive'}}>INTELLIGENTLY.</span>
                    </h2>
                    <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg md:text-xl opacity-0 animate-fadeInUp" style={{animationDelay: '200ms'}}>
                        Use our AI-powered builder to check compatibility, get expert advice, and create a high-performance PC with confidence. No more guesswork.
                    </p>
                    <Link to="/builder" className="mt-10 bg-cyan-500 hover:bg-cyan-600 transition-colors text-white font-bold text-lg py-3 px-8 rounded-full inline-flex items-center group shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] opacity-0 animate-fadeInUp mx-auto" style={{animationDelay: '300ms'}}>
                        Build Your PC <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>
            <section id="features" className="py-20 bg-gray-950/50">
                <div className="container mx-auto px-4 text-center">
                    <h3 
                        ref={(el) => sectionsRef.current[0] = el}
                        className="text-4xl md:text-5xl font-bold mb-2 text-cyan-400 opacity-0" 
                        style={{fontFamily: 'cursive'}}
                    >
                        WHY CHOOSE PCDOMAIN?
                    </h3>
                    <p 
                        ref={(el) => sectionsRef.current[1] = el}
                        className="text-gray-400 mb-12 opacity-0"
                    >
                        Everything you need for a seamless build experience.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div ref={(el) => sectionsRef.current[2] = el} className="opacity-0">
                            <FeatureCard icon={<CheckCircle className="w-8 h-8 text-emerald-400"/>} title="AI Compatibility Checker" description="Our smart system automatically flags incompatible parts, ensuring your build works from day one." style={{animationDelay: '200ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[3] = el} className="opacity-0">
                            <FeatureCard icon={<Bot className="w-8 h-8 text-cyan-400"/>} title="Expert AI Assistant" description="Have questions? Our AI is trained on thousands of builds to give you tailored advice and suggestions." style={{animationDelay: '300ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[4] = el} className="opacity-0">
                            <FeatureCard icon={<HardDrive className="w-8 h-8 text-fuchsia-400"/>} title="Vast Component Library" description="We have an extensive, up-to-date database of CPUs, GPUs, motherboards, and more." style={{animationDelay: '400ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[5] = el} className="opacity-0">
                            <FeatureCard icon={<TrendingUp className="w-8 h-8 text-lime-400"/>} title="Real-Time Price Tracking" description="Component prices are updated regularly, ensuring you get the most accurate cost for your build." style={{animationDelay: '500ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[6] = el} className="opacity-0">
                            <FeatureCard icon={<Save className="w-8 h-8 text-rose-400"/>} title="Save & Load Builds" description="Create an account to save your builds, come back to them anytime, and load them for editing." style={{animationDelay: '600ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[7] = el} className="opacity-0">
                            <FeatureCard icon={<Gauge className="w-8 h-8 text-amber-400"/>} title="AI Performance Analytics" description="Get an AI-generated analysis of your build's expected performance in gaming and productivity." style={{animationDelay: '700ms'}} />
                        </div>
                    </div>
                </div>
            </section>

            <section id="featured-builds" className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h3 
                        ref={(el) => sectionsRef.current[8] = el}
                        className="text-4xl md:text-5xl font-bold mb-2 text-cyan-400 opacity-0" 
                        style={{fontFamily: 'cursive'}}
                    >
                        FEATURED BUILDS
                    </h3>
                    <p 
                        ref={(el) => sectionsRef.current[9] = el}
                        className="text-gray-400 mb-12 opacity-0"
                    >
                        Not sure where to start? Check out our expertly crafted builds for every need.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                        {featuredBuilds.map((build, index) => (
                            <div key={index} ref={(el) => sectionsRef.current[10 + index] = el} className="opacity-0">
                                <FeaturedBuildCard build={build} setBuildToLoad={setBuildToLoad} delay={200 * (index + 1)} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section id="faq" className="py-20 bg-gray-950/50">
                <div 
                    ref={(el) => sectionsRef.current[14] = el}
                    className="container mx-auto px-4 opacity-0"
                >
                    <FAQ />
                </div>
            </section>
            
            <section id="feedback" className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h3 
                        ref={(el) => sectionsRef.current[15] = el}
                        className="text-4xl md:text-5xl font-bold mb-2 text-cyan-400 opacity-0" 
                        style={{fontFamily: 'cursive'}}
                    >
                        TRUSTED BY BUILDERS
                    </h3>
                    <p 
                        ref={(el) => sectionsRef.current[16] = el}
                        className="text-gray-400 mb-12 opacity-0"
                    >
                        See what our users are saying about PCDomain.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div ref={(el) => sectionsRef.current[17] = el} className="opacity-0">
                            <FeedbackCard name="Rohan S." quote="The AI checker saved me! I almost bought a CPU that didn't fit my motherboard. PCDomain caught it instantly." style={{animationDelay: '200ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[18] = el} className="opacity-0">
                            <FeedbackCard name="Priya K." quote="As a first-time builder, the AI assistant was a lifesaver. It answered all my questions and helped me pick the best parts for my budget." style={{animationDelay: '300ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[19] = el} className="opacity-0">
                            <FeedbackCard name="Amit J." quote="Finally, a PC builder that's actually easy to use. The interface is clean, and the real-time price updates are fantastic. Highly recommend!" style={{animationDelay: '400ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[20] = el} className="opacity-0">
                            <FeedbackCard name="Sneha G." quote="The 'Suggest a Build' feature is pure magic. Gave it my budget for video editing and it created a perfect parts list in seconds." style={{animationDelay: '500ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[21] = el} className="opacity-0">
                            <FeedbackCard name="Vikram P." quote="I've built PCs before, but the AI Performance Analyzer is a game-changer. It gives you a clear idea of what to expect before you buy." style={{animationDelay: '600ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[22] = el} className="opacity-0">
                            <FeedbackCard name="Anjali M." quote="Being able to save my builds to my profile and come back later is so convenient. The whole experience is top-notch." style={{animationDelay: '700ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[23] = el} className="opacity-0">
                            <FeedbackCard name="Kavita R." quote="The dark mode neon theme is beautiful! It's a pleasure to use, and everything is so clearly laid out. A great-looking and powerful tool." style={{animationDelay: '800ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[24] = el} className="opacity-0">
                            <FeedbackCard name="Rajesh B." quote="I was about to buy an underpowered PSU for a high-end GPU. The automatic compatibility warning saved me a lot of money and a huge headache." style={{animationDelay: '900ms'}} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
