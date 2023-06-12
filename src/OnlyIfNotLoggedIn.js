import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { KEY_ACCESS_TOKEN } from "../src/utils/localStorageManager";
import { getItem } from "../src/utils/localStorageManager";
function OnlyIfNotLoggedIn() {
  const user = getItem(KEY_ACCESS_TOKEN);
  return !user ? <Navigate to="/login" /> : <Outlet />;
}

export default OnlyIfNotLoggedIn;
