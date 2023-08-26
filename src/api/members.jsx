import { toast, Slide } from 'react-toastify';

const getMembers = async (token) => {
  try {
    const response = await fetch(`https://api.g-asso.com/api/v1/members`, {
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

const getMemberById = async (token, id) => {
  
    try {
      const response = await fetch(`https://api.g-asso.com/api/v1/members/${id}`, {
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
  }


const createMember = async (token, newMember) => {
  const response = await fetch(`https://api.g-asso.com/api/v1/members`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: newMember
  })

  const result = await response.json();
  if (response.status === 201) {
    toast.success('Adhérent créé', {transition: Slide, position: 'bottom-center', className: 'myCustomToast'});
    return result.insertId;
  } else {
    toast.error('Une erreur est survenue', {transition: Slide, position: 'bottom-center', className: 'myCustomToast'});
    return null;
  }


}

const updateMember = async (token, memberId, newMember) => {
   const response = await fetch(`https://api.g-asso.com/api/v1/members/${memberId}`, {
     method: 'PUT',
     headers: {
       'Authorization': `Bearer ${token}`
     },
     body: newMember 
   })
   const result = await response.json();
   if (response.status === 200) {
     toast.success('Adhérent modifié', {transition: Slide, position: 'bottom-center', className: 'myCustomToast'});
     return result;
   } else {
     toast.error('Une erreur est survenue', {transition: Slide, position: 'bottom-center', className: 'myCustomToast'});
     return null;
   }
}



export { getMembers, getMemberById, createMember, updateMember };      