import "./card.css";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Card = () => {
  const location = useLocation();
  const a = location.pathname.split("/")[2];
  const [block, setBlock] = useState(null);

  const getInfo = async () => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${a}`
      );
      setBlock(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  if (block) {
    return (
      <div className="ccontainer">
        <div className="card">
          <h2 className="ctitle">{block.name}</h2>
          <div className="ok">
            <img className="cimage" src={block.image.large} alt="/" />
          </div>
          <span className="c symbol">
            Symbol :
            <p style={{ color: "#9efd38", marginLeft: "6px" }}>
              {block.symbol}
            </p>
          </span>
          <span className="c price">
            Current Price :
            <p style={{ color: "#9efd38", marginLeft: "6px" }}>
              Rs.{block.market_data.current_price.inr}
            </p>
          </span>
          <span className="c cap">
            Market Cap :
            <p style={{ color: "#9efd38", marginLeft: "6px" }}>
              Rs.{block.market_data.market_cap.inr}
            </p>
          </span>
          <span className="c change">
            Price Change :
            {block.market_data.price_change_24h_in_currency.inr.toFixed(2) <
            0 ? (
              <p style={{ color: "red", marginLeft: "6px" }}>
                {block.market_data.price_change_24h_in_currency.inr.toFixed(2)}
              </p>
            ) : (
              <p style={{ color: "#9efd38", marginLeft: "6px" }}>
                {block.market_data.price_change_24h_in_currency.inr.toFixed(2)}
              </p>
            )}
          </span>
          <span className="c volume">
            Total Volume :
            <p style={{ color: "#9efd38", marginLeft: "6px" }}>
              {block.market_data.total_volume.inr}
            </p>
          </span>
          <span className="c percentage">
            Percentage Change :
            {block.market_data.market_cap_change_percentage_24h_in_currency.inr.toFixed(
              2
            ) < 0 ? (
              <p style={{ color: "red", marginLeft: "6px" }}>
                {block.market_data.market_cap_change_percentage_24h_in_currency.inr.toFixed(
                  2
                )}
                %
              </p>
            ) : (
              <p style={{ color: "#9efd38", marginLeft: "6px" }}>
                {block.market_data.market_cap_change_percentage_24h_in_currency.inr.toFixed(
                  2
                )}
                %
              </p>
            )}
          </span>
          <div className="btn">
            <Link to="/">
              <button className="go">Go Back</button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Card;
