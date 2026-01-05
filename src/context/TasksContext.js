import React, { createContext, useContext } from 'react';
import { useTasksLogic as useTasksHook } from '../hooks/useTasks';

const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const tasksState = useTasksHook();

  return (
    <TasksContext.Provider value={tasksState}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within TasksProvider');
  }
  return context;
};
