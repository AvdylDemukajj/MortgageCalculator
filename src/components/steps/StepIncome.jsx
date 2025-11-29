import React from 'react';
import { Wallet, TrendingUp, CreditCard, ArrowRight, ArrowLeft, Info } from 'lucide-react';

const StepIncome = ({ data, updateData, onNext, onBack }) => {
  const { annualIncome, otherIncome, monthlyCommitments } = data;

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

  const annualIncomeNum = Number(annualIncome) || 0;
  const otherIncomeNum = Number(otherIncome) || 0;
  const monthlyCommitmentsNum = Number(monthlyCommitments) || 0;
  const totalAnnualIncome = annualIncomeNum + otherIncomeNum;
  const totalMonthlyCommitments = monthlyCommitmentsNum * 12;
  const netAnnualIncome = totalAnnualIncome - totalMonthlyCommitments;

  const isValid = annualIncome && annualIncomeNum > 0;

  return (
    <div className="space-y-8">
      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start space-x-3">
        <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={20} aria-hidden="true" />
        <div>
          <p className="text-sm text-blue-800 leading-relaxed">
            <strong className="font-semibold">Why we need this:</strong> We use your income information to calculate how much you can afford to borrow. All information is kept secure and confidential.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="group">
          <label htmlFor="annualIncome" className="block text-sm font-semibold text-gray-900 mb-2">
            Annual Income <span className="text-red-500" aria-label="required">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors" aria-hidden="true">
              <Wallet size={20} />
            </div>
            <input
              type="text"
              id="annualIncome"
              name="annualIncome"
              value={annualIncome ? formatCurrency(annualIncome) : ''}
              onChange={handleChange}
              className="w-full pl-12 pr-16 py-4 bg-white border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-semibold text-lg text-gray-900 placeholder-gray-400"
              placeholder="e.g. 45,000"
              aria-label="Annual income in British pounds"
              aria-required="true"
              aria-invalid={annualIncome && annualIncomeNum <= 0}
              aria-describedby="annualIncome-help"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-600 font-semibold text-sm" aria-hidden="true">
              £
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600" id="annualIncome-help">
            Your total yearly income before tax (salary, wages, etc.)
          </p>
          {annualIncome && annualIncomeNum > 0 && (
            <p className="mt-1 text-sm text-primary font-medium">
              ✓ Annual income: £{formatCurrency(annualIncome)}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="group">
            <label htmlFor="otherIncome" className="block text-sm font-semibold text-gray-900 mb-2">
              Other Income <span className="text-gray-500 font-normal text-xs">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors" aria-hidden="true">
                <TrendingUp size={20} />
              </div>
              <input
                type="text"
                id="otherIncome"
                name="otherIncome"
                value={otherIncome ? formatCurrency(otherIncome) : ''}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-semibold text-lg text-gray-900 placeholder-gray-400"
                placeholder="0"
                aria-label="Other annual income in British pounds (optional)"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">Bonuses, investments, rental income, etc.</p>
          </div>

          <div className="group">
            <label htmlFor="monthlyCommitments" className="block text-sm font-semibold text-gray-900 mb-2">
              Monthly Commitments <span className="text-gray-500 font-normal text-xs">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors" aria-hidden="true">
                <CreditCard size={20} />
              </div>
              <input
                type="text"
                id="monthlyCommitments"
                name="monthlyCommitments"
                value={monthlyCommitments ? formatCurrency(monthlyCommitments) : ''}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-semibold text-lg text-gray-900 placeholder-gray-400"
                placeholder="0"
                aria-label="Monthly financial commitments in British pounds (optional)"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">Loans, credit cards, other debts</p>
          </div>
        </div>
      </div>

      {(otherIncome || monthlyCommitments) && (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Income Summary</h4>
          <div className="space-y-1 text-sm">
            {otherIncome && (
              <div className="flex justify-between">
                <span className="text-gray-600">Total Annual Income:</span>
                <span className="font-semibold text-gray-900">£{formatCurrency(totalAnnualIncome.toString())}</span>
              </div>
            )}
            {monthlyCommitments && (
              <div className="flex justify-between">
                <span className="text-gray-600">Annual Commitments:</span>
                <span className="font-semibold text-gray-900">£{formatCurrency(totalMonthlyCommitments.toString())}</span>
              </div>
            )}
            {(otherIncome || monthlyCommitments) && (
              <div className="flex justify-between pt-2 border-t border-gray-300">
                <span className="text-gray-900 font-semibold">Net Annual Income:</span>
                <span className="font-bold text-primary text-lg">£{formatCurrency(netAnnualIncome.toString())}</span>
              </div>
            )}
          </div>
        </div>
      )}

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
          disabled={!isValid}
          className={`flex-1 py-4 px-6 rounded-xl font-bold text-white text-lg shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary/50 ${
            isValid 
              ? 'bg-primary hover:bg-primary-light shadow-primary/30 cursor-pointer' 
              : 'bg-gray-300 cursor-not-allowed shadow-none opacity-60'
          }`}
          aria-label={isValid ? "Continue to next step" : "Please enter your annual income to continue"}
        >
          Next Step <ArrowRight className="ml-2" size={20} aria-hidden="true" />
        </button>
      </div>
      {!isValid && (
        <p className="text-sm text-gray-500 text-center">
          Please enter your annual income to continue
        </p>
      )}
    </div>
  );
};

export default StepIncome;
