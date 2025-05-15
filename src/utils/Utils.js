// Mock AsyncStorage implementation for web demo
export const AsyncStorage = {
  data: {},
  setItem: (key, value) => {
    AsyncStorage.data[key] = value;
    return Promise.resolve();
  },
  getItem: (key) => {
    return Promise.resolve(AsyncStorage.data[key] || null);
  },
  removeItem: (key) => {
    delete AsyncStorage.data[key];
    return Promise.resolve();
  },
};

// Utility function to format time in MM:SS
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};