import Navbar from '../../components/Navbar';

const Home = () => {
  const user = {
    id: sessionStorage.getItem('userId'),
    association: sessionStorage.getItem('associationId'),
    lvl: sessionStorage.getItem('userLvl'),
    token: sessionStorage.getItem('token')
  }
  console.log(user)


  return (
    <Navbar title="Tableau de bord" />
  )
}

export default Home