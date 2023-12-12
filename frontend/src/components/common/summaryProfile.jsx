import * as React from "react";
import { Box } from "@mui/material";
import { Avatar } from "@mui/material";
import "./../../index.css";

export default function SumProfile() {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar sx={{width: '50px', height:'50px'}} />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "15px" }}
      >
        <div>
          <div
            className="subtitle-semi-bold-20"
            style={{
              width: "281px",
              height: "34px",
              alignItems: "center",
              display: "flex",
            }}
          >
            Prince Vegeta
          </div>
          <div className="extra-medium">
            <ul style={{ margin: "0", paddingLeft: "22px" }}>
              <li>user</li>
            </ul>
          </div>
        </div>
      </div>
    </Box>
  );
}
