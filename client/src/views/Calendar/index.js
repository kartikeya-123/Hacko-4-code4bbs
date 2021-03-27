import React, { useState } from 'react';
import './index.css';
import {
  CalendarComponent,
  ChangedEventArgs,
} from '@syncfusion/ej2-react-calendars';

const Calendar = () => {
  //   const dateValue = new Date(
  //     new Date().getFullYear(),
  //     new Date().getMonth(),
  //     10
  //   );
  //   const minDate = new Date(new Date().getFullYear(), new Date().getMonth());
  //   const maxDate = new Date(new Date().getFullYear() + 1);
  //   console.log(minDate);
  //   console.log(maxDate);

  const [selectedDate, setDate] = useState(new Date().toLocaleDateString());

  const onChangeDate = (args) => {
    setDate(args.value.toLocaleDateString());
    console.log(selectedDate);
  };
  return (
    <div style={{ margin: '20px' }}>
      <CalendarComponent change={onChangeDate}></CalendarComponent>
    </div>
  );
};

export default Calendar;
