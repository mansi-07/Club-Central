import React from "react";
import "../../css/footer.css";
import{HiOutlineMail,HiLocationMarker} from 'react-icons/hi';
import {BsInfoCircle}from 'react-icons/bs';

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="col">
          {/* Column1 */}
          <div className="row-sm">
            <h4>About  <BsInfoCircle /></h4>

            <p className="list-unstyled">
            A home for all clubs in our campus. You can check for all latest events , 
            activities and  updates happening in our campus!
            </p>
          </div>
          {/* Column2 */}
          <div className="row-sm">
            <h4>Contact</h4>
            <div classname="row-sm">
              <p><HiOutlineMail />  clubCentral@nitk.edu.in</p>
            </div>
          </div>
          {/* Column3 */}
          <div className="row-sm">
            <h4>Quick Links</h4>
            <ui className="list-unstyled">
              <li><a href = "/">Home</a></li>
              <li><a href = "/">Forum</a></li>
              <li><a href = "/">More</a></li>
            </ui>
          </div>
        </div>
  
      </div>
    </div>
  );
}

export default Footer;