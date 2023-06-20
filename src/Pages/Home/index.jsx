import React from 'react'

const Home = () => {
  const userId = sessionStorage.getItem('userId')
  const associationId = sessionStorage.getItem('associationId')
  const userLvl = sessionStorage.getItem('userLvl')
  const userToken = sessionStorage.getItem('token')
  console.log(userId, associationId, userLvl, userToken)
  return (
    <h1>Home</h1>
  )
}

export default Home