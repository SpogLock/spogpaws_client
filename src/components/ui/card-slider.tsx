"use client";

import { useState, useEffect, useRef } from 'react';
import './card-slider.css';
import { Card, CardContent, Typography, Button, Box, IconButton, Rating } from '@mui/material';
import { ChevronLeft, ChevronRight, Verified } from '@mui/icons-material';
import { gsap } from 'gsap';

interface CardData {
  id: number;
  title: string;
  subtitle?: string;
  rating?: number;
  description: string;
  image: string;
  verified?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

interface CardSliderProps {
  cards: CardData[];
  className?: string;
}

export default function CardSlider({ cards, className = '' }: CardSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      // Calculate the slide width based on screen size
      const slideWidth = window.innerWidth <= 576 ? 280 : 
                        window.innerWidth <= 768 ? 320 : 
                        window.innerWidth <= 1200 ? 350 : 400;
      const gap = window.innerWidth <= 576 ? 24 : 
                  window.innerWidth <= 768 ? 32 : 48;
      
      gsap.to(sliderRef.current, {
        x: -currentIndex * (slideWidth + gap),
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => setIsAnimating(false)
      });
    }
  }, [currentIndex]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        const slideWidth = window.innerWidth <= 576 ? 280 : 
                          window.innerWidth <= 768 ? 320 : 
                          window.innerWidth <= 1200 ? 350 : 400;
        const gap = window.innerWidth <= 576 ? 24 : 
                    window.innerWidth <= 768 ? 32 : 48;
        
        gsap.set(sliderRef.current, {
          x: -currentIndex * (slideWidth + gap)
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  return (
    <div className={`card-slider ${className}`}>
      <Box 
        sx={{ 
          position: 'relative', 
          overflowX: 'hidden', 
          overflowY: 'visible', 
          paddingLeft: '24px', 
          paddingRight: '24px', 
          paddingTop: { xs: '56px', md: '64px' } 
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Navigation Buttons */}
        <IconButton
          onClick={prevSlide}
          disabled={isAnimating}
          sx={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 10,
            '&:hover': {
              background: '#f5f5f5'
            }
          }}
        >
          <ChevronLeft />
        </IconButton>

        <IconButton
          onClick={nextSlide}
          disabled={isAnimating}
          sx={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 10,
            '&:hover': {
              background: '#f5f5f5'
            }
          }}
        >
          <ChevronRight />
        </IconButton>

        {/* Slider Container */}
        <Box
          ref={sliderRef}
          sx={{
            display: 'flex',
            gap: { xs: 1.5, sm: 2, md: 3 },
            transition: 'transform 0.5s ease-out',
            minWidth: `${cards.length * 100}%`
          }}
        >
          {cards.map((card, index) => (
            <Card
              key={card.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              sx={{
                minWidth: { xs: '240px', sm: '280px', md: '320px', lg: '350px' },
                maxWidth: { xs: '280px', sm: '320px', md: '350px', lg: '400px' },
                background: 'white',
                borderRadius: 4,
                boxShadow: 'none',
                position: 'relative',
                overflow: 'visible',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: 'none'
                }
              }}
            >
              {/* Image that cuts out of the card */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #00d4aa 0%, #0099cc 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'none',
                  zIndex: 2
                }}
              >
                <Box
                  component="img"
                  src={card.image}
                  alt={card.title}
                 
                />
              </Box>

              <CardContent sx={{ pt: 6, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mr: 1 }}>
                    {card.title}
                  </Typography>
                  {card.verified && (
                    <Verified sx={{ color: '#FFD700', fontSize: 20 }} />
                  )}
                </Box>
                
                {card.subtitle && (
                  <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                    {card.subtitle}
                  </Typography>
                )}
                
                {card.rating && (
                  <Rating value={card.rating} readOnly sx={{ mb: 2 }} />
                )}
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 3, 
                    fontStyle: 'italic',
                    color: '#666'
                  }}
                >
                  "{card.description}"
                </Typography>
                
                {card.buttonText && (
                  <Button 
                    variant="outlined" 
                    onClick={card.onButtonClick}
                    sx={{ 
                      borderColor: '#6a11cb',
                      color: '#000',
                      px: 3,
                      py: 1,
                      '&:hover': {
                        background: '#6a11cb',
                        color: 'white'
                      }
                    }}
                  >
                    {card.buttonText}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Dots Indicator */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
        {cards.map((_, index) => (
          <Box
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setCurrentIndex(index);
              }
            }}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: index === currentIndex ? '#6a11cb' : '#ddd',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
              '&:hover': {
                background: index === currentIndex ? '#6a11cb' : '#bbb'
              }
            }}
          />
        ))}
      </Box>
    </div>
  );
}
