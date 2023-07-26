import './index.css';

const GroupCard = ({ group }) => {
  return (
    <li className="group">
      <div className="card-content">
        <p>Nom : {group.name} jour : {group.group_day} début : {group.start_time} fin : {group.end_time} </p>
      </div>
      <div className="card-button"></div>
    </li>
  )
}

export default GroupCard