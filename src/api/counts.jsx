const getMembersCount = async (token) => {
    try {
        const response = await fetch('https://api.g-asso.com/api/v1/members/count', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const result = await response.json();
        if (response.status === 200) {
            return result.members_count
        }
    } catch (error) {
        console.log(error);
    }
}

const getUsersCount = async (token) => {
    try {
        const response = await fetch('https://api.g-asso.com/api/v1/users/count', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const result = await response.json();
        if (response.status === 200) {
            return result.users_count
        }
    } catch (error) {
        console.log(error);
    }
}

const getDayGroupsCount = async (token) => {
    try {
        const response = await fetch('https://api.g-asso.com/api/v1/groups/day_groups/count', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const result = await response.json();
        if (response.status === 200) {
            return result.day_groups_count
        }
    } catch (error) {
        console.log(error);
    }
}

export { getMembersCount, getDayGroupsCount, getUsersCount }