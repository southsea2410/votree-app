import * as React from "react";
import { Box } from "@mui/material";
import { Avatar } from "@mui/material";
import "./../../index.css";

export default function SumProfile() {
  return (
    <Box style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar>N</Avatar>
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
