import { useState } from 'react';

const useChangeSortType = () => {
  const sortTypes = ["PRICE_CHANGE", "VOLUME_24H", "PRICE"];
  const [sortType, setSortType] = useState<string>("PRICE_CHANGE");
  const changeSortType = (value: string) => {
    setSortType(value);
  };
  return { sortTypes, sortType, changeSortType };
}

export default useChangeSortType;