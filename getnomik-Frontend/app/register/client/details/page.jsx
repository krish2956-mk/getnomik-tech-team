"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const ClientDetailsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Documents
    identityProof: null,
    addressProof: null,
    additionalDocuments: []
  });

  useEffect(() => {
    // Check if user came from auth page
    const method = searchParams.get('method');
    if (!method) {
      router.push('/register/client/auth');
    }
  }, [searchParams, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'additionalDocuments') {
        setFormData(prev => ({
          ...prev,
          additionalDocuments: [...prev.additionalDocuments, file]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [type]: file
        }));
      }
    }
  };

  const removeAdditionalDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      additionalDocuments: prev.additionalDocuments.filter((_, i) => i !== index)
    }));
  };

  const validateStep1 = () => {
    const { firstName, lastName, phoneNumber, address, city, state, pincode } = formData;
    if (!firstName || !lastName || !phoneNumber || !address || !city || !state || !pincode) {
      alert('Please fill in all required fields');
      return false;
    }
    if (phoneNumber.length < 10) {
      alert('Please enter a valid phone number');
      return false;
    }
    if (pincode.length !== 6) {
      alert('Please enter a valid 6-digit pincode');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const { identityProof, addressProof, additionalDocuments } = formData;
    
    // Check if any required document is missing
    if (!identityProof) {
      alert('Please upload your identity proof document (Aadhar Card/Passport/PAN Card)');
      return false;
    }
    if (!addressProof) {
      alert('Please upload your address proof document (Utility Bill/Rental Agreement)');
      return false;
    }
    if (!additionalDocuments || additionalDocuments.length === 0) {
      alert('Please upload at least one additional document');
      return false;
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsLoading(true);
    try {
      // TODO: Implement API call to submit form data and create user session
      // For now, just simulate the process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // After successful registration, redirect to the main page
      alert ("registered successfully")
      router.push('/');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/register/client/auth"
            className="inline-flex items-center text-green-700 hover:text-green-800 mb-6 transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to authentication
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Registration
          </h1>
          <p className="text-gray-600">
            Please provide your details and upload required documents
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
                    ? 'bg-green-700' 
                    : 'bg-gray-600 '
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
                    ? 'bg-green-700 ' 
                    : 'bg-gray-600 '
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
                  Documents
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
          <form onSubmit={handleSubmit}>
            {currentStep === 1 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                    placeholder="Enter your 10-digit phone number"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                      placeholder="6-digit pincode"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-800 transition-colors duration-300 font-medium"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Identity Proof (Aadhar Card/Passport/PAN Card) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'identityProof')}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                    required
                  />
                  {formData.identityProof && (
                    <p className="mt-1 text-sm text-gray-500">
                      Selected file: {formData.identityProof.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Proof (Utility Bill/Rental Agreement) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'addressProof')}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                    required
                  />
                  {formData.addressProof && (
                    <p className="mt-1 text-sm text-gray-500">
                      Selected file: {formData.addressProof.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Documents *
                    <span className="text-sm text-gray-500 ml-1">(Upload at least one document)</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'additionalDocuments')}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                    required
                  />
                  {formData.additionalDocuments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {formData.additionalDocuments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm text-gray-600">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeAdditionalDocument(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Upload supporting documents
                  </p>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-800 transition-colors duration-300 font-medium ${
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
                      'Complete Registration'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By registering, you agree to our{' '}
            <Link href="/terms" className="text-green-700 hover:text-green-800">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-green-700 hover:text-green-800">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsPage; 