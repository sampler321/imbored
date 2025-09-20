'use client';

import { useState } from 'react';

export default function Home() {
  const [activity, setActivity] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getActivity = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/activity');
      const data = await response.json();
      setActivity(data.activity);
      setError('');
    } catch (err) {
      console.error('Error fetching activity:', err);
      setError('Oops! Could not load activity 😅');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container max-w-2xl mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.02]">
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            I&apos;m Bored!
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            Welcome to the I&apos;m Bored app! This application helps you find fun activities 
            to do when you&apos;re feeling bored.
          </p>

          <button
            onClick={getActivity}
            disabled={isLoading}
            className={`
              w-full sm:w-auto px-8 py-4 text-lg font-medium text-white 
              bg-gradient-to-r from-blue-500 to-purple-600 
              rounded-xl shadow-lg hover:shadow-xl 
              transform transition-all duration-200 
              hover:-translate-y-1 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
              disabled:opacity-50 disabled:cursor-not-allowed
              ${isLoading ? 'animate-pulse' : ''}
            `}
          >
            {isLoading ? 'Finding activity...' : 'Suggest an Activity'}
          </button>

          {error ? (
            <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <p className="text-red-500 dark:text-red-400 font-medium">{error}</p>
            </div>
          ) : activity && (
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg transform transition-all duration-500 animate-fade-in">
              <p className="text-xl text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                {activity}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
