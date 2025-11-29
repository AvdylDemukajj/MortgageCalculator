import React from 'react';
import Layout from './components/Layout';
import Wizard from './components/Wizard';
import StepProperty from './components/steps/StepProperty';
import StepIncome from './components/steps/StepIncome';
import StepOptions from './components/steps/StepOptions';
import StepResults from './components/steps/StepResults';

function App() {
  const steps = [
    { title: 'Property & Deposit', component: StepProperty },
    { title: 'Income & Details', component: StepIncome },
    { title: 'Mortgage Options', component: StepOptions },
    { title: 'Your Results', component: StepResults },
  ];

  return (
    <Layout>
      <Wizard steps={steps} />
    </Layout>
  );
}

export default App;
