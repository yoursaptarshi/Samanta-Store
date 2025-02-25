import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css"
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>Samanta Store</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2024 &copy; Saptarshi Samanta</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/yoursaptarshi">Instagram</a>
        <a href="http://youtube.com/yoursaptarshi">Youtube</a>
        <a href="http://facebook.com/yoursaptarshii">Facebook</a>
      </div>
    </footer>
  )
}

export default Footer