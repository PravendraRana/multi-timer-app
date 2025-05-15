import React, { useEffect } from 'react';
import { PlayCircle, PauseCircle, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function Timer({ timer = {}, dispatchTimers, dispatchHistory, timers, setShowCompletionModal, setCompletedTimer }) {
  if (!timer || !timer.name) {
    return <div className="text-red-500">Error: Timer data is missing or invalid.</div>;
  }

  const getProgressPercentage = (timer) => {
    return ((timer.duration - timer.remainingTime) / timer.duration) * 100;
  };

useEffect(() => {
    const interval = setInterval(() => {
      let completedTimerFound = false;
      let halfwayAlertNeeded = false;
      let halfwayTimerName = '';

      timers.forEach(timer => {
        if (timer.status === 'running' && timer.remainingTime > 0) {
          dispatchTimers({
            type: 'UPDATE_TIMER',
            payload: {
              id: timer.id,
              updates: { remainingTime: timer.remainingTime - 1 }
            }
          });

          // Check for halfway alert
          if (timer.enableHalfwayAlert && timer.remainingTime === Math.floor(timer.duration / 2)) {
            halfwayAlertNeeded = true;
            halfwayTimerName = timer.name;
          }
        } 
        // Check if timer completed
        else if (timer.status === 'running' && timer.remainingTime === 0) {
          dispatchTimers({
            type: 'UPDATE_TIMER',
            payload: {
              id: timer.id,
              updates: { status: 'completed' }
            }
          });
          
          // Add to history
          dispatchHistory({
            type: 'ADD_TO_HISTORY',
            payload: {
              id: Date.now().toString(),
              timerName: timer.name,
              category: timer.category,
              completedAt: new Date().toISOString()
            }
          });
          
          completedTimerFound = true;
          setCompletedTimer(timer);
        }
      });

      if (halfwayAlertNeeded) {
        alert(`Halfway point reached for timer: ${halfwayTimerName}!`);
      }

      if (completedTimerFound) {
        setShowCompletionModal(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timers]);


  return (
    <div className="p-3 border-t">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-medium">{timer.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{timer.remainingTime}s</span>
            {timer.enableHalfwayAlert && <span className="text-yellow-500">Halfway Alert</span>}
            <span
              className={`px-2 py-0.5 rounded text-xs ${
                timer.status === 'running'
                  ? 'bg-green-100 text-green-800'
                  : timer.status === 'paused'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {timer.status.charAt(0).toUpperCase() + timer.status.slice(1)}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          {timer.status !== 'completed' && (
            <>
              <button
                onClick={() => dispatchTimers({ type: 'START_TIMER', payload: timer.id })}
                className="bg-green-600 text-white p-1.5 rounded"
                disabled={timer.status === 'running'}
              >
                <PlayCircle size={16} />
              </button>
              <button
                onClick={() => dispatchTimers({ type: 'PAUSE_TIMER', payload: timer.id })}
                className="bg-yellow-600 text-white p-1.5 rounded"
                disabled={timer.status !== 'running'}
              >
                <PauseCircle size={16} />
              </button>
              <button
                onClick={() => dispatchTimers({ type: 'RESET_TIMER', payload: timer.id })}
                className="bg-red-600 text-white p-1.5 rounded"
              >
                <RotateCcw size={16} />
              </button>
            </>
          )}
          {timer.status === 'completed' && <CheckCircle2 size={24} className="text-green-500" />}
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${
            timer.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'
          }`}
          style={{ width: `${getProgressPercentage(timer)}%` }}
        ></div>
      </div>
    </div>
  );
}