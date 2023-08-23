const getLogo = async (token, id) => {
    try {
        const response = await fetch(`http://api.g-asso.com/api/v1/associations/associationLogo/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        const result = await response.json();
        if (response.status === 200) {
            return result
        }
    } catch (error) {
        console.log(error);
    }
}

export { getLogo }