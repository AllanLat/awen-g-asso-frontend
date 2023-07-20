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

export { getUsers }