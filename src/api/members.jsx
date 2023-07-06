const getMembers = async (token) => {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/members`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getMemberById = (token, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/members/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const data = await response.json();
        resolve(data);
      } else if (response.status === 404) {
        reject('Not found');
      } else {
        reject('Error');
      }
    } catch (error) {
      reject(error);
    }
  });
}

const createMember = async (token, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.status === 200) {
        const data = await response.json();
        resolve(data);
      } else if (response.status === 404) {
        reject('Not found');
      } else {
        reject('Error');
      }
    } catch (error) {
      reject(error);
    }
  });
}



export { getMembers, getMemberById, createMember };