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
                            <FeatureCard icon={<TrendingUp className="w-8 h-8 text-lime-400"/>} title="Real-Time Price Tracking" description="Component prices are updated regularly to reflect current market rates, ensuring you get the most accurate cost for your build." style={{animationDelay: '500ms'}} />
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
                            <FeedbackCard name="Rohan Sharma" rating={5} quote="Dude, the AI checker literally saved my wallet! Was about to order a CPU that wouldn't even fit my motherboard. PCDomain caught it right away." style={{animationDelay: '200ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[18] = el} className="opacity-0">
                            <FeedbackCard name="Emily Thompson" rating={4.5} quote="I had zero clue what I was doing with my first build. The AI assistant basically held my hand through the whole thing. Can't recommend this enough!" style={{animationDelay: '300ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[19] = el} className="opacity-0">
                            <FeedbackCard name="Amit Joshi" rating={5} quote="Honestly? Best PC builder site I've used. Super clean interface, prices update in real-time... what more do you want? 10/10." style={{animationDelay: '400ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[20] = el} className="opacity-0">
                            <FeedbackCard name="Sneha Gupta" rating={4.5} quote="That 'Suggest a Build' button is absolute MAGIC. Told it my video editing budget and boom - perfect parts list in like 10 seconds. Mind blown." style={{animationDelay: '500ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[21] = el} className="opacity-0">
                            <FeedbackCard name="Marcus Johnson" rating={5} quote="Been building rigs for years, but this AI Performance Analyzer thing? Game changer. Finally know what FPS to expect BEFORE dropping cash." style={{animationDelay: '600ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[22] = el} className="opacity-0">
                            <FeedbackCard name="Anjali Mehta" rating={4} quote="Love that I can save my builds and come back whenever. Been tweaking mine for weeks lol. The whole site just... works, you know?" style={{animationDelay: '700ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[23] = el} className="opacity-0">
                            <FeedbackCard name="Yuki Tanaka" rating={4.5} quote="The dark mode with all the neon colors? Chef's kiss. It's gorgeous AND super easy to navigate. Finally a tool that looks as good as it works!" style={{animationDelay: '800ms'}} />
                        </div>
                        <div ref={(el) => sectionsRef.current[24] = el} className="opacity-0">
                            <FeedbackCard name="Rajesh Patel" rating={4} quote="Almost bought a 650W PSU for my RTX 4080 build. The compatibility warning popped up and saved me from a HUGE mistake. Thanks PCDomain!" style={{animationDelay: '900ms'}} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
