// Enfait c'est member 

const getMemberPayments = async(token, id) => {

    try{

        const pay = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/userpayment/${id}`,{
            method : 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },    
        })
       
        const response = await pay.json()

        if(pay.status === 200){
            return response
        }
        
    }catch(err){
        console.log(err)
    }
}



export {
    getMemberPayments
}