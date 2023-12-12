import React, { StrictMode } from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import {
  HomeIcon,
  UpvoteIcon,
  DownvoteIcon,
  SearchIcon,
  MarketIcon,
  NotiIcon,
  BasketIcon,
  StarIcon,
  WarningIcon,
  ImageIcon,
  VideoIcon,
} from "./assets/icons";

import App from "./App";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import "./index.css";
import { Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);

//   <StrictMode>
//     <App/>
//     <HomeIcon></HomeIcon>
//     <UpvoteIcon></UpvoteIcon>
//     <DownvoteIcon></DownvoteIcon>
//     <SearchIcon></SearchIcon>
//     <MarketIcon></MarketIcon>
//     <NotiIcon></NotiIcon>
//     <BasketIcon></BasketIcon>
//     <StarIcon></StarIcon>
//     <WarningIcon></WarningIcon>
//     <ImageIcon></ImageIcon>
//     <VideoIcon></VideoIcon>
//   </StrictMode>,
// );

// ReactDOM.createRoot(document.getElementById('root')).render(
//   React.createElement(
//     React.StrictMode,
//     null,
//     React.createElement(
//       ThemeProvider,
//       { theme: theme },
//       React.createElement(App)
//     )
//   )
// );
