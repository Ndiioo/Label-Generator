
import React, { useState } from 'react';
import { LabelData, INITIAL_LABEL_DATA } from './types';
import LabelForm from './components/LabelForm';
import LabelPreview from './components/LabelPreview';
import { Printer, RefreshCw, Package } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<LabelData>(INITIAL_LABEL_DATA);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm("Reset all data to default?")) {
      setData(INITIAL_LABEL_DATA);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Package className="text-white w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                SPX <span className="text-orange-600">Label Generator</span>
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw size={18} />
                Reset
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 shadow-sm transition-all active:scale-95"
              >
                <Printer size={18} />
                Print Label
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Section */}
          <div className="lg:col-span-5 no-print">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-semibold text-gray-800">Label Details</h2>
                <p className="text-xs text-gray-500 mt-1">Fill in the information to update the preview</p>
              </div>
              <div className="p-6">
                <LabelForm data={data} onChange={setData} />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="sticky top-24 print-area w-full max-w-[600px]">
              <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 no-print mb-4">
                 <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                   Live Preview
                 </p>
              </div>
              <div className="bg-white p-6 shadow-2xl border border-gray-100 rounded-sm">
                 <LabelPreview data={data} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Print Overlay CSS is in index.html */}
    </div>
  );
};

export default App;
