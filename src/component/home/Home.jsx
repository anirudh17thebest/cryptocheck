import "./home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [inputs, setInputs] = useState("");
  const getCoin = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      setCoins(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getCoin();
  }, []);

  const handleChange = (e) => {
    setInputs(e.target.value);
  };

  const filterCoin = coins.filter((i) => {
    return i.name.toLowerCase().includes(inputs.toLowerCase());
  });

  return (
    <div className="container">
      <p className="heading">Crypto Checker</p>
      <div className="search">
        <input
          type="text"
          value={inputs}
          onChange={handleChange}
          placeholder="Search for a Crypto-Currency"
          className="write"
        />
      </div>
      {filterCoin.map((i) => {
        return (
          <div key={i.name} className="cryptoblocks">
            <img className="cryptoImage" src={i.image} alt="/" />
            <h3>{i.name}</h3>
            <h3 className="a">{i.symbol}</h3>
            <h3>Rs. {i.current_price}</h3>
            {i.price_change_percentage_24h < 0 ? (
              <h3 className="a" style={{ color: "red" }}>
                {i.price_change_percentage_24h.toFixed(2)} %
              </h3>
            ) : (
              <h3 className="a">
                {i.price_change_percentage_24h.toFixed(2)} %
              </h3>
            )}
            <h3 className="a"> Rs. {i.market_cap}</h3>
            <Link to={`/coin/${i.id}`}>
              <button className="info">More Info</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
