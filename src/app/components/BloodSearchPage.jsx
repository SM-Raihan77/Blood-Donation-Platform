'use client';
import React, { useState } from 'react';
import { Search, Droplet, MapPin, User, Phone, Mail } from 'lucide-react';

// Importing JSON files for locations
import districtsData from '@/data/districts.json';
import upazilasData from '@/data/upazilas.json';

const BloodSearchPage = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [districtId, setDistrictId] = useState(''); // Tracking district ID
  const [upazilaName, setUpazilaName] = useState(''); // Tracking upazila name
  
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

  // Extracting actual data array from the JSON structure
  const districtsObj = districtsData.find(item => item && item.data);
  const actualDistricts = districtsObj ? districtsObj.data.filter(item => item && item.id) : [];

  const upazilasObj = upazilasData.find(item => item && item.data);
  const actualUpazilas = upazilasObj ? upazilasObj.data.filter(item => item && item.id) : [];

  // Filter upazilas based on selected district ID
  const filteredUpazilas = actualUpazilas.filter(
    (upz) => upz.district_id === districtId
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    // Finding the English name from the selected ID for the API query
    const selectedDistrict = actualDistricts.find(d => d.id === districtId);
    const districtName = selectedDistrict ? selectedDistrict.name : '';

    try {
      // Sending location names as query parameters to the backend
      const res = await fetch(
        `${API_BASE_URL}/api/donors/search?bloodGroup=${encodeURIComponent(bloodGroup)}&district=${districtName}&upazila=${upazilaName}`
      );
      const result = await res.json();
      
      if (result.success) {
        setDonors(result.data);
      } else {
        setDonors([]);
      }
    } catch (error) {
      console.error('Error occurred while searching:', error);
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* 🩸 Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-red-50 rounded-full text-red-600 mb-2">
            <Droplet size={36} className="fill-red-600" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Find a Blood Donor</h1>
          <p className="text-gray-500 text-sm">
            Provide the correct information to instantly find blood donors in your area.
          </p>
        </div>

        {/* 🔍 Search Form */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
            
            {/* Blood Group Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Blood Group</label>
              <select
                required
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white transition-colors cursor-pointer"
              >
                <option value="">Select Group</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            {/* District Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">District</label>
              <select
                required
                value={districtId}
                onChange={(e) => {
                  setDistrictId(e.target.value);
                  setUpazilaName(''); // Reset upazila selection when district changes
                }}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white transition-colors cursor-pointer"
              >
                <option value="">Select District</option>
                {actualDistricts.map((dist) => (
                  <option key={dist.id} value={dist.id}>
                    {dist.name} {dist.bn_name ? `(${dist.bn_name})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Upazila</label>
              <select
                required
                disabled={!districtId}
                value={upazilaName}
                onChange={(e) => setUpazilaName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select Upazila</option>
                {filteredUpazilas.map((upz) => (
                  <option key={upz.id} value={upz.name}>
                    {upz.name} {upz.bn_name ? `(${upz.bn_name})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="md:col-span-3 pt-4 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-10 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Search size={18} />
                    <span>Search</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* 📋 Donor Results Section */}
        <div className="space-y-4">
          {loading && (
            <div className="text-center py-12 text-gray-400 text-sm font-medium">
              Searching for blood donors...
            </div>
          )}

          {!loading && searched && donors.length === 0 && (
            <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-12 text-center">
              <p className="text-gray-400 text-sm font-medium">Sorry! No blood donors found for this group in this area.</p>
            </div>
          )}

          {!loading && searched && donors.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider px-2">
                👥 Total Donors Found: {donors.length}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {donors.map((donor) => (
                  <div key={donor._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex justify-between items-center hover:border-red-100 transition-all">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        <h4 className="font-bold text-gray-800">{donor.name}</h4>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin size={14} className="text-gray-400" />
                        <span>{donor.upazila}, {donor.district}</span>
                      </div>

                      <div className="flex flex-col gap-1 pt-1 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-gray-400" />
                          <span>{donor.phone || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-gray-400" />
                          <span className="truncate max-w-[180px]">{donor.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 text-red-600 font-black text-xl w-14 h-14 rounded-xl flex items-center justify-center border border-red-100 shrink-0">
                      {donor.bloodGroup}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BloodSearchPage;