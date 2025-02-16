import React from 'react';
import { Menu, LogOut, Home, Clock, User, Bell, ShieldPlus, Camera, MapPinned, Route } from 'lucide-react';
import { Link } from 'react-router';

const ElePath = () => {
  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50 w-[1000px]">
        <div className="sticky top-0 z-50 bg-gray-50 py-4">
          <div className="flex items-center justify-between">
            <Menu className="w-6 h-6 text-gray-700" />
            <img
                className="mx-auto h-10 sm:h-80 md:h-20 w-auto mt-8"
                src="app/assests/images/elepath-logo-hr.png"
            />
            <Link to="/login">
              <LogOut className="w-6 h-6 text-gray-700" />
            </Link>
          </div>
        </div>

        <div className="pb-24">
          <div className="relative mb-8">
            <div className="bg-blue-100 rounded-xl p-4 sm:p-6 mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800 text-base sm:text-lg">Report</p>
                  <p className="text-gray-600 text-sm sm:text-base">Tuskers & Elephants</p>
                </div>
                <img 
                  src="app/assests/images/elepath-vector-image.png" 
                  alt="Elephant Icon" 
                  className="w-35 h-20 sm:w-35 sm:h-15 object-contain"
                />
              </div>
            </div>

          </div>

          {/* Quick Access Section */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-gray-800 font-medium mb-4 text-base sm:text-lg">Quick Access</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <Link to="/capture" className="aspect-square bg-blue-100 p-4 sm:p-6 rounded-xl flex flex-col items-center justify-center hover:bg-blue-200 transition-colors">
                {/* <button className="aspect-square bg-blue-100 p-4 sm:p-6 rounded-xl flex flex-col items-center justify-center hover:bg-blue-200 transition-colors"> */}
                  <Camera className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mb-2" />
                  <span className="text-sm sm:text-base text-gray-700 font-bold">Report Sighting</span>
                {/* </button> */}
              </Link>
              
              <Link to="/livemap" className="aspect-square bg-red-100 p-4 sm:p-6 rounded-xl flex flex-col items-center justify-center hover:bg-red-200 transition-colors">
                {/* <button className="aspect-square bg-red-100 p-4 sm:p-6 rounded-xl flex flex-col items-center justify-center hover:bg-red-200 transition-colors"> */}
                  <MapPinned className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mb-2" />
                  <span className="text-sm sm:text-base text-gray-700 font-bold">Live Map</span>
                {/* </button> */}
              </Link>

              <button className="aspect-square bg-purple-100 p-4 sm:p-6 rounded-xl flex flex-col items-center justify-center hover:bg-purple-200 transition-colors">
                <Route className="w-12 h-12 sm:w-16 sm:h-16 text-purple-600 mb-2" />
                <span className="text-sm sm:text-base text-gray-700 font-bold">Movement Tracking</span>
              </button>
              
              <button className="aspect-square bg-green-100 p-4 sm:p-6 rounded-xl flex flex-col items-center justify-center hover:bg-green-200 transition-colors">
                <ShieldPlus className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 mb-2" />
                <span className="text-sm sm:text-base text-gray-700 font-bold">Survival Tips</span>
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ElePath;
