const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTasks = async () => {
  const response = await fetch(`${BASE_URL}/todos`);

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
};
