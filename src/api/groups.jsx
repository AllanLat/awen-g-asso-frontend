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

export { getGroupsByDayId }