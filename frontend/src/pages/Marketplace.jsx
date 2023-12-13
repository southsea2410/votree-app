import NavBar from '../components/common/navBar';
import { Box, Container } from '@mui/material';
import { ProductCard } from '../components';
import { Divider } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { colors } from '../styles';
import { useNavBarHeight } from '../hooks/useNavBarHeight';

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0px 80px'
};

const hotSalesContainer = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 388px)',
    gap: '20px'
};

const salePostsContainer = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 388px)',
    gap: '20px'
};

export default function Marketplace() {
    return (
        <div
            style={{
                paddingTop: useNavBarHeight(),
                background: colors.secondary
            }}
        >
            <div className="navbar">
                <NavBar />
            </div>
            <Container
                disableGutters="true"
                maxWidth="false"
                sx={containerStyle}
            >
                <div style={{ paddingBottom: '22px' }}>
                    <WhatshotIcon color="pending" fontSize="medium" />
                    <span
                        className="subtitle-extra-bold"
                        style={{ color: colors.green5, paddingLeft: 10 }}
                    >
                        Hot picks
                    </span>
                </div>
                <Box sx={hotSalesContainer}>
                    <ProductCard variant="hotpick" />
                    <ProductCard variant="hotpick" />
                    <ProductCard variant="hotpick" />
                </Box>

                <div style={{ padding: '31px' }}>
                    <Divider style={{ width: 658, height: 1 }} />
                </div>

                <Box sx={salePostsContainer}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </Box>
            </Container>
        </div>
    );
}
