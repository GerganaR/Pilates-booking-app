import React from "react";

import {
  BsFillPersonFill,
  BsFillPeopleFill,
  BsPersonVcardFill,
} from "react-icons/bs";
import { IoFitness } from "react-icons/io5";

export const SidebarData = [
  {
    title: "Profile",
    path: "/",
    icon: <BsFillPersonFill />,
  },
  {
    title: "Members",
    path: "/members",
    icon: <BsFillPeopleFill />,
  },
  {
    title: "Trainers",
    path: "/trainers",

    icon: <BsPersonVcardFill />,
  },

  {
    title: "Book Pilates",
    path: "/book",
    icon: <IoFitness />,
  },
];
