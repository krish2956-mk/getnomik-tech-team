"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: 'advocate',
      title: 'Advocate',
      description: 'Join as a legal professional to provide expert services',
      icon: '⚖️',
      path: '/register/advocate'
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage and oversee platform operations',
      icon: '👨‍💼',
      path: '/register/admin'
    },
    {
      id: 'client',
      title: 'Client',
      description: 'Access legal services and connect with advocates',
      icon: '👤',
      path: '/register/client'
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    router.push(role.path);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 border border-gray-600 py-10 rounded-lg shadow-[5px_5px_0px_0px_rgba(109,40,217)]">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Getnomik
          </h1>
          <p className="text-lg text-gray-600">
            Choose your role to get started
          </p>
        </div>

        {/* Login Option */}
        <div className="text-center mb-12">
          <p className="text-gray-600 mb-2">Already have an account?</p>
          <Link
            href="/login"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800 transition-colors duration-300"
          >
            Login to your account
          </Link>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1  md:grid-cols-3 gap-12">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role)}
              className="relative group bg-white p-8 rounded-xl shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] hover:shadow-lg transition-all duration-300 border border-gray-600  hover:border-green-500"
            >
              <div className="text-center  ">
                <span className="text-4xl mb-4 block">{role.icon}</span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {role.title}
                </h3>
                <p className="text-gray-600 text-sm">{role.description}</p>
              </div>
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-green-500 transition-colors duration-300"></div>
            </button>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            By registering, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
