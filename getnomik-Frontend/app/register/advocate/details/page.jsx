"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const AdvocateDetailsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authMethod = searchParams.get('method');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    barCouncilNumber: '',
    barCouncilState: '',
    experience: '',
    education: '',
    advocateName: '',
    enrollmentNumber: '',
    stateBarCouncil: '',
    address: '',
    verificationIcon: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Personal Info, 2: Professional Info

  useEffect(() => {
    // Redirect if no auth method is specified
    if (!authMethod) {
      router.push('/register/advocate/auth');
    }
  }, [authMethod, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        verificationIcon: file
      }));
    }
  };

  const validateStep1 = () => {
    const { firstName, lastName, phone } = formData;
    if (!firstName || !lastName || !phone) {
      alert('Please fill in all required fields');
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid 10-digit phone number');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const requiredFields = [
      'barCouncilNumber', 'barCouncilState', 'experience', 'education',
      'advocateName', 'enrollmentNumber', 'stateBarCouncil', 'address'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      router.push('/register/advocate/auth');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsLoading(true);
    try {
      // TODO: Add API call to submit advocate details
      // For now, just simulate the process
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("registered successfully")
      router.push('/');
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-green-700 hover:text-green-800 mb-6 transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Advocate Registration
          </h1>
          <p className="text-gray-600">
            {currentStep === 1 ? 'Personal Information' : 'Professional Information'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 px-4">
          <div className="relative">
            {/* Background Track */}
            <div className="h-1 bg-gray-100 rounded-full"></div>
            
            {/* Progress Steps */}
            <div className="absolute top-0 left-0 right-0 flex justify-between -mt-2">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  currentStep >= 1 
                    ? 'bg-green-700 ring-4 ring-green-100' 
                    : 'bg-gray-600 ring-4 ring-gray-50'
                } transition-all duration-300`}>
                 
                </div>
                <span className={`mt-3 text-sm font-medium ${
                  currentStep >= 1 ? 'text-green-700' : 'text-gray-400'
                } transition-colors duration-300`}>
                  Personal Info
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  currentStep >= 2 
                    ? 'bg-green-700 ring-4 ring-green-100' 
                    : 'bg-gray-600 ring-4 ring-gray-50'
                } transition-all duration-300`}>
                  {currentStep > 2 && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`mt-3 text-sm font-medium ${
                  currentStep >= 2 ? 'text-green-700' : 'text-gray-400'
                } transition-colors duration-300`}>
                  Professional Info
                </span>
              </div>
            </div>

            {/* Progress Fill */}
            <div 
              className="absolute top-0 left-0 h-1 bg-green-700 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${(currentStep - 1) * 100}%`,
                boxShadow: '0 0 8px rgba(0, 98, 90, 0.3)'
              }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-600 rounded-xl p-8 shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]">
          <form onSubmit={currentStep === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            {currentStep === 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                    required
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                    required
                    placeholder="Enter your last name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                    required
                    placeholder="Enter your 10-digit phone number"
                    pattern="[0-9]{10}"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter a 10-digit phone number without spaces or special characters
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Professional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="barCouncilNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Bar Council Number
                    </label>
                    <input
                      type="text"
                      id="barCouncilNumber"
                      name="barCouncilNumber"
                      value={formData.barCouncilNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                      required
                      placeholder="Enter your bar council number"
                    />
                  </div>

                  <div>
                    <label htmlFor="barCouncilState" className="block text-sm font-medium text-gray-700 mb-1">
                      Bar Council State
                    </label>
                    <select
                      id="barCouncilState"
                      name="barCouncilState"
                      value={formData.barCouncilState}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                      required
                    >
                      <option value="">Select state</option>
                      <option value="delhi">Delhi</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="tamil-nadu">Tamil Nadu</option>
                      <option value="west-bengal">West Bengal</option>
                      <option value="gujarat">Gujarat</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="advocateName" className="block text-sm font-medium text-gray-700 mb-1">
                      Advocate Name (as registered)
                    </label>
                    <input
                      type="text"
                      id="advocateName"
                      name="advocateName"
                      value={formData.advocateName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                      required
                      placeholder="Enter your full name as registered"
                    />
                  </div>

                  <div>
                    <label htmlFor="enrollmentNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Enrollment Number
                    </label>
                    <input
                      type="text"
                      id="enrollmentNumber"
                      name="enrollmentNumber"
                      value={formData.enrollmentNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                      required
                      placeholder="Enter your enrollment number"
                    />
                  </div>

                  <div>
                    <label htmlFor="stateBarCouncil" className="block text-sm font-medium text-gray-700 mb-1">
                      State Bar Council
                    </label>
                    <input
                      type="text"
                      id="stateBarCouncil"
                      name="stateBarCouncil"
                      value={formData.stateBarCouncil}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                      required
                      placeholder="e.g., Bar Council of Delhi"
                    />
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                      required
                      placeholder="Enter years of experience"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Registered Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                      required
                      placeholder="Enter your registered address"
                    ></textarea>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                      Education
                    </label>
                    <textarea
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                      required
                      placeholder="Enter your educational qualifications (e.g., LLB, LLM, etc.)"
                    ></textarea>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="verificationIcon" className="block text-sm font-medium text-gray-700 mb-1">
                      Verification Document (Optional)
                    </label>
                    <input
                      type="file"
                      id="verificationIcon"
                      name="verificationIcon"
                      onChange={handleFileChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                      accept="image/*,.pdf"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Upload your bar council registration certificate or any other verification document
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex space-x-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 bg-green-700 text-white py-3 px-4 rounded-lg hover:bg-green-800 transition-colors duration-300 font-medium ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  currentStep === 1 ? 'Next' : 'Complete Registration'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By registering, you agree to our{' '}
            <Link href="/terms" className="text-green-700 hover:text-green-800 font-medium">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-green-700 hover:text-green-800 font-medium">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvocateDetailsPage; 