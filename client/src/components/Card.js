import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chart from './Chart';

function CryptoCard({ pair, data }) {
  return (
    <Card variant="outlined" style={{
        margin: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {pair}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Highest Difference: {parseFloat(data.highestDifference).toFixed(3)}%
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Lowest Price: {parseFloat(data.lowestPrice).toFixed(3)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Highest Price: {parseFloat(data.highestPrice).toFixed(3)}
        </Typography>
        <Chart data={data.data} />
      </CardContent>
    </Card>
  );
}

export default CryptoCard;
