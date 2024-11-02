"use client";

import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

const data = [
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    make: 'toyota',
    model: 'rav4',
    year: '2021',
    title: 'Night view',
    description: '4.21M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
    make: 'hyundai',
    model: 'cantus',
    year: '2019',
    title: 'Lake view',
    description: '4.74M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    make: 'kia',
    model: 'sorento',
    year: '2018',
    title: 'Mountain view',
    description: '3.98M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    make: 'nissan',
    model: 'kick',
    year: '2020',
    title: 'Night view',
    description: '4.21M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
    make: 'honda',
    model: 'crv',
    year: '2021',
    title: 'Lake view',
    description: '4.74M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    make: 'toyota',
    model: 'corolla',
    year: '2020',
    title: 'Mountain view',
    description: '3.98M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
    make: 'hyundai',
    model: 'elantra',
    year: '2021',
    title: 'Night view',
    description: '4.21M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
    make: 'kia',
    model: 'rio',
    year: '2022',
    title: 'Lake view',
    description: '4.74M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    make: 'ford',
    model: 'escape',
    year: '2019',
    title: 'Mountain view',
    description: '3.98M views',
  },
];

export default function CarouselRatio() {
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
      {data.map((item) => (
        <Card orientation="horizontal" size="lg" key={item.title} variant="outlined">
          <AspectRatio sx={{ minWidth: 60 }}>
            <img
              srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.src}?h=120&fit=crop&auto=format`}
              alt={item.title}
            />
          </AspectRatio>
          <Box sx={{ whiteSpace: 'nowrap', mx: 1 }}>
            <Typography level="title-md">{item.model}</Typography>
            <Typography level="body-sm">{item.year}</Typography>
            <Typography level="body-sm">{item.description}</Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}