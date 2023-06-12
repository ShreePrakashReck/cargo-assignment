import React from "react";
import Transporter from "./Transporter";
import Manufacturer from "./Manufacturer";
import { useParams } from "react-router-dom";

function Role() {
  const { role } = useParams();

  if (role === "transporter") {
    return <Transporter />;
  } else if (role === "manufacturer") {
    return <Manufacturer />;
  } else {
    // Handle unknown role or render a fallback component/page
    return <div>Unknown role</div>;
  }
}

export default Role;
