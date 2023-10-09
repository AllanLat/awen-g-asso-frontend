import { toast, Slide } from 'react-toastify';

const getGroupsByDayId = async (token, dayId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/groups/day/${dayId}`, {
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

const getGroups = async (token) => {

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/groups`, {
            method : "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const result = await response.json();
        if (response.status === 200){
            return result
        }
    } catch (err){
        console.log("erreur recupération groupes" + err)
    }
}

const getGroupById = async (token, groupId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/groups/${groupId}`, {
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/groups/${groupId}/users`, {
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

const getMembersByGroupId = async (token, groupId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/groups/${groupId}/members`, {
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

const addUsersToGroup = async (token, groupId, users_list) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/groups/${groupId}/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(users_list)
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

const addMembersToGroup = async (token, groupId, members_list) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/groups/${groupId}/members/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(members_list)
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

const removeMembersToGroup = async (token, groupId, members_list) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/groups/${groupId}/members/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(members_list)
        });
        const result = await response.json()
        if(response.status === 200){
            return result
        } else if (response.status !== 400){
            return console.log(response.status)
        }

    }catch(error) {
        console.log(error)
    }
}

const createGroup = async (token, newGroup) => {

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/groups`, {
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/groups/${id}`, {
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

const updateMembersCount = async (token, group_id, members_list) => {

    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/groups/${group_id}/presence`, {
            method :'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(members_list)
        });

        const result = await response.json()
        if(response.status === 200){
            return result
        }
    }catch(err){
        console.log(err)
    }
}

const addMemberList = async (token, listDetails) => {

    try{
        console.log(JSON.stringify(listDetails))
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/groups/presence`, {
            method :'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(listDetails)
        });

        const result = await response.json()
        if(response.status === 200){
            return result
        }
    }catch(err){
        console.log(err)
    }
}
export { getGroupsByDayId, createGroup, updateGroup, getGroupById, getUsersByGroupId, getMembersByGroupId, addUsersToGroup, addMembersToGroup, getGroups, removeMembersToGroup, updateMembersCount,addMemberList};