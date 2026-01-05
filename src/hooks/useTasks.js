import { useEffect, useState, useCallback } from 'react';
import {fetchTasks} from '../api/tasksApi';
import AsyncStorage from '@react-native-async-storage/async-storage';



const STORAGE_KEY = 'TASKS_STORAGE';

export const useTasksLogic = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFromStorage = async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTasks(JSON.parse(stored));
      return true;
    }
    return false;
  };

  const saveToStorage = async data => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const hasLocal = await loadFromStorage();

      if (!hasLocal) {
        const apiTasks = await fetchTasks();
        setTasks(apiTasks);
        await saveToStorage(apiTasks);
      }
    } catch (err) {
      setError('Unable to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = async updatedTask => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );

    setTasks(updatedTasks);
    await saveToStorage(updatedTasks);
  };

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return {
    tasks,
    loading,
    error,
    reload: loadTasks,
    updateTask, 
  };
};
