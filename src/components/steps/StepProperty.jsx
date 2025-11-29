import React from 'react';
import { Building2, PoundSterling, ArrowRight, AlertCircle } from 'lucide-react';

const StepProperty = ({ data, updateData, onNext }) => {
  const { propertyValue, depositAmount } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Allow numbers and empty string, remove any non-numeric characters
    const numericValue = value.replace(/[^\d]/g, '');
    updateData({ [name]: numericValue });
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return Number(value).toLocaleString('en-GB');
  };

  const propertyValueNum = Number(propertyValue) || 0;
  const depositAmountNum = Number(depositAmount) || 0;
  const loanAmount = propertyValueNum - depositAmountNum;
  const depositPercentage = propertyValueNum > 0 ? (depositAmountNum / propertyValueNum * 100).toFixed(1) : 0;

  const isValid = propertyValue && depositAmount && depositAmountNum < propertyValueNum && depositAmountNum > 0;
  const hasError = propertyValue && depositAmount && depositAmountNum >= propertyValueNum;
  const depositTooLow = depositAmountNum > 0 && depositAmountNum < propertyValueNum * 0.05;

  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        <div className="group">
          <label htmlFor="propertyValue" className="block text-sm font-semibold text-gray-900 mb-2">
            Property Value <span className="text-red-500" aria-label="required">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors" aria-hidden="true">
              <Building2 size={20} />
            </div>
            <input
              type="text"
              id="propertyValue"
              name="propertyValue"
              value={propertyValue ? formatCurrency(propertyValue) : ''}
              onChange={handleChange}
              className="w-full pl-12 pr-16 py-4 bg-white border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-semibold text-lg text-gray-900 placeholder-gray-400"
              placeholder="e.g. 250,000"
              aria-label="Property value in British pounds"
              aria-required="true"
              aria-invalid={propertyValue && propertyValueNum <= 0}
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-600 font-semibold text-sm" aria-hidden="true">
              £
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600" id="propertyValue-help">
            Enter the total price of the property you want to buy.
          </p>
          {propertyValue && propertyValueNum > 0 && (
            <p className="mt-1 text-sm text-primary font-medium">
              ✓ Valid property value
            </p>
          )}
        </div>

        <div className="group">
          <label htmlFor="depositAmount" className="block text-sm font-semibold text-gray-900 mb-2">
            Deposit Amount <span className="text-red-500" aria-label="required">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors" aria-hidden="true">
              <PoundSterling size={20} />
            </div>
            <input
              type="text"
              id="depositAmount"
              name="depositAmount"
              value={depositAmount ? formatCurrency(depositAmount) : ''}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-semibold text-lg text-gray-900 placeholder-gray-400"
              placeholder="e.g. 50,000"
              aria-label="Deposit amount in British pounds"
              aria-required="true"
              aria-invalid={hasError}
              aria-describedby={hasError ? "deposit-error" : depositTooLow ? "deposit-warning" : "deposit-help"}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600" id="deposit-help">
            Enter the amount of cash you have available for the deposit.
          </p>
          {depositAmount && depositAmountNum > 0 && !hasError && (
            <div className="mt-2 space-y-1">
              <p className="text-sm text-primary font-medium">
                ✓ Deposit: {depositPercentage}% of property value
              </p>
              {loanAmount > 0 && (
                <p className="text-sm text-gray-600">
                  Loan amount: <span className="font-semibold">£{formatCurrency(loanAmount.toString())}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {hasError && (
        <div 
          role="alert"
          className="p-4 bg-red-50 text-red-800 rounded-xl text-sm font-medium border-2 border-red-200 flex items-start space-x-3"
          id="deposit-error"
        >
          <AlertCircle className="flex-shrink-0 mt-0.5" size={20} aria-hidden="true" />
          <div>
            <strong className="font-bold">Error:</strong> Deposit amount must be less than the property value. Please check your entries.
          </div>
        </div>
      )}

      {depositTooLow && !hasError && (
        <div 
          role="alert"
          className="p-4 bg-amber-50 text-amber-800 rounded-xl text-sm font-medium border-2 border-amber-200 flex items-start space-x-3"
          id="deposit-warning"
        >
          <AlertCircle className="flex-shrink-0 mt-0.5" size={20} aria-hidden="true" />
          <div>
            <strong className="font-bold">Note:</strong> A deposit of less than 5% may limit your mortgage options. Most lenders require at least 5-10% deposit.
          </div>
        </div>
      )}

      <div className="pt-6">
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary/50 ${
            isValid 
              ? 'bg-primary hover:bg-primary-light shadow-primary/30 cursor-pointer' 
              : 'bg-gray-300 cursor-not-allowed shadow-none opacity-60'
          }`}
          aria-label={isValid ? "Continue to next step" : "Please complete all required fields to continue"}
        >
          Next Step <ArrowRight className="ml-2" size={20} aria-hidden="true" />
        </button>
        {!isValid && (
          <p className="mt-2 text-sm text-gray-500 text-center">
            Please fill in all required fields to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default StepProperty;
