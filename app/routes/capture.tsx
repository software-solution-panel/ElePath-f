import React, { useState, useRef, useEffect } from 'react';
import { Camera, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import uploadService from '../service/uploadService';

const CaptureSubmitPage = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null); // New state for location
  const fileInputRef = useRef<HTMLInputElement>(null);

  const captureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Error getting location:', error);
            alert('Failed to capture location');
          }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCapturedImage(imageUrl);
      captureLocation();
    }
  };

  const imageUpload = async () => {
    if (capturedImage && location) {
      const file = (fileInputRef.current?.files ?? [])[0];
      if (file) {
        const response = await uploadService.uploadImageAndLocation(file, location.lat, location.lng);
        alert(response.message);
      }
    } else {
      alert('Please capture an image and allow location access.');
    }
  };

  const handleRecapture = () => {
    fileInputRef.current?.click();
  };

  return (
      <div className="w-full min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="sticky top-0 z-50 bg-gray-50 py-4">
            <div className="flex items-center justify-between max-w-lg mx-auto">
              <Link to="/homepage" className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700 cursor-pointer">
                <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700 cursor-pointer" />
              </Link>
              <span className="text-lg sm:text-xl font-semibold text-gray-800">Capture Image</span>
              <div className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-lg mx-auto pb-24">
            {/* Hidden File Input */}
            <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleCapture}
                ref={fileInputRef}
                className="hidden"
            />

            {/* Image Preview Box */}
            <div className="mb-6 sm:mb-8">
              <div className="aspect-square bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden shadow-md">
                {capturedImage ? (
                    <img src={capturedImage} alt="Captured preview" className="w-full h-full object-cover" />
                ) : (
                    <img className="w-full h-full object-cover" />
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 sm:space-y-6 px-4 sm:px-8 md:px-12">
              <button
                  onClick={handleRecapture}
                  className="w-full bg-white border-2 border-blue-500 text-blue-500 font-semibold py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors text-base sm:text-lg hover:bg-blue-75"
              >
                <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
                Capture / Recapture
              </button>

              <button
                  className="w-full bg-blue-500 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl hover:bg-blue-600 transition-colors text-base sm:text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={!capturedImage}
                  onClick={imageUpload}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CaptureSubmitPage;
