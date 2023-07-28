
const getMemberPayments = async(token, id) => {

    try{
        const pay = await fetch(`http://localhost:8080/api/v1/userpayment/${id}`,{
            method : 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            
        })
       
        const response = await pay.json()
        console.log(response)

        if(pay.status === 200){
            return response
        }
        
    }catch(err){
        console.log(err)
    }
}

export {getMemberPayments}