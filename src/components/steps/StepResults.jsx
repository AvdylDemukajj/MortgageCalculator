import React, { useState, useEffect } from 'react';
import { calculateMortgage } from '../../utils/calculateMortgage';
import { motion } from 'framer-motion';
import { RefreshCw, Calendar, Percent, ArrowLeft, Info } from 'lucide-react';

const StepResults = ({ data, updateData, onBack }) => {
  const { propertyValue, depositAmount, mortgageTerm, interestRate } = data;
  
  const [localTerm, setLocalTerm] = useState(mortgageTerm);
  const [localRate, setLocalRate] = useState(interestRate);

  useEffect(() => {
    setLocalTerm(mortgageTerm);
    setLocalRate(interestRate);
  }, [mortgageTerm, interestRate]);

  const loanAmount = Number(propertyValue) - Number(depositAmount);
  const { monthlyPayment, totalRepayment, totalInterest } = calculateMortgage(loanAmount, localRate, localTerm);

  // Calculate percentages for chart, with fallback to prevent division by zero
  const principalPercent = totalRepayment > 0 ? (loanAmount / totalRepayment) * 100 : 0;
  const interestPercent = totalRepayment > 0 ? (totalInterest / totalRepayment) * 100 : 0;
  
  // Use actual percentages for display (they should add up to 100%)
  const displayPrincipalPercent = principalPercent;
  const displayInterestPercent = interestPercent;

  return (
    <div className="space-y-8">
      {/* Hero Result Card */}
      <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-white shadow-xl relative overflow-hidden" role="region" aria-label="Mortgage calculation results">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" aria-hidden="true"></div>
        <div className="relative z-10">
          <h3 className="text-primary-light font-medium mb-2 uppercase tracking-wider text-sm">Estimated Monthly Payment</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-5xl md:text-6xl font-bold tracking-tight" aria-live="polite" aria-atomic="true">
              £{monthlyPayment.toLocaleString()}
            </span>
          </div>
          <p className="mt-4 text-white/90 text-lg font-light">
            Based on borrowing <span className="font-semibold text-white">£{loanAmount.toLocaleString()}</span> over <span className="font-semibold text-white">{localTerm} years</span> at <span className="font-semibold text-white">{localRate}%</span>.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Breakdown Chart */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-6">Total Cost Breakdown</h4>
          
          {loanAmount > 0 && totalRepayment > 0 ? (
            <>
              <div className="flex h-64 items-end space-x-8 justify-center mb-6" role="img" aria-label={`Loan amount ${loanAmount.toLocaleString()} pounds, Interest amount ${totalInterest.toLocaleString()} pounds`}>
                <div className="w-24 flex flex-col items-center group">
                  <div className="text-xs font-semibold text-gray-700 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">£{loanAmount.toLocaleString()}</div>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(displayPrincipalPercent, 5)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full bg-secondary rounded-t-lg relative"
                    aria-label={`Loan amount: ${loanAmount.toLocaleString()} pounds`}
                    style={{ minHeight: '30px' }}
                  >
                    <div className="absolute bottom-0 w-full bg-white/10 h-full" aria-hidden="true"></div>
                  </motion.div>
                  <span className="mt-3 text-sm font-semibold text-gray-700">Loan</span>
                  <span className="text-xs text-gray-500 mt-1">£{loanAmount.toLocaleString()}</span>
                </div>

                <div className="w-24 flex flex-col items-center group">
                  <div className="text-xs font-semibold text-gray-700 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">£{totalInterest.toLocaleString()}</div>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(displayInterestPercent, 5)}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="w-full bg-accent rounded-t-lg"
                    aria-label={`Interest amount: ${totalInterest.toLocaleString()} pounds`}
                    style={{ minHeight: '30px' }}
                  />
                  <span className="mt-3 text-sm font-semibold text-gray-700">Interest</span>
                  <span className="text-xs text-gray-500 mt-1">£{totalInterest.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
                <span className="text-gray-700 font-semibold">Total Repayment</span>
                <span className="text-xl font-bold text-gray-900" aria-live="polite">£{totalRepayment.toLocaleString()}</span>
              </div>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">No data available</p>
                <p className="text-sm text-gray-400">Please complete the previous steps to see the breakdown</p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Sliders */}
        <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200">
          <h4 className="font-bold text-gray-900 mb-6 flex items-center">
            <RefreshCw size={18} className="mr-2 text-primary" aria-hidden="true" /> 
            Adjust your scenario
          </h4>
          
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="results-term" className="text-sm font-semibold text-gray-900 flex items-center">
                  <Calendar size={16} className="mr-2 text-gray-500" aria-hidden="true" /> Term Length
                </label>
                <span className="font-bold text-primary" aria-live="polite" aria-atomic="true">{localTerm} years</span>
              </div>
              <input
                type="range"
                id="results-term"
                min="5"
                max="40"
                value={localTerm}
                onChange={(e) => setLocalTerm(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={`Mortgage term: ${localTerm} years`}
                aria-valuemin="5"
                aria-valuemax="40"
                aria-valuenow={localTerm}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 years</span>
                <span>40 years</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="results-rate" className="text-sm font-semibold text-gray-900 flex items-center">
                  <Percent size={16} className="mr-2 text-gray-500" aria-hidden="true" /> Interest Rate
                </label>
                <span className="font-bold text-primary" aria-live="polite" aria-atomic="true">{localRate}%</span>
              </div>
              <input
                type="range"
                id="results-rate"
                min="1"
                max="10"
                step="0.1"
                value={localRate}
                onChange={(e) => setLocalRate(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={`Interest rate: ${localRate} percent`}
                aria-valuemin="1"
                aria-valuemax="10"
                aria-valuenow={localRate}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1%</span>
                <span>10%</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white rounded-xl border-2 border-blue-100 bg-blue-50/50 flex items-start space-x-3">
            <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={18} aria-hidden="true" />
            <p className="text-sm text-blue-800 leading-relaxed">
              <strong className="font-semibold">Note:</strong> Adjusting these values only affects this result view. It helps you see how changes impact your monthly cost. Your actual mortgage terms will be determined when you apply.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-8 flex justify-center">
        <button
          onClick={onBack}
          className="text-gray-700 hover:text-primary font-semibold flex items-center transition-colors px-6 py-3 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-primary/30"
          aria-label="Go back to edit mortgage details"
        >
          <ArrowLeft className="mr-2" size={18} aria-hidden="true" />
          Start Over / Edit Details
        </button>
      </div>
    </div>
  );
};

export default StepResults;
