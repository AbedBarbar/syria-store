import React from "react";

import Navbar from "./Navbar";
import Titles from "./Titles";
import Sections from "./Sections";
import Landing from "./Landing";
import BuyDetails from "./BuyDetails";
import Menu from "./Menu";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Titles/>
      <Landing />
      <Sections />
      <BuyDetails/>
      <Menu/>
      
    </div>
  );
}
