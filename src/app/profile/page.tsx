"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Mail, Phone, MapPin, Store, Calendar, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-[#069668] text-white rounded-full flex items-center justify-center text-3xl font-bold">
              {user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.full_name}</h2>
              <p className="text-gray-600">{user.role === 'seller' ? 'Seller' : 'Buyer'}</p>
              <div className="flex items-center gap-2 mt-2">
                <Shield size={16} className={user.is_verified ? 'text-green-500' : 'text-gray-400'} />
                <span className="text-sm text-gray-600">
                  {user.is_verified ? 'Verified' : 'Not Verified'}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              {user.phone_number && (
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{user.phone_number}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-medium">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h3>
              
              <div className="flex items-center gap-3">
                <Store size={20} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">CNIC Number</p>
                  <p className="font-medium">{user.cnic_number}</p>
                </div>
              </div>

              {user.role === 'seller' && user.store_name && (
                <>
                  <div className="flex items-center gap-3">
                    <Store size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Store Name</p>
                      <p className="font-medium">{user.store_name}</p>
                    </div>
                  </div>

                  {user.store_address && (
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Store Address</p>
                        <p className="font-medium">{user.store_address}</p>
                      </div>
                    </div>
                  )}

                  {user.pickup_address && (
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Pickup Address</p>
                        <p className="font-medium">{user.pickup_address}</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
