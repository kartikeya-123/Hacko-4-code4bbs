import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Link,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const ProductCard = ({ product, ...rest }) => {
  const navigate = useNavigate();
  console.log(product, rest);
  const preventDefault = (event) => event.preventDefault();

  return (
    <Card {...rest} style={{ cursor: 'pointer' }}>
      <CardContent>
        {/* <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3,
        }}
      >
        <Avatar
          alt="Product"
          src={product.media}
          variant="square"
        />
      </Box> */}
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
          style={{ padding: '10px 0px' }}
        >
          {product.name}
        </Typography>
        <Typography align="left" color="textPrimary" variant="body1">
          Course ID: {product.id}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        {product.papers &&
          product.papers.map((paper, ind) => (
            <div>
              <Link href={paper.link} target="_blank">
                <Typography>
                  {paper.name} || {paper.year || '2020'}
                </Typography>
              </Link>
            </div>
          ))}
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;

// <AccessTimeIcon color="action" />
//             <Typography fontSize={17}>&nbsp;&nbsp;Status :</Typography>
//             {product.totalEquipments - product.issued > 0 ? (
//               <Typography
//                 display="inline"
//                 sx={{ pl: 1 }}
//                 variant="body2"
//                 fontSize={17}
//                 fontWeight={500}
//                 align="center"
//                 style={{ color: 'limegreen' }}
//               >
//                 Available
//               </Typography>
//             ) : (
//               <Typography
//                 display="inline"
//                 sx={{ pl: 1 }}
//                 variant="body2"
//                 fontSize={17}
//                 fontWeight={500}
//                 style={{ color: 'red' }}
//               >
//                 Not Available
//               </Typography>
//             )}
//           </Grid>
//           {/* <Grid
//             item
//             sx={{
//               alignItems: 'center',
//               display: 'flex',
//             }}
//           >
//             <GetAppIcon color="action" />
//             <Typography
//               color="textSecondary"
//               display="inline"
//               sx={{ pl: 1 }}
//               variant="body2"
//             >
//               {product.totalDownloads} Downloads
//             </Typography>
//           </Grid> */}
