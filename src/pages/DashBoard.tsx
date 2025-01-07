import CoinCard from "../components/common/CoinCard";

const DashBoard = () => {
  return (
    <>
      <h3>DashBoard</h3>
      <CoinCard
        name={"DOGE"}
        symbol={"USDT"}
        price={4634}
        priceChange={-142}
      ></CoinCard>
    </>
  );
};

export default DashBoard;
