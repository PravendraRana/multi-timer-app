import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';

export default function TimerHistory({ history, setCurrentScreen }) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Timer History</h1>
        <button
          onClick={() => setCurrentScreen('home')}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
        >
          Back to Timers
        </button>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="mx-auto mb-4 text-gray-400" size={64} />
          <p className="text-gray-500">No timer history yet. Complete some timers to see them here!</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-100 p-3 font-medium">
            <div>Timer Name</div>
            <div>Category</div>
            <div>Completed At</div>
          </div>

          {history.map((item) => (
            <div key={item.id} className="grid grid-cols-3 p-3 border-t">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                {item.timerName}
              </div>
              <div>{item.category}</div>
              <div>{new Date(item.completedAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}