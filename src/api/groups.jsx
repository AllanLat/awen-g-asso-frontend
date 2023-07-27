import { toast, Slide } from 'react-toastify';

const getGroupsByDayId = async (token, dayId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/groups/day/${dayId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const result = await response.json();
        if (response.status === 200) {
            return result
        }
    } catch (error) {
        console.log(error);
    }
}

const getGroupById = async (token, groupId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/groups/${groupId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const result = await response.json();
        if (response.status === 200) {
            return result
        }
        if (response.status === 403) {
            return []
        }
    } catch (error) {
        console.log(error);
    }
}

const getUsersByGroupId = async (token, groupId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/groups/${groupId}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const result = await response.json();
        if (response.status === 200) {
            return result
        }
        if (response.status === 403) {
            return []
        }
    } catch (error) {
        console.log(error);
    }
}

const createGroup = async (token, newGroup) => {

    const response = await fetch(`http://localhost:8080/api/v1/groups`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(newGroup)
    });
    
    const result = await response.json();
    if (response.status === 201) {
        toast.success('Groupe créé', { transition: Slide, position: 'bottom-center', className: 'myCustomToast' });
        return result.insertId;
    } else {
        toast.error('Une erreur est survenue', { transition: Slide, position: 'bottom-center', className: 'myCustomToast' });
        return null;
    }
}

const updateGroup = async (token, id, newGroup) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/groups/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(newGroup)
        });
        const result = await response.json();
        if (response.status === 200) {
            toast.success('Groupe modifié', { transition: Slide, position: 'bottom-center', className: 'myCustomToast' });
            return result;
        }
    } catch (error) {
        toast.error('Une erreur est survenue', { transition: Slide, position: 'bottom-center', className: 'myCustomToast' });
        return null;
    }
}

export { getGroupsByDayId, createGroup, updateGroup, getGroupById, getUsersByGroupId };