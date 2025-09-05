import React, { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/authService";
import {toast} from "sonner";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const navigate = useNavigate();
  

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};


  const handleSubmit = async () => {
    if (!formData.email || !formData.password) return;

    setIsLoading(true);
    try{
        const response = await login(formData.email, formData.password);
    
         const token = response; 
         if (!token) throw new Error("No token returned from API");
         localStorage.setItem('authToken', token);
         toast.success('Login successful!');
        navigate('/admin/products');
    }catch(error: any){
        console.error(error.response?.data?.message || error.message);
        toast.error(`Login failed: ${error.response?.data?.message || error.message}`);
  }finally{
        setIsLoading(false);
  }
};

 const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter' && formData.email && formData.password) {
    handleSubmit();
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md bg-white border border-gray-200 shadow-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Welcome Back Admin
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Sign in to your account
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-3 text-gray-400"/>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-3 py-2 border rounded-md border-gray-300 focus:border-blue-400 focus:outline-none"
                placeholder="Enter your email"
              />
           
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute  left-3 top-2.5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-10 py-2 border rounded-md border-gray-300 focus:border-blue-400 focus:outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            disabled={!formData.email || !formData.password || isLoading}
            className="w-full py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:bg-blue-300"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Forgot Password */}
          <div className="text-right mt-2">
            <button className="text-sm text-gray-500 hover:underline">
              Forgot password?
            </button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
