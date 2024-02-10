// src/Calendar.js
import React, { useState } from 'react';
import moment from 'moment';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const renderHeader = () => {
    return (
      <div className="header">
        <FaChevronLeft onClick={prevMonth} />
        <div>{currentMonth.format('MMMM YYYY')}</div>
        <FaChevronRight onClick={nextMonth} />
      </div>
    );
  };

  const renderDays = () => {
    const weekdays = moment.weekdaysShort();

    return weekdays.map((day) => (
      <div key={day} className="day">
        {day}
      </div>
    ));
  };

  const renderCells = () => {
    const monthStart = currentMonth.clone().startOf('month');
    const monthEnd = currentMonth.clone().endOf('month');
    const startDate = monthStart.clone().subtract(monthStart.day(), 'days');
    const endDate = monthEnd.clone().add(6 - monthEnd.day(), 'days');

    const rows = [];
    let days = startDate.clone();

    while (days.isBefore(endDate)) {
      const row = [];
      for (let i = 0; i < 7; i++) {
        row.push(
          <div
            key={days.format('YYYY-MM-DD')}
            className={`cell ${days.month() !== currentMonth.month() ? 'disabled' : ''}`}
          >
            {days.format('D')}
          </div>
        );
        days.add(1, 'day');
      }
      rows.push(<div key={row[0].key} className="row">{row}</div>);
    }

    return rows;
  };

  const prevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, 'month'));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      <div className="days">{renderDays()}</div>
      <div className="body">{renderCells()}</div>
    </div>
  );
};

export default Calendar;
