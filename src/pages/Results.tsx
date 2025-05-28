
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';

interface DetectionResult {
  isGenuine: boolean;
  confidence: number;
  analysis: {
    watermark: string;
    texture: string;
    serialNumber: string;
    microPrint: string;
  };
}

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<DetectionResult | null>(null);

  useEffect(() => {
    const storedResult = localStorage.getItem('detectionResult');
    if (!storedResult) {
      navigate('/upload');
      return;
    }
    setResult(JSON.parse(storedResult));
  }, [navigate]);

  if (!result) return null;

  const getResultColor = () => {
    return result.isGenuine ? 'from-green-500 to-emerald-600' : 'from-red-500 to-rose-600';
  };

  const getResultText = () => {
    return result.isGenuine ? 'GENUINE' : 'FAKE';
  };

  const getSummaryText = () => {
    if (result.isGenuine) {
      return `Based on AI analysis including watermark detection, texture analysis, and security feature verification, this currency note appears to be genuine with ${result.confidence}% confidence.`;
    } else {
      return `AI analysis has detected suspicious characteristics in this currency note. Missing or invalid security features suggest this may be counterfeit with ${result.confidence}% confidence.`;
    }
  };

  return (
    <MobileLayout showHeader title="Detection Results" onBack={() => navigate('/upload')}>
      <div className="space-y-6">
        {/* Main Result Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className={`w-24 h-24 bg-gradient-to-br ${getResultColor()} rounded-full mx-auto mb-4 flex items-center justify-center`}>
            {result.isGenuine ? (
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          
          <h1 className={`text-3xl font-bold mb-2 ${result.isGenuine ? 'text-green-600' : 'text-red-600'}`}>
            {getResultText()}
          </h1>
          
          <div className="mb-4">
            <span className="text-2xl font-bold text-gray-800">{result.confidence}%</span>
            <span className="text-gray-600 ml-2">Confidence</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className={`bg-gradient-to-r ${getResultColor()} h-3 rounded-full transition-all duration-1000`}
              style={{ width: `${result.confidence}%` }}
            ></div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {getSummaryText()}
          </p>
        </div>

        {/* Analysis Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Detailed Analysis</h2>
          
          <div className="space-y-3">
            {Object.entries(result.analysis).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </span>
                <span className={`font-semibold ${
                  value.includes('Detected') || value.includes('Authentic') || value.includes('Valid') || value.includes('Present')
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate('/detected-image')}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 h-12"
          >
            View Detected Image
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
            Start New Detection
          </Button>
        </div>

        {/* History Note */}
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-800 text-sm">Detection Saved</h3>
              <p className="text-blue-600 text-xs mt-1">
                This result has been saved to your local history for future reference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Results;
