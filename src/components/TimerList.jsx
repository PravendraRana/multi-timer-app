import React from 'react';
import Timer from './Timer';
import { PlayCircle, PauseCircle, RotateCcw, List } from 'lucide-react';

export default function TimerList({
  timers,
  categories,
  expandedCategories,
  dispatchTimers,
  dispatchHistory,
  setExpandedCategories,
  setShowAddModal,
  setCurrentScreen,
  setShowCompletionModal,
  setCompletedTimer
}) {
  const toggleCategoryExpand = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const timersByCategory = timers.reduce((acc, timer) => {
    if (!timer || !timer.category) return acc; // Ensure timer and category exist
    if (!acc[timer.category]) {
      acc[timer.category] = [];
    }
    acc[timer.category].push(timer);
    return acc;
  }, {});

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Timers</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-1"
          >
            Add Timer
          </button>
          <button
            onClick={() => setCurrentScreen('history')}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-1"
          >
            <List size={18} />
            History
          </button>
        </div>
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No timers yet. Add your first timer to get started!</p>
        </div>
      )}

      {categories.map((category) => (
        <div key={category} className="mb-6 border rounded-lg overflow-hidden">
          <div
            className="flex justify-between items-center p-3 bg-gray-100 cursor-pointer"
            onClick={() => toggleCategoryExpand(category)}
          >
            <div className="flex items-center gap-2 font-medium">
              <span className="text-bold text-gray-500">{category}</span>
              <span className="text-sm text-gray-500">({timersByCategory[category]?.length || 0})</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatchTimers({ type: 'START_CATEGORY', payload: category });
                }}
                className="bg-green-600 text-white p-1 rounded"
              >
                <PlayCircle size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatchTimers({ type: 'PAUSE_CATEGORY', payload: category });
                }}
                className="bg-yellow-600 text-white p-1 rounded"
              >
                <PauseCircle size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatchTimers({ type: 'RESET_CATEGORY', payload: category });
                }}
                className="bg-red-600 text-white p-1 rounded"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {expandedCategories[category] &&
            timersByCategory[category]?.map((timer) => (
              <Timer
                key={timer.id}
                timer={timer}
                dispatchTimers={dispatchTimers}
                timers={timers}
                dispatchHistory={dispatchHistory}
                setShowCompletionModal={setShowCompletionModal}
                setCompletedTimer={setCompletedTimer}
              />
            ))}
        </div>
      ))}
    </div>
  );
}