import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CasinoCardProps } from '../types/interfaces';


const CasinoCard: React.FC<CasinoCardProps> = ({ item }) => {
  return (
    <Card sx={{ width: 400, maxWidth: 345, maxHeight: 345 }}>
      <CardMedia
        sx={{ height: 240 }}
        image={item?.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Name: {item?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Floor Name: {item?.floor_name}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  )
}

export default CasinoCard