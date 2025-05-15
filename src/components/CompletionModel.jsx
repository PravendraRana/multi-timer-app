import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function CompletionModal({ completedTimer, setShowCompletionModal }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
        <CheckCircle2 size={64} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Timer Completed!</h2>
        <p className="text-lg mb-4 text-gray-500">
          Congratulations! Your timer "{completedTimer?.name}" has completed.
        </p>
        <button
          onClick={() => setShowCompletionModal(false)}
          className="w-full bg-green-600 text-white py-2 rounded-lg"
        >
          OK
        </button>
      </div>
    </div>
  );
}