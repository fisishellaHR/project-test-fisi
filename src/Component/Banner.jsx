import "../Banner.css";

/* eslint-disable react/prop-types */
const Banner = ({ imageUrl, title, subtitle }) => {
  return (
    <div className="banner" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="banner-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default Banner;
