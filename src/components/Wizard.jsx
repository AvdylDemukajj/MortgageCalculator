import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const Wizard = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const savedData = localStorage.getItem('mortgageCalculatorData');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to load saved data", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mortgageCalculatorData', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <nav className="mb-12" aria-label="Progress">
        <ol className="flex justify-between items-center relative">
          {/* Background Line - centered vertically with circles */}
          <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 -z-10 rounded-full" aria-hidden="true"></div>
          
          {/* Active Line - centered vertically with circles */}
          <div 
            className="absolute top-5 left-0 h-1 bg-primary -z-10 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            aria-hidden="true"
          ></div>

          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <li key={index} className="flex flex-col items-center relative z-10">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white ${
                    isCompleted ? 'border-primary bg-primary text-white' :
                    isCurrent ? 'border-primary text-primary shadow-lg scale-110 ring-4 ring-primary/20' :
                    'border-gray-300 text-gray-400'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                  role="status"
                  aria-label={`Step ${index + 1}: ${step.title}${isCompleted ? ' - Completed' : isCurrent ? ' - Current' : ''}`}
                >
                  {isCompleted ? <Check size={20} strokeWidth={3} aria-hidden="true" /> : <span className="font-bold text-sm" aria-hidden="true">{index + 1}</span>}
                </div>
                <span className={`mt-3 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                  isCurrent ? 'text-primary font-bold' : 'text-gray-500'
                }`}>
                  {step.title.split(' ')[0]}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Main Card */}
      <div className="glass-panel rounded-2xl p-8 md:p-10 min-h-[500px] relative overflow-hidden">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{steps[currentStep].title}</h2>
          <p className="text-gray-600 mt-2 font-medium">Please fill in the details below to proceed.</p>
          <p className="text-sm text-gray-500 mt-1">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        <AnimatePresence mode='wait' custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <CurrentStepComponent 
              data={formData} 
              updateData={updateFormData} 
              onNext={nextStep}
              onBack={prevStep}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wizard;
