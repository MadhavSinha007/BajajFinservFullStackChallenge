// App.jsx
import React, { useState } from 'react';
import DataInput from './components/DataInput';
import ResponseViewer from './components/ResponseViewer';
import Button from './components/Button';
import Header from './components/Header';
import Footer from './components/Footer';
import { submitData } from './utils/api';
import { validateAndParseInput } from './utils/inputParser';

const SAMPLE_INPUT = `A->B, A->C, B->D, C->E, E->F, X->Y, Y->Z, Z->X, P->Q, Q->R, G->H, G->H, G->I, hello, 1->2, A->`;

function App() {
  const [input, setInput] = useState(SAMPLE_INPUT);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    const entries = validateAndParseInput(input);
    if (entries.length === 0 && input.trim() !== '') {
      setError('No valid entries found. Please check your input format.');
      setLoading(false);
      return;
    }

    try {
      // API URL is now hardcoded - no input field needed
      const result = await submitData(entries);
      setResponse(result);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setResponse(null);
    setError(null);
  };

  const handleLoadSample = () => {
    setInput(SAMPLE_INPUT);
    setResponse(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 lg:py-10">
        <div className="space-y-8">
          {/* Hero Section */}
          <section className="text-center space-y-2 pb-2">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-xs font-mono font-semibold tracking-wide">
              HIERARCHY VISUALIZER
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">
              Tree Structure <span className="text-primary-600">Processor</span>
            </h1>
            <p className="text-neutral-500 max-w-2xl mx-auto text-sm sm:text-base">
              Enter node relationships in <code className="px-1.5 py-0.5 bg-neutral-100 rounded text-neutral-800 font-mono text-xs">X-&gt;Y</code> format.
              Separate entries with commas or newlines.
            </p>
          </section>

          {/* Controls */}
          <div className="space-y-6">
            <DataInput input={input} setInput={setInput} />
            
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <Button 
                onClick={handleSubmit} 
                isLoading={loading} 
                disabled={loading || !input.trim()}
                variant="primary"
              >
                Submit
              </Button>
              <Button onClick={handleLoadSample} variant="secondary">
                Load Sample
              </Button>
              <Button onClick={handleClear} variant="outline">
                Clear
              </Button>
            </div>
          </div>

          {/* Response Section */}
          <ResponseViewer response={response} error={error} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;