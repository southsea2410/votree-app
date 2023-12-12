import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import SumProfile from "../common/summaryProfile";
import ReactionBar from "./reactionBar";

const cardStyle = {
  width: "822px",
  borderRadius: "7px",
  rowGap: "19px",
};

const cardContentStyle = {
  display: "flex",
  flexDirection: "column",
  rowGap: "10px",
  alignItems: "stretch",
};

export default function UserPost(props) {
  if (props.image)
    return (
      <Card variant="outlined" sx={cardStyle}>
        <CardContent sx={cardContentStyle}>
          <SumProfile />
          <Typography>{props.content}</Typography>
          <CardMedia
            component="img"
            image={props.image}
            sx={{ minHeight: "600px" }}
          />
          <ReactionBar />
        </CardContent>
      </Card>
    );
  else
    return (
      <Card variant="outlined" sx={cardStyle}>
        <CardContent sx={cardContentStyle}>
          <SumProfile />
          <Typography>{props.content}</Typography>
          <ReactionBar />
        </CardContent>
      </Card>
    );
}
