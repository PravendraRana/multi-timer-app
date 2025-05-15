import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddTimerModal({
  setShowAddModal,
  dispatchTimers,
  setCategories,
  setExpandedCategories,
}) {
  const [newTimer, setNewTimer] = useState({
    name: '',
    duration: 60,
    category: '',
    enableHalfwayAlert: false,
  });

  const handleAddTimer = () => {
    if (!newTimer.name || !newTimer.category) {
      alert('Please provide both name and category');
      return;
    }

    const timer = {
      id: Date.now().toString(),
      name: newTimer.name,
      duration: parseInt(newTimer.duration),
      remainingTime: parseInt(newTimer.duration),
      category: newTimer.category,
      status: 'paused',
      enableHalfwayAlert: newTimer.enableHalfwayAlert,
    };

    dispatchTimers({ type: 'ADD_TIMER', payload: timer });

    // Reset form
    setNewTimer({
      name: '',
      duration: 60,
      category: '',
      enableHalfwayAlert: false,
    });

    setShowAddModal(false);

    // Make sure category is expanded
    setExpandedCategories((prev) => ({
      ...prev,
      [timer.category]: true,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Timer</h2>
          <button onClick={() => setShowAddModal(false)} className="text-gray-500">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timer Name</label>
            <input
              type="text"
              value={newTimer.name}
              onChange={(e) => setNewTimer({ ...newTimer, name: e.target.value })}
              placeholder="e.g., Workout Timer"
              className="w-full border rounded-lg p-2 text-gray-700 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (seconds)</label>
            <input
              type="number"
              value={newTimer.duration}
              onChange={(e) => setNewTimer({ ...newTimer, duration: e.target.value })}
              min="1"
              className="w-full border rounded-lg p-2 text-gray-700 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              value={newTimer.category}
              onChange={(e) => setNewTimer({ ...newTimer, category: e.target.value })}
              placeholder="e.g., Workout"
              className="w-full border rounded-lg p-2 text-gray-700 bg-white"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="halfway-alert"
              checked={newTimer.enableHalfwayAlert}
              onChange={(e) => setNewTimer({ ...newTimer, enableHalfwayAlert: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="halfway-alert" className="text-sm text-gray-700">
              Enable halfway alert
            </label>
          </div>

          <button
            onClick={handleAddTimer}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Add Timer
          </button>
        </div>
      </div>
    </div>
  );
}