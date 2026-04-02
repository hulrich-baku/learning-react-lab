import { useState } from "react";

const useInput = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const clear = () => {
    setValue('');
  }
  
  return { value, onChange, clear };
}

export default useInput;