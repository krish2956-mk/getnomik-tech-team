"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AdvocateRegister = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    barCouncilNumber: '',
    barCouncilState: '',
    experience: '',
    education: '',
    password: '',
    confirmPassword: '',
    advocateName: '',
    enrollmentNumber: '',
    stateBarCouncil: '',
    address: '',
    verificationIcon: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'barCouncilNumber', 
      'barCouncilState', 'experience', 'education', 
      'password', 'confirmPassword', 'advocateName', 'enrollmentNumber', 
      'stateBarCouncil', 'address'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    // Phone format (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return false;
    }

    // Password length
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return false;
    }

    // Password match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // TODO: Add form validation and API call
    alert("Advocate registration submitted successfully! Redirecting to role selection...");
    router.push("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link 
            href="/register" 
            className="inline-flex items-center text-green-700 hover:text-green-800 mb-6 transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to role selection
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Advocate Registration
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our platform as a legal professional and connect with clients seeking expert legal services
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg shadow-gray-600 border border-black rounded-2xl p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-8">
            {/* Personal Information */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-600">
                Personal Information
              </h2>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
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

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
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

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
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
                placeholder="Enter your phone number"
              />
            </div>

            {/* Professional Information */}
            <div className="md:col-span-2 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-600">
                Professional Information
              </h2>
            </div>

            <div className="space-y-2">
              <label htmlFor="barCouncilNumber" className="block text-sm font-medium text-gray-700">
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

            <div className="space-y-2">
              <label htmlFor="barCouncilState" className="block text-sm font-medium text-gray-700">
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

            {/* Advocate Authentication Details  */}
            <div className="space-y-2">
              <label htmlFor="advocateName" className="block text-sm font-medium text-gray-700">Advocate Name (as registered with Bar Council)</label>
              <input 
                type="text" 
                id="advocateName" 
                name="advocateName" 
                value={formData.advocateName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300" 
                placeholder="Enter your full name as registered" 
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="enrollmentNumber" className="block text-sm font-medium text-gray-700">Enrollment Number</label>
              <input 
                type="text" 
                id="enrollmentNumber" 
                name="enrollmentNumber" 
                value={formData.enrollmentNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300" 
                placeholder="Enter your enrollment number" 
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="stateBarCouncil" className="block text-sm font-medium text-gray-700">State Bar Council</label>
              <input 
                type="text" 
                id="stateBarCouncil" 
                name="stateBarCouncil" 
                value={formData.stateBarCouncil}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300" 
                placeholder="e.g., Bar Council of Delhi" 
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Registered Address</label>
              <textarea 
                id="address" 
                name="address" 
                value={formData.address}
                onChange={handleChange}
                rows="3" 
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300" 
                placeholder="Enter your registered address"
                required
              ></textarea>
            </div>
            <div className="space-y-2">
              <label htmlFor="verificationIcon" className="block text-sm font-medium text-gray-700">Verification Icon (Optional)</label>
              <input type="file" id="verificationIcon" name="verificationIcon" className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300" />
            </div>
            {/* End Advocate Authentication Details */}

          

            <div className="space-y-2">
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
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

            <div className="md:col-span-2 space-y-2">
              <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                Education
              </label>
              <textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                rows="3"
                placeholder="Enter your educational qualifications (e.g., LLB, LLM, etc.)"
                required
              />
            </div>

            {/* Account Security */}
            <div className="md:col-span-2 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-600">
                Account Security
              </h2>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                required
                placeholder="Create a strong password"
              />
              <p className="text-sm text-gray-500 mt-1">
                Must be at least 8 characters long with numbers and special characters
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                required
                placeholder="Confirm your password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10">
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-4 px-6 rounded-lg hover:bg-green-800 transition-colors duration-300 font-medium text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Register as Advocate
            </button>
          </div>

          {/* Terms and Login */}
          <div className="mt-8 text-center text-sm text-gray-600 space-y-4">
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
            <p>
              Already have an account?{' '}
              <Link href="/login" className="text-green-700 hover:text-green-800 font-medium">
                Login here
              </Link>
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AdvocateRegister; 