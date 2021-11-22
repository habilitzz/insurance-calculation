import { useState } from 'react';

const summaryValue = () => {
  const [sumValue, setSumVal] = useState(0);

  const increment = (value) => {
    setSumVal(sumValue + value);
  }

  return {sumValue, increment}

}

export default summaryValue;