'use client'; 

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'; 
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaGenderless, 
  FaMapMarkerAlt, 
  FaMap, 
  FaLock, 
  FaCamera 
} from 'react-icons/fa';

// Import JSON data
import districtsData from '@/data/districts.json';
import upazilasData from '@/data/upazilas.json';
import { authClient } from '@/lib/auth-client';

// JSON data handling logic 
const findMainData = (jsonFile) => {
  if (!jsonFile || !Array.isArray(jsonFile)) return [];
  const targetObj = jsonFile.find(item => item && Array.isArray(item.data));
  return targetObj ? targetObj.data : [];
};

const allDistricts = findMainData(districtsData);
const allUpazilas = findMainData(upazilasData);

const RegisterPage = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      gender: '',
      district: '',
      upazila: '',
      bloodGroup: '',
      password: '',
      confirmPassword: '',
      profilePhoto: null
    }
  });

  const selectedDistrict = watch('district');
  const selectedBloodGroup = watch('bloodGroup');
  const password = watch('password'); 
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Upazila dropdown logic
  useEffect(() => {
    if (selectedDistrict) {
      const filtered = allUpazilas.filter(
        (upazila) => String(upazila.district_id) === String(selectedDistrict)
      );
      setFilteredUpazilas(filtered);
      setValue('upazila', ''); 
    } else {
      setFilteredUpazilas([]);
      setValue('upazila', '');
    }
  }, [selectedDistrict, setValue]);

  // প্রোফাইল ছবি আপলোড এবং প্রিভিউ হ্যান্ডলিং
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('profilePhoto', file); 
      setPhotoPreview(URL.createObjectURL(file)); 
    }
  };

  // function  to handle form submission

  const onSubmit = async (formData) => {
    console.log("🚀 FORM START", formData);

  const payload = {
    email: formData.email,
    password: formData.password,
    name: formData.fullName,
    phone: formData.phone,
    gender: formData.gender,
    bloodGroup: formData.bloodGroup,
    district: formData.district,
    upazila: formData.upazila,
  };

  console.log("📦 PAYLOAD:", payload);

    try {
      // দ্রষ্টব্য: যদি প্রোফাইল পিকচার ব্যাকএন্ডে পাঠাতে চান, 
      // তবে ক্লাউডিনারি/এস৩-তে আগে আপলোড করে ইউআরএল তৈরি করে নেওয়া ভালো।
      // অথবা multipart/form-data ব্যবহার করতে হবে।

      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.fullName,
        phone: formData.phone,
        gender: formData.gender,
        district: formData.district,
        upazila: formData.upazila,
        bloodGroup: formData.bloodGroup,
      });

      if (error) {
        console.error(error);
        return;
      }

      console.log('Signup successful', data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-8 border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-700 tracking-tight">
            Join the Lifesaving Community
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Create an account to become a donor and save lives
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center border-2 border-gray-200 overflow-hidden">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <FaUser className="text-gray-400 text-4xl" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition">
                <FaCamera className="text-gray-600 text-xs" />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handlePhotoChange}
                />
              </label>
            </div>
            <span className="text-xs font-semibold text-gray-600 mt-2">Profile Photo</span>
          </div>

          {/* Full Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3.5 text-gray-400 text-sm" />
                <input 
                  type="text" 
                  placeholder="Donor Name" 
                  {...register('fullName', { required: 'Name is required' })}
                  className={`w-full pl-9 pr-3 py-2.5 bg-white text-gray-800 border rounded-lg text-sm focus:outline-none focus:ring-1 placeholder-gray-400 ${errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-red-500'}`}
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3.5 text-gray-400 text-sm" />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  {...register('email', { required: 'Email is required' })}
                  className={`w-full pl-9 pr-3 py-2.5 bg-white text-gray-800 border rounded-lg text-sm focus:outline-none focus:ring-1 placeholder-gray-400 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-red-500'}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          {/* Phone & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number</label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3.5 text-gray-400 text-sm" />
                <input 
                  type="tel" 
                  placeholder="+880 1XXX XXXXXX" 
                  {...register('phone', { required: 'Phone is required' })}
                  className={`w-full pl-9 pr-3 py-2.5 bg-white text-gray-800 border rounded-lg text-sm focus:outline-none focus:ring-1 placeholder-gray-400 ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-red-500'}`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Gender</label>
              <div className="relative">
                <FaGenderless className="absolute left-3 top-3.5 text-gray-400 text-base" />
                <select 
                  {...register('gender', { required: 'Gender is required' })}
                  className={`w-full pl-9 pr-10 py-2.5 bg-white text-gray-800 border rounded-lg text-sm focus:outline-none focus:ring-1 appearance-none ${errors.gender ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-red-500'}`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
            </div>
          </div>

          {/* District & Upazila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">District</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3.5 text-gray-400 text-sm" />
                <select 
                  {...register('district', { required: 'District is required' })}
                  className={`w-full pl-9 pr-10 py-2.5 bg-white text-gray-800 border rounded-lg text-sm focus:outline-none focus:ring-1 appearance-none ${errors.district ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-red-500'}`}
                >
                  <option value="">Select District</option>
                  {allDistricts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name} / {district.bn_name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Upazila</label>
              <div className="relative">
                <FaMap className="absolute left-3 top-3.5 text-gray-400 text-sm" />
                <select 
                  disabled={!selectedDistrict}
                  {...register('upazila', { required: 'Upazila is required' })}
                  className={`w-full pl-9 pr-10 py-2.5 bg-white text-gray-800 border rounded-lg text-sm focus:outline-none focus:ring-1 appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.upazila ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-red-500'}`}
                >
                  <option value="">
                    {selectedDistrict ? 'Select Upazila' : 'Select a District first'}
                  </option>
                  {filteredUpazilas.map((upazila) => (
                    <option key={upazila.id} value={upazila.id}>
                      {upazila.name} / {upazila.bn_name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              {errors.upazila && <p className="text-red-500 text-xs mt-1">{errors.upazila.message}</p>}
            </div>
          </div>

          {/* Blood Group Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Blood Group</label>
            
            <input 
              type="hidden" 
              {...register('bloodGroup', { required: 'Blood group is required' })} 
            />
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {bloodGroups.map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => setValue('bloodGroup', group, { shouldValidate: true })} 
                  className={`py-2 text-sm font-semibold rounded-lg border transition ${
                    selectedBloodGroup === group
                      ? 'bg-red-800 text-white border-red-800'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  } ${errors.bloodGroup ? 'border-red-500' : ''}`}
                >
                  {group}
                </button>
              ))}
            </div>
            {errors.bloodGroup && <p className="text-red-500 text-xs mt-1">{errors.bloodGroup.message}</p>}
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3.5 text-gray-400 text-sm" />
                <input 
                  type="password" 
                  placeholder="........" 
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                  className={`w-full pl-9 pr-3 py-2.5 bg-white text-gray-800 border rounded-lg text-sm focus:outline-none focus:ring-1 placeholder-gray-400 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-red-500'}`}
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3.5 text-gray-400 text-sm" />
                <input 
                  type="password" 
                  placeholder="........" 
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'Passwords do not match' 
                  })}
                  className={`w-full pl-9 pr-3 py-2.5 bg-white text-gray-800 border rounded-lg text-sm focus:outline-none focus:ring-1 placeholder-gray-400 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-red-500'}`}
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-red-800 hover:bg-red-900 text-white font-medium py-3 rounded-lg text-sm shadow transition duration-200"
            >
              Complete Registration
            </button>
          </div>

          {/* Footer Link */}
          <div className="text-center text-xs text-gray-500 mt-4">
            Already have an account?{' '}
            <a href="#login" className="text-red-700 font-semibold hover:underline">
              Login here
            </a>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RegisterPage;