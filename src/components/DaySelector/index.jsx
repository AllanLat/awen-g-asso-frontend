import './index.css';
import React, { useState, useEffect } from 'react';

const DaySelector = ({ onDayNumberChange }) => {

  const [selectedDay, setSelectedDay] = useState('');


  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];


  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };


  useEffect(() => {
    const dayIndex = daysOfWeek.indexOf(selectedDay);
    const dayNumber = dayIndex + 1;
    // Appel de la fonction de rappel onDayNumberChange pour passer la valeur dayNumber à Groups
    onDayNumberChange(dayNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay, onDayNumberChange]);


  useEffect(() => {
    const todayIndex = new Date().getDay();
    setSelectedDay(daysOfWeek[todayIndex - 1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <select className='day-selector' value={selectedDay} onChange={handleDayChange}>
      {daysOfWeek.map((day, index) => (
        <option key={index} value={day}>
          {day}
        </option>
      ))}
    </select>
  );
};

export default DaySelector;
