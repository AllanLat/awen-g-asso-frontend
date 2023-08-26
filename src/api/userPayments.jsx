// Enfait c'est member 

const getMemberPayments = async(token, id) => {

    try{

        const pay = await fetch(`https://api.g-asso.com/api/v1/userpayment/${id}`,{
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