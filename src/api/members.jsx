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

const createMember = async (token, newMember) => {

  // les données sont bien récupérées
  console.log(newMember.get('data'));
  console.log(newMember.get('photo'));
  console.log(newMember.get('image_rights_signature'));

  

  const response = await fetch(`http://localhost:8080/api/v1/members`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: newMember
  })


}



export { getMembers, getMemberById, createMember };      