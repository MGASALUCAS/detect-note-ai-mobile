
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';

const DetectedImage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const storedImage = localStorage.getItem('currencyImage');
    if (!storedImage) {
      navigate('/upload');
      return;
    }
    setImage(storedImage);
  }, [navigate]);

  if (!image) return null;

  return (
    <MobileLayout showHeader title="Detected Image" onBack={() => navigate('/results')}>
      <div className="space-y-6">
        {/* Image Display */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="relative">
            <div 
              className={`relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                isZoomed ? 'transform scale-105' : ''
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img 
                src={image} 
                alt="Currency with detection highlights" 
                className="w-full h-80 object-contain"
              />
              
              {/* Simulated detection highlights */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Watermark highlight */}
                <div className="absolute top-6 right-6 w-16 h-16 border-2 border-green-400 rounded-lg bg-green-400 bg-opacity-20">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Watermark
                  </div>
                </div>
                
                {/* Serial number highlight */}
                <div className="absolute bottom-6 left-6 w-20 h-8 border-2 border-blue-400 rounded bg-blue-400 bg-opacity-20">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Serial No.
                  </div>
                </div>
                
                {/* Security thread highlight */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-32 border-2 border-purple-400 bg-purple-400 bg-opacity-20">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Security Thread
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Tap image to {isZoomed ? 'zoom out' : 'zoom in'}
            </div>
          </div>
        </div>

        {/* Detection Features */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Detected Security Features</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-400 rounded-full mt-1"></div>
              <div>
                <h3 className="font-semibold text-green-800">Watermark</h3>
                <p className="text-green-700 text-sm">Authentic watermark pattern detected in upper right area</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-3 h-3 bg-blue-400 rounded-full mt-1"></div>
              <div>
                <h3 className="font-semibold text-blue-800">Serial Number</h3>
                <p className="text-blue-700 text-sm">Valid serial number format and positioning verified</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-3 h-3 bg-purple-400 rounded-full mt-1"></div>
              <div>
                <h3 className="font-semibold text-purple-800">Security Thread</h3>
                <p className="text-purple-700 text-sm">Embedded security thread visible and properly aligned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate('/results')}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 h-12"
          >
            Back to Results
          </Button>
          
          <Button
            onClick={() => {
              localStorage.removeItem('currencyImage');
              localStorage.removeItem('detectionResult');
              navigate('/upload');
            }}
            variant="outline"
            className="w-full h-12"
          >
            Analyze New Currency
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default DetectedImage;
