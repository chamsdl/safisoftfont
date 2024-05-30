import React, { useEffect } from "react";
import BasicExample from "./navbar";
import BasicExampleVendeur from "./navbarVendeur";


function Header(props) {
  useEffect(()=>{

  },[])
  return (
    <header>
      {props.i ? <BasicExample /> : <BasicExampleVendeur />}
    </header>
  );
}

export default Header;
