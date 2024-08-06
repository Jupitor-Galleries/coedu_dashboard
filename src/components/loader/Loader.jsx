import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import './Loader.css';

const override= {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

function Loader({loading}) {
  let [color, setColor] = useState("#ffffff");

  if(!loading) {
    return null
  }

  return (
    <div className="sweet-loading">
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;