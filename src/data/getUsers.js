const getUsers = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = await fetch('/api/users', options);
  
      if (response.status !== 200) {
        throw new Error('Error fetching users');
      }
  
      const data = await response.json();
      console.log('Response:', data);
      return data;
    } catch (error) {
      console.log('Error:', error.message);
      return null;
    }
  };
  
  export { getUsers };
  