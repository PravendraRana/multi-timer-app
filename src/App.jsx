import React, { useState, useEffect, useReducer } from 'react';
import TimerList from './components/TimerList';
import TimerHistory from './components/TimerHistory';
import AddTimerModal from './components/AddTimerModal';
import CompletionModal from './components/CompletionModel';
import { timerReducer, historyReducer } from './reducers/Reducers';
import { AsyncStorage } from './utils/Utils';
import './index.css';

export default function App() {
  const [timers, dispatchTimers] = useReducer(timerReducer, []);
  const [history, dispatchHistory] = useReducer(historyReducer, []);
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedTimer, setCompletedTimer] = useState(null);

  // Fetch data on load
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedTimers = await AsyncStorage.getItem('timers');
        const storedHistory = await AsyncStorage.getItem('history');
        if (storedTimers) {
          const parsedTimers = JSON.parse(storedTimers);
          dispatchTimers({ type: 'LOAD_TIMERS', payload: parsedTimers });

          const uniqueCategories = [...new Set(parsedTimers.map(timer => timer.category))];
          setCategories(uniqueCategories);

          const expandedState = {};
          uniqueCategories.forEach(cat => {
            expandedState[cat] = true;
          });
          setExpandedCategories(expandedState);
        }
        if (storedHistory) {
          dispatchHistory({ type: 'LOAD_HISTORY', payload: JSON.parse(storedHistory) });
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Save timers to storage when they change
  useEffect(() => {
    const saveTimers = async () => {
      try {
        await AsyncStorage.setItem('timers', JSON.stringify(timers));
      } catch (error) {
        console.error('Error saving timers:', error);
      }
    };
    if (timers.length > 0) {
      saveTimers();
      const uniqueCategories = [...new Set(timers.map(timer => timer.category))];
      setCategories(uniqueCategories);
    }
  }, [timers]);

  // Save history to storage when it changes
  useEffect(() => {
    const saveHistory = async () => {
      try {
        await AsyncStorage.setItem('history', JSON.stringify(history));
      } catch (error) {
        console.error('Error saving history:', error);
      }
    };
    if (history.length > 0) {
      saveHistory();
    }
  }, [history]);

  return (
    <div className="max-w-3xl mx-auto">
      {currentScreen === 'home' ? (
        <TimerList
          timers={timers}
          categories={categories}
          expandedCategories={expandedCategories}
          dispatchTimers={dispatchTimers}
          dispatchHistory={dispatchHistory}
          setExpandedCategories={setExpandedCategories}
          setShowAddModal={setShowAddModal}
          setCurrentScreen={setCurrentScreen}
          setShowCompletionModal={setShowCompletionModal}
          setCompletedTimer={setCompletedTimer}
        />
      ) : (
        <TimerHistory history={history} setCurrentScreen={setCurrentScreen} />
      )}
      {showAddModal && (
        <AddTimerModal
          setShowAddModal={setShowAddModal}
          dispatchTimers={dispatchTimers}
          setCategories={setCategories}
          setExpandedCategories={setExpandedCategories}
        />
      )}
      {showCompletionModal && (
        <CompletionModal
          completedTimer={completedTimer}
          setShowCompletionModal={setShowCompletionModal}
        />
      )}
    </div>
  );
}