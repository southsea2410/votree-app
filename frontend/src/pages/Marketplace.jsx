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
    gridTemplateColumns: 'repeat(auto-fill, 388px)',
    gap: '20px',
    justifyContent: 'center',
    width: '100%'
};

const salePostsContainer = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 388px)',
    gap: '20px',
    justifyContent: 'center',
    width: '100%'
};

export default function Marketplace() {
    return (
        <div
            style={{
                paddingTop: useNavBarHeight()
            }}>
            <NavBar className="navbar" />
            <Container disableGutters="true" maxWidth="xl" sx={containerStyle}>
                <div style={{ paddingBottom: '22px' }}>
                    <WhatshotIcon color="pending" fontSize="medium" />
                    <span
                        className="subtitle-extra-bold"
                        style={{ color: colors.green5, paddingLeft: 10 }}>
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
