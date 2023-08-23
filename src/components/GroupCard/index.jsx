import './index.css';

const GroupCard = ({ group }) => {

  function dayNumberToDayName(dayNumber) {
    switch (dayNumber) {
      case 1:
        return 'Lundi';
      case 2:
        return 'Mardi';
      case 3:
        return 'Mercredi';
      case 4:
        return 'Jeudi';
      case 5:
        return 'Vendredi';
      case 6:
        return 'Samedi';
      case 7:
        return 'Dimanche';
      default:
        return 'N/A';
    }
  }

  function toTimeWithourSeconds(time) {
    return time.split(':').slice(0, 2).join(':');
  }

  const dayName = dayNumberToDayName(group.group_day);

  const start_time = toTimeWithourSeconds(group.start_time);
  const end_time = toTimeWithourSeconds(group.end_time);

  return (
    <li className="group">
      <div className="card-content">

        <h2>{group.name}</h2>
        <div className="group-day-time">
          <p className="time">{start_time} - {end_time}</p>
          <p className="day-name">{dayName}</p>

        </div>


      </div>
      <div className="card-button"></div>
    </li>
  )
}

export default GroupCard