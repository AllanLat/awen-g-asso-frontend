import { toast, Slide } from 'react-toastify';

const getUsers = async (token) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/users`, {
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

const getUserById = async (token, id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/users/${id}`, {
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

const getGroupByUser = async (token, id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/users/${id}/groups`, {
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

const createUser = async (token, newUser) => {
    const response = await fetch(`http://localhost:8080/api/v1/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newUser) 
    });   

    const result = await response.json();
    if (response.status === 201) {
        toast.success('Professeur créé', {transition: Slide, position: 'bottom-center', className: 'myCustomToast'});
        return result.insertId;
    } else {
        toast.error('Une erreur est survenue', {transition: Slide, position: 'bottom-center', className: 'myCustomToast'});
        return null;
    }
}

const updateUser = async (token, id, newUser) => {
    const response = await fetch(`http://localhost:8080/api/v1/users/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: newUser
    });

    const result = await response.json();
    if (response.status === 201) {
        toast.success('Professeur modifié', {transition: Slide, position: 'bottom-center', className: 'myCustomToast'});
        return result;
    } else {
        toast.error('Une erreur est survenue', {transition: Slide, position: 'bottom-center', className: 'myCustomToast'});
        return null;
    }
}


export { getUsers, getUserById, getGroupByUser, createUser, updateUser };