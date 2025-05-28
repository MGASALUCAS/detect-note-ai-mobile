
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/MobileLayout';
import LoadingSpinner from '@/components/LoadingSpinner';

const Detection = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if image exists
    const image = localStorage.getItem('currencyImage');
    if (!image) {
      navigate('/upload');
      return;
    }

    // Simulate AI detection process with progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Generate random detection results for demo
            const isGenuine = Math.random() > 0.3; // 70% chance of genuine
            const confidence = Math.floor(Math.random() * 20) + 80; // 80-99% confidence
            
            const result = {
              isGenuine,
              confidence,
              analysis: {
                watermark: isGenuine ? 'Detected' : 'Not Found',
                texture: isGenuine ? 'Authentic' : 'Suspicious',
                serialNumber: isGenuine ? 'Valid Format' : 'Invalid Format',
                microPrint: isGenuine ? 'Present' : 'Missing'
              }
            };
            
            localStorage.setItem('detectionResult', JSON.stringify(result));
            navigate('/results');
          }, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <MobileLayout showHeader title="AI Detection" onBack={() => navigate('/upload')}>
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">AI Analysis in Progress</h2>
            <p className="text-gray-600 mt-2">Analyzing currency authenticity...</p>
          </div>

          <div className="space-y-6">
            <LoadingSpinner size="lg" />
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="text-gray-800 font-semibold">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="text-left space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${progress > 20 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className={progress > 20 ? 'text-green-600' : 'text-gray-500'}>Image preprocessing complete</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${progress > 50 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className={progress > 50 ? 'text-green-600' : 'text-gray-500'}>Feature extraction in progress</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${progress > 80 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className={progress > 80 ? 'text-green-600' : 'text-gray-500'}>AI model analysis</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${progress === 100 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className={progress === 100 ? 'text-green-600' : 'text-gray-500'}>Generating results</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Detection;
