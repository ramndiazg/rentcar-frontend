"use client";

import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

export default function CarouselRatio({ vehicles }) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        py: 2,
        overflow: 'auto',
        minWidth: 500,
        height: "200px",
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'center',
        },
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {vehicles.map((item) => (
        <Card orientation="horizontal" size="lg" key={item.model} variant="outlined">
          <AspectRatio sx={{ minWidth: 60 }}>
            <img
              srcSet={`${item.imageUrl}?h=120&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.imageUrl}?h=120&fit=crop&auto=format`}
              alt={item.make}
            />
          </AspectRatio>
          <Box sx={{ whiteSpace: 'nowrap', mx: 1 }}>
            <Typography level="title-md">{item.model}</Typography>
            <Typography level="body-sm">{item.year}</Typography>
            <Typography level="body-sm">{item.status}</Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}