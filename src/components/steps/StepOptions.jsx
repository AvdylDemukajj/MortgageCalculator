import React, { useEffect } from 'react';
import { Info, ArrowRight, ArrowLeft, Calendar, Percent } from 'lucide-react';

const StepOptions = ({ data, updateData, onNext, onBack }) => {
  const { mortgageTerm, interestRate } = data;

  useEffect(() => {
    if (!mortgageTerm) updateData({ mortgageTerm: '25' });
    if (!interestRate) updateData({ interestRate: '4.5' });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const term = mortgageTerm || 25;
  const rate = interestRate || 4.5;

  return (
    <div className="space-y-8">
      <div className="bg-blue-50/50 p-5 rounded-xl border-2 border-blue-100 flex items-start space-x-3">
        <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={20} aria-hidden="true" />
        <div>
          <h3 className="text-sm font-bold text-blue-900 mb-1">Key Assumptions</h3>
          <p className="text-sm text-blue-800 leading-relaxed">
            We use these values to estimate your payments. Adjust them below to see how they impact your results. These are estimates and actual rates may vary.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-end mb-4">
            <label htmlFor="mortgageTerm" className="flex items-center text-sm font-semibold text-gray-900">
              <Calendar className="mr-2 text-primary" size={18} aria-hidden="true" /> Mortgage Term
            </label>
            <span className="text-2xl font-bold text-primary" aria-live="polite" aria-atomic="true">
              {term} <span className="text-sm font-medium text-gray-500">years</span>
            </span>
          </div>
          <input
            type="range"
            id="mortgageTerm"
            name="mortgageTerm"
            min="5"
            max="40"
            step="1"
            value={term}
            onChange={handleChange}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-light transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={`Mortgage term: ${term} years`}
            aria-valuemin="5"
            aria-valuemax="40"
            aria-valuenow={term}
          />
          <div className="flex justify-between text-xs font-medium text-gray-500 mt-2">
            <span>5 years</span>
            <span>40 years</span>
          </div>
          <p className="mt-2 text-xs text-gray-600">
            Longer terms mean lower monthly payments but more interest paid overall.
          </p>
        </div>

        <div>
          <div className="flex justify-between items-end mb-4">
            <label htmlFor="interestRate" className="flex items-center text-sm font-semibold text-gray-900">
              <Percent className="mr-2 text-primary" size={18} aria-hidden="true" /> Interest Rate
            </label>
            <span className="text-2xl font-bold text-primary" aria-live="polite" aria-atomic="true">
              {rate}%
            </span>
          </div>
          <input
            type="range"
            id="interestRate"
            name="interestRate"
            min="1"
            max="10"
            step="0.1"
            value={rate}
            onChange={handleChange}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-light transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={`Interest rate: ${rate} percent`}
            aria-valuemin="1"
            aria-valuemax="10"
            aria-valuenow={rate}
          />
          <div className="flex justify-between text-xs font-medium text-gray-500 mt-2">
            <span>1%</span>
            <span>10%</span>
          </div>
          <p className="mt-2 text-xs text-gray-600">
            Current market rates typically range from 3% to 6%. Your actual rate will depend on your credit profile.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Quick Tip</h4>
        <p className="text-sm text-gray-700">
          You can adjust these values later in the results page to see how different scenarios affect your monthly payments.
        </p>
      </div>

      <div className="pt-6 flex space-x-4">
        <button
          onClick={onBack}
          className="px-6 py-4 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center focus:outline-none focus:ring-4 focus:ring-gray-300/50"
          aria-label="Go back to previous step"
        >
          <ArrowLeft className="mr-2" size={20} aria-hidden="true" /> Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-4 px-6 rounded-xl font-bold text-white text-lg bg-primary hover:bg-primary-light shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary/50"
          aria-label="Calculate mortgage results"
        >
          Calculate Results <ArrowRight className="ml-2" size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default StepOptions;
