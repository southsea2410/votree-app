import { Fragment } from "react";
import NavBar from "../components/common/navBar";
import { Box, Container, Typography } from "@mui/material";
import { ProductCard } from "../components";
import { Divider } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { colors } from "../styles";

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
};

const hotSalesContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 388px)",
    gap: "20px",
};

const salePostsContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 388px)",
    gap: "20px",
};

const dividerStyle = {
    width: '800px',
    marginTop: '30px',
    marginBottom: '15px',
};

export default function Marketplace(){
    return(
<Fragment>
    <NavBar className="navbar"/>
    <Container disableGutters='true' maxWidth="false" sx={containerStyle}>
        <Divider role="separator" variant="slighter" sx={dividerStyle}>
            <WhatshotIcon color="pending" fontSize="medium" />
            <span className="subtitle-semi-bold-28" style={{color: colors.green5}}>Hot picks</span>
        </Divider>
        <Box sx={hotSalesContainer}>
            <ProductCard variant="hotpick" />
            <ProductCard variant="hotpick" />
            <ProductCard variant="hotpick" />
        </Box>

        <Divider role="separator" variant="slighter" sx={dividerStyle}>
            <span className="subtitle-semi-bold-28">Products</span>
        </Divider>


        <Box sx={salePostsContainer}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </Box>

    </Container>
</Fragment>


)
}