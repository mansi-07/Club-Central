import React from "react";

    import "./Header.css";

    class Header extends React.Component{

        render(){

            return (

               <nav className="Nav">

                 <div className="Nav-menus">

                  <a href="/" className="Nav-brand-logo" >

                  </a>

                   <div className="Nav-brand">

                   <div className="links" >
                        <a href="/">Tab1</a>
                        <a href="/create">Tab2</a>
                        <a href="/create">More</a>
                    </div>

                   </div>

                 </div>

               </nav>

           );

        }   

    }

    export default Header;