import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Building2, Wallet } from 'lucide-react';

export function CheckoutModal({ build, user, onClose }) {
    const [step, setStep] = useState(1);
    const [details, setDetails] = useState({
        name: '',
        address: '',
        pincode: '',
        mobile: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNext = () => {
        if (step === 2) {
            if (!details.name || !details.address || !details.pincode || !details.mobile) {
                alert("Please fill in all details");
                return;
            }
        }
        setStep(prev => prev + 1);
    };

    const handlePayment = (method) => {
        alert(`Processing payment via ${method}... (This is a demo)`);
        onClose();
    };

    const renderStep1_OrderSummary = () => (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Order Summary</h3>
            <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {Object.entries(build.components).map(([key, component]) => {
                    if (!component) return null;
                    return (
                        <div key={key} className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg">
                            <div>
                                <p className="font-semibold text-gray-200">{component.name}</p>
                                <p className="text-xs text-gray-400 uppercase">{key}</p>
                            </div>
                            <p className="text-cyan-400 font-mono">Rs. {component.price.toLocaleString('en-IN')}</p>
                        </div>
                    );
                })}
            </div>
            <div className="border-t border-gray-700 pt-4 mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-200">Total Price</span>
                <span className="text-2xl font-bold text-cyan-400">Rs. {build.totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <button 
                onClick={handleNext}
                className="w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
                Proceed to Details
            </button>
        </div>
    );

    const renderStep2_Details = () => (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Shipping Details</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                    <input 
                        type="text"
                        name="name"
                        value={details.name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                        placeholder="Enter your full name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Full Address</label>
                    <textarea 
                        name="address"
                        value={details.address}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none h-24 resize-none"
                        placeholder="Enter your delivery address"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Pincode</label>
                        <input 
                            type="text"
                            name="pincode"
                            value={details.pincode}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                            placeholder="123456"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Mobile Number</label>
                        <input 
                            type="tel"
                            name="mobile"
                            value={details.mobile}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                            placeholder="9876543210"
                        />
                    </div>
                </div>
            </div>
            <button 
                onClick={handleNext}
                className="w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
                Proceed to Payment
            </button>
        </div>
    );

    const renderStep3_Payment = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Review & Pay</h3>
            
            <div className="bg-gray-800/50 p-4 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-gray-200 font-medium">{details.name}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Mobile:</span>
                    <span className="text-gray-200 font-medium">{details.mobile}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Address:</span>
                    <span className="text-gray-200 font-medium text-right max-w-[60%]">{details.address}, {details.pincode}</span>
                </div>
                <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between items-center">
                    <span className="text-gray-200 font-bold">Total Amount:</span>
                    <span className="text-xl font-bold text-cyan-400">Rs. {build.totalPrice.toLocaleString('en-IN')}</span>
                </div>
            </div>

            <div className="space-y-3">
                <p className="text-sm text-gray-400 font-medium">Select Payment Method:</p>
                <button onClick={() => handlePayment('UPI')} className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-700 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all group">
                    <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-cyan-400" />
                        <span className="font-medium text-gray-200">Pay with UPI</span>
                    </div>
                </button>
                <button onClick={() => handlePayment('Credit Card')} className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-700 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all group">
                    <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-purple-400" />
                        <span className="font-medium text-gray-200">Credit Card</span>
                    </div>
                </button>
                <button onClick={() => handlePayment('Debit Card')} className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-700 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all group">
                    <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-green-400" />
                        <span className="font-medium text-gray-200">Debit Card</span>
                    </div>
                </button>
                <button onClick={() => handlePayment('Netbanking')} className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-700 p-4 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all group">
                    <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-amber-400" />
                        <span className="font-medium text-gray-200">Netbanking</span>
                    </div>
                </button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
                    <h2 className="text-lg font-bold text-white">Checkout</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {step === 1 && renderStep1_OrderSummary()}
                    {step === 2 && renderStep2_Details()}
                    {step === 3 && renderStep3_Payment()}
                </div>

                <div className="p-4 bg-gray-900/50 border-t border-gray-800 flex justify-center gap-2">
                    <div className={`h-2 w-2 rounded-full transition-colors ${step >= 1 ? 'bg-cyan-500' : 'bg-gray-700'}`} />
                    <div className={`h-2 w-2 rounded-full transition-colors ${step >= 2 ? 'bg-cyan-500' : 'bg-gray-700'}`} />
                    <div className={`h-2 w-2 rounded-full transition-colors ${step >= 3 ? 'bg-cyan-500' : 'bg-gray-700'}`} />
                </div>
            </div>
        </div>
    );
}
