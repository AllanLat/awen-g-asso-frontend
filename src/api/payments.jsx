

const getPaymentsAsso = async (token) => {
    
    try {
        const reponse = await fetch ('http://localhost:8080/api/v1/paiement/views', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        const dataPayments = await reponse.json()
        if(reponse.status === 200){
            return dataPayments
        }
    } catch (error) {
        console.log(error)
    }

}

const createNewTransac = async (token, formValue) => {
    
    try{
        await fetch('http://localhost:8080/api/v1/paiement', {
            'method': 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(formValue)
        })
    } catch (err) {
       console.log({error: err})
    }
}

const getBalanceAsso = async (token) => {

    try {
        const response = await fetch('http://localhost:8080/api/v1/paiement/view/balance', {
            method : 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })

        const dataBalance = await response.json()
        if(response.status === 200){
            
            return dataBalance
        }
    } catch(err) {
        console.log('erreur fettch front-end', err)
    }
}

export { getPaymentsAsso, createNewTransac, getBalanceAsso }