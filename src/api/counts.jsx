const getMembersCount = async (token) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/members/count', {
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

const getDayGroupsCount = async (token) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/groups/day_groups/count', {
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

export { getMembersCount, getDayGroupsCount }