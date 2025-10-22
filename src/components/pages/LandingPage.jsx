import React, { useState } from 'react';
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
import motherboardImage from '../../assets/Gemini_Generated_Image_7hnpcy7hnpcy7hnp-removebg-preview (1).png';

export function LandingPage({ setBuildToLoad }) {
    const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

    return (
        <div className="font-sans">
            {isHowItWorksOpen && <HowItWorksModal onClose={() => setIsHowItWorksOpen(false)} />}
            <HowItWorksFAB onOpen={() => setIsHowItWorksOpen(true)} />
            
            <section className="container mx-auto py-4 md:py-8 px-4 relative">
                <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden">
                    <div className="w-[600px] h-[600px] rounded-full" style={{
                        background: 'radial-gradient(circle, #1e40af 20%, #0c1a4d 60%, transparent 80%), radial-gradient(circle at 70% 30%, #4a044e, transparent 50%)',
                        backgroundSize: '200% 200%',
                        animation: 'rotate-planet 40s linear infinite',
                        boxShadow: '0 0 100px 20px #1e3a8a, inset 0 0 50px #1e3a8a'
                    }}></div>
                </div>
                 <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-center md:text-left md:pl-8">
                        <h2 className="text-5xl md:text-7xl font-extrabold leading-tight opacity-0 animate-fadeInUp" style={{animationDelay: '100ms'}}>
                            Craft Your Perfect <span className="text-white">PC</span>, <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">Intelligently.</span>
                        </h2>
                        <p className="text-gray-400 mt-6 max-w-xl mx-auto md:mx-0 text-lg opacity-0 animate-fadeInUp" style={{animationDelay: '200ms'}}>
                            Use our AI-powered builder to check compatibility, get expert advice, and create a high-performance PC with confidence. No more guesswork.
                        </p>
                        <Link to="/builder" className="mt-10 bg-cyan-500 hover:bg-cyan-600 transition-colors text-white font-bold text-lg py-3 px-8 rounded-full inline-flex items-center group shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] opacity-0 animate-fadeInUp" style={{animationDelay: '300ms'}}>
                            Build Your PC <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="hidden md:block relative overflow-hidden">
                       <div className="flex items-center justify-center h-full">
                           <img 
                               src={motherboardImage} 
                               alt="Motherboard Illustration" 
                               className="w-full max-w-2xl h-auto object-contain transform scale-125 hover:scale-135 transition-transform duration-300" 
                           />
                       </div>
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent"></div>
                    </div>
                </div>
            </section>
            <section id="features" className="py-20 bg-gray-950/50">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold mb-2">Why Choose PCDomain?</h3>
                    <p className="text-gray-400 mb-12">Everything you need for a seamless build experience.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard icon={<CheckCircle className="w-8 h-8 text-emerald-400"/>} title="AI Compatibility Checker" description="Our smart system automatically flags incompatible parts, ensuring your build works from day one." style={{animationDelay: '200ms'}} />
                        <FeatureCard icon={<Bot className="w-8 h-8 text-cyan-400"/>} title="Expert AI Assistant" description="Have questions? Our AI is trained on thousands of builds to give you tailored advice and suggestions." style={{animationDelay: '300ms'}} />
                        <FeatureCard icon={<HardDrive className="w-8 h-8 text-fuchsia-400"/>} title="Vast Component Library" description="We have an extensive, up-to-date database of CPUs, GPUs, motherboards, and more." style={{animationDelay: '400ms'}} />
                        <FeatureCard icon={<TrendingUp className="w-8 h-8 text-lime-400"/>} title="Real-Time Price Tracking" description="Component prices are updated regularly, ensuring you get the most accurate cost for your build." style={{animationDelay: '500ms'}} />
                        <FeatureCard icon={<Save className="w-8 h-8 text-rose-400"/>} title="Save & Load Builds" description="Create an account to save your builds, come back to them anytime, and load them for editing." style={{animationDelay: '600ms'}} />
                        <FeatureCard icon={<Gauge className="w-8 h-8 text-amber-400"/>} title="AI Performance Analytics" description="Get an AI-generated analysis of your build's expected performance in gaming and productivity." style={{animationDelay: '700ms'}} />
                    </div>
                </div>
            </section>

            <section id="featured-builds" className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold mb-2">Featured Builds</h3>
                    <p className="text-gray-400 mb-12">Not sure where to start? Check out our expertly crafted builds for every need.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredBuilds.map((build, index) => (
                            <FeaturedBuildCard key={index} build={build} setBuildToLoad={setBuildToLoad} delay={200 * (index + 1)} />
                        ))}
                    </div>
                </div>
            </section>
            
            <section id="faq" className="py-20 bg-gray-950/50">
                <div className="container mx-auto px-4">
                    <FAQ />
                </div>
            </section>
            
            <section id="feedback" className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold mb-2">Trusted by Builders</h3>
                    <p className="text-gray-400 mb-12">See what our users are saying about PCDomain.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeedbackCard name="Rohan S." quote="The AI checker saved me! I almost bought a CPU that didn't fit my motherboard. PCDomain caught it instantly." style={{animationDelay: '200ms'}} />
                        <FeedbackCard name="Priya K." quote="As a first-time builder, the AI assistant was a lifesaver. It answered all my questions and helped me pick the best parts for my budget." style={{animationDelay: '300ms'}} />
                        <FeedbackCard name="Amit J." quote="Finally, a PC builder that's actually easy to use. The interface is clean, and the real-time price updates are fantastic. Highly recommend!" style={{animationDelay: '400ms'}} />
                        <FeedbackCard name="Sneha G." quote="The 'Suggest a Build' feature is pure magic. Gave it my budget for video editing and it created a perfect parts list in seconds." style={{animationDelay: '500ms'}} />
                        <FeedbackCard name="Vikram P." quote="I've built PCs before, but the AI Performance Analyzer is a game-changer. It gives you a clear idea of what to expect before you buy." style={{animationDelay: '600ms'}} />
                        <FeedbackCard name="Anjali M." quote="Being able to save my builds to my profile and come back later is so convenient. The whole experience is top-notch." style={{animationDelay: '700ms'}} />
                        <FeedbackCard name="Kavita R." quote="The dark mode neon theme is beautiful! It's a pleasure to use, and everything is so clearly laid out. A great-looking and powerful tool." style={{animationDelay: '800ms'}} />
                        <FeedbackCard name="Rajesh B." quote="I was about to buy an underpowered PSU for a high-end GPU. The automatic compatibility warning saved me a lot of money and a huge headache." style={{animationDelay: '900ms'}} />
                    </div>
                </div>
            </section>
            
            <section id="newsletter" className="py-20">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                     <h3 className="text-3xl font-bold mb-2">Stay Up To Date</h3>
                    <p className="text-gray-400 mb-8">Subscribe to our newsletter for the latest component releases, build guides, and exclusive tips from our AI.</p>
                    <form className="flex flex-col sm:flex-row gap-2" onSubmit={e => e.preventDefault()}>
                        <div className="relative flex-grow">
                            <Mail className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input type="email" placeholder="you@example.com" className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-3 pl-10" />
                        </div>
                        <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 transition-colors text-white font-bold py-3 px-6 rounded-lg">Subscribe</button>
                    </form>
                </div>
            </section>
        </div>
    );
}
