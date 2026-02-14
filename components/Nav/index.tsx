"use client";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [value, setValue] = useState(0);
  const router = useRouter();

  return (
    <div>
      <div className="md:hidden">
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            onClick={() => {
              router.push("/dashboard");
            }}
          />
          <BottomNavigationAction
            label="Order"
            icon={<BorderColorIcon />}
            onClick={() => {
              router.push("/order");
            }}
          />
          <BottomNavigationAction
            label="Menu"
            icon={<RestaurantMenuIcon />}
            onClick={() => {
              router.push("/menu");
            }}
          />
        </BottomNavigation>
      </div>
      <div className="hidden md:block"></div>
    </div>
  );
};

export default Navbar;
