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

export { getUsers, getUserById, getGroupByUser };