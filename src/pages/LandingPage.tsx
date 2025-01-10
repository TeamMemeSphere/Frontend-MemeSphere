import FilterSelect from "../components/Common/FilterSelect";
import { useState } from "react";

const LandingPage = () => {
  const selectOption : string[] = ["MKT Cap", "Price"];

  const [option, setOption] = useState("MKT Cap");

  const onChangeOption = (value : string) => {
    setOption(value);
  };

  return (
    <>
      <h3>LandingPage</h3>
      {/* selectFilter 테스트용 */}
      <h3>현재 option : {option}</h3>
      <FilterSelect options={selectOption} onChange={onChangeOption}></FilterSelect>
    </>
  );
};

export default LandingPage;
