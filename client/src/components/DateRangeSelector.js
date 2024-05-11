import React, { useState } from 'react';

function DateRangeSelector({ onDateRangeChange }) {
  const defaultStartDate = '2021-01-01'; // Default start date
  const defaultEndDate = '2021-03-01'; // Default end date

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const handleDateRangeChange = () => {
    onDateRangeChange(startDate, endDate);
  };

  return (
    <div>
      <input
        type="date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
      />
      <button onClick={handleDateRangeChange}>Apply</button>
    </div>
  );
}

export default DateRangeSelector;
