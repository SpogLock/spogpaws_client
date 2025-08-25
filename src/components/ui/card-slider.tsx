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

  const getVisibleCards = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 576) return 1; // Mobile: 1 card
      if (window.innerWidth <= 768) return 2; // Tablet: 2 cards  
      if (window.innerWidth <= 1200) return 2; // Small desktop: 2 cards
    }
    return 3; // Large desktop: 3 cards
  };

  const nextSlide = () => {
    if (isAnimating) return;
    const maxIndex = Math.max(0, cards.length - getVisibleCards());
    
    if (currentIndex >= maxIndex) {
      setIsAnimating(true);
      setCurrentIndex(0); // Reset to beginning
    } else {
      setIsAnimating(true);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (isAnimating) return;
    if (currentIndex <= 0) return;
    
    setIsAnimating(true);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
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

    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, cards.length - visibleCards);

    if (isLeftSwipe && currentIndex < maxIndex) {
      nextSlide();
    }
    if (isRightSwipe && currentIndex > 0) {
      prevSlide();
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      const visibleCards = getVisibleCards();
      const containerWidth = sliderRef.current.parentElement?.clientWidth || window.innerWidth - 48;
      const cardWidth = containerWidth / visibleCards;
      const gap = window.innerWidth <= 576 ? 16 : window.innerWidth <= 768 ? 20 : 24;
      
      gsap.to(sliderRef.current, {
        x: -currentIndex * (cardWidth + gap),
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
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, cards.length - visibleCards);
        
        if (currentIndex >= maxIndex) {
          // Reset to beginning when reaching the end
          setCurrentIndex(0);
        } else {
          nextSlide();
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating, currentIndex, cards.length]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        const visibleCards = getVisibleCards();
        const containerWidth = sliderRef.current.parentElement?.clientWidth || window.innerWidth - 48;
        const cardWidth = containerWidth / visibleCards;
        const gap = window.innerWidth <= 576 ? 16 : window.innerWidth <= 768 ? 20 : 24;
        
        gsap.set(sliderRef.current, {
          x: -currentIndex * (cardWidth + gap)
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
          paddingX: '24px',
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
            gap: { xs: 2, sm: 2.5, md: 3 },
            transition: 'transform 0.5s ease-out',
            '& > *': {
              flex: { 
                xs: '0 0 calc(100% - 16px)', // Mobile: 1 card takes full width
                sm: '0 0 calc(50% - 12px)',  // Tablet: 2 cards
                md: '0 0 calc(50% - 12px)',  // Small desktop: 2 cards
                lg: '0 0 calc(33.33% - 16px)' // Large desktop: 3 cards
              }
            }
          }}
        >
          {cards.map((card, index) => (
            <Card
              key={card.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              sx={{
                minWidth: { xs: 'calc(100vw - 64px)', sm: '280px', md: '320px', lg: '350px' },
                maxWidth: { xs: 'calc(100vw - 64px)', sm: '320px', md: '350px', lg: '400px' },
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
                  &ldquo;{card.description}&rdquo;
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
      {/* <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
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
      </Box> */}
    </div>
  );
}
