import * as React from "react";
import { Box, Button } from "@mui/material";
import { DownvoteIcon, UpvoteIcon } from "../../assets/icons";

export default function ReactionBar() {
  return (
    <Box sx={{display:'flex', justifyContent: 'space-between' }}>
      <Button variant="outline-green1">17K</Button>
      <Button variant="outline-success">
        <UpvoteIcon style={{ fontSize: 40 }} />
      </Button>
      <Button variant="outline-pending">
        <DownvoteIcon style={{ fontSize: 40 }} />
      </Button>
      <Button variant="outline-green6">Comment</Button>
    </Box>
  );
}
