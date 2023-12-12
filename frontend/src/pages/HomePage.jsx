import { Box } from "@mui/material";
import { NavBar, InputArticle, UserPost } from "../components";

// Dummy data
import { Post_test } from "../assets/images";
import { content, contentLong } from "../assets/content";



const homePageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  rowGap: '19px',
};

const postsStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  rowGap: '19px',
};

export default function HomePage() {
  return (
    <Box id="homepage" sx={homePageStyle}>
      <NavBar className="navbar"/>
      <Box sx={{alignSelf: 'center'}}>
        <InputArticle />
      </Box>
      <Box sx={postsStyle}>
        <UserPost content={content} image={Post_test}/>
        <UserPost content={content} />
        <UserPost content={content} />
        <UserPost content={contentLong} />
        <UserPost content={content} />
      </Box>
    </Box>
  );
}
