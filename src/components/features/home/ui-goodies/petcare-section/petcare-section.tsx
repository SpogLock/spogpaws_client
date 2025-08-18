"use client";

import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import './petcare-section.css';
import { Verified } from '@mui/icons-material';
import CardSlider from '../../../../ui/card-slider';
import FilledButton from '@/components/ui/filled-button';

const vetCards = [
  {
    id: 1,
    title: "VET DR. ALI RAZA",
    rating: 5,
    description: "Vets on our platform are verified professionals that adhere to lawful medical practices.",
    image: "/clinic-img.png",
    verified: true,
    buttonText: "BOOK AN APPOINTMENT"
  },
  {
    id: 2,
    title: "ZEN CLINIC",
    rating: 5,
    description: "Vets on our platform are verified professionals that adhere to lawful medical practices.",
    image: "/clinic-img.png",
    verified: true,
    buttonText: "BOOK AN APPOINTMENT"
  },
  {
    id: 3,
    title: "KURWA CLINIC",
    rating: 5,
    description: "Vets on our platform are verified professionals that adhere to lawful medical practices.",
    image: "/clinic-img.png",
    verified: true,
    buttonText: "BOOK AN APPOINTMENT"
  },
  {
    id: 4,
    title: "PET CARE PLUS",
    rating: 5,
    description: "Vets on our platform are verified professionals that adhere to lawful medical practices.",
    image: "/clinic-img.png",
    verified: true,
    buttonText: "BOOK AN APPOINTMENT"
  },
  {
    id: 5,
    title: "PET CARE PLUS",
    rating: 5,
    description: "Vets on our platform are verified professionals that adhere to lawful medical practices.",
    image: "/clinic-img.png",
    verified: true,
    buttonText: "BOOK AN APPOINTMENT"
  },
  {
    id: 6,
    title: "PET CARE PLUS",
    rating: 5,
    description: "Vets on our platform are verified professionals that adhere to lawful medical practices.",
    image: "/clinic-img.png",
    verified: true,
    buttonText: "BOOK AN APPOINTMENT"
  },
  {
    id: 7,
    title: "PET CARE PLUS",
    rating: 5,
    description: "Vets on our platform are verified professionals that adhere to lawful medical practices.",
    image: "/clinic-img.png",
    verified: true,
    buttonText: "BOOK AN APPOINTMENT"
  },
];

export default function PetCareSection() {
  return (
    <div className='petcare-section pb-5 mb-5'>
      <div className='container'>
        <div className='row'>
          {/* <div className='col-12'>
            <h1 className='section-heading text-center pt-5'>Pet Care</h1>
            <p className='text-center mb-5'>
              Connect with the best veterinary professionals and verified Clinics,<br/> 
              or find a specialist in your area.
            </p>
          </div> */}
        </div>

        {/* Featured Card */}
        <div className='row mb-5 mt-5 pt-5'>
          <div className='col-12'>
            <Card 
              sx={{
                background: '#6848BD',
                color: 'white',
                borderRadius: 4,
                position: 'relative',
                overflow: 'visible',
                boxShadow: 'none',
                transform: 'translateY(-20px)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-30px',
                  right: '30px',
                  width: '80px',
                  height: '80px',
                  background: '#FFD700',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 20px rgba(255, 215, 0, 0.3)',
                  zIndex: 2
                }
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '-25px',
                  right: '35px',
                  width: '70px',
                  height: '70px',
                  background: '#FFD700',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 3
                }}
              >
                <Verified sx={{ color: 'white', fontSize: 40 }} />
              </Box>
              
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography className='pt-5' variant="h4" component="h2" sx={{ mb: 2 }}>
                  TOP VERIFIED VETS
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem' }}>
                  Connect with the best veterinary professionals and verified Clinics,
                  <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}><br/></Box>
                  or find a specialist in your area.
                </Typography>
                <Button 
                  variant="contained" className='mb-5'
                  sx={{ 
                    background: 'white', 
                    color: '#000',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: '#f5f5f5'
                    }
                  }}
                >
                  READ MORE
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Card Slider */}
        <div className='row'>
          <div className='col-12'>
            <CardSlider cards={vetCards} />
          </div>
        </div>
        <div className='row pt-5'>
          <div className='col-12'>
            <div className='d-flex justify-content-center'>
              <FilledButton
                text="VIEW ALL"
                customColor='#25EBC3'
                textColor='#000'
                onClick={() => {}}
                className='justify-content-center d-flex'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
