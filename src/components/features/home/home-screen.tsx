'use client';

import { useEffect, useRef } from 'react';
import { useAdoptionStore } from '@/services/adoption.service';
import UI from '@/components/ui/ui_core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './home-screen.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeScreen() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Create smooth scrolling effect
      gsap.to(mainRef.current, {
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });

      // Refresh ScrollTrigger after component mount
      ScrollTrigger.refresh();
    }, mainRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main ref={mainRef}>
      <HeroSection />
      <PartnersSection />
      <PetCareSection />
      <MobileAppSection />
      <ImpactSection />
      <StatisticsSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}

// Hero Section Component with GSAP Animations
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], { 
        opacity: 0, 
        y: 100 
      });
      gsap.set(cardsRef.current, { opacity: 0, x: -50 });
      gsap.set(imageRef.current, { opacity: 0, scale: 0.8, rotation: -10 });

      // Hero entrance animation timeline
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.6")
      .to(cardsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      .to(imageRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)"
      }, "-=1");

             // Floating animation for hero image
       gsap.to(imageRef.current, {
         y: -20,
         duration: 2,
         ease: "power2.inOut",
         yoyo: true,
         repeat: -1
       });

             // Parallax effect for hero section (adjusted to prevent navbar overlap)
       gsap.to(containerRef.current, {
         yPercent: -20, // Reduced from -50 to prevent excessive upward movement
         ease: "none",
         scrollTrigger: {
           trigger: sectionRef.current,
           start: "top bottom",
           end: "bottom top",
           scrub: true
         }
       });

      // Cards hover animations
      const cards = cardsRef.current?.querySelectorAll('.adoption-card');
      cards?.forEach((card) => {
        const cardElement = card as HTMLElement;
        cardElement.addEventListener('mouseenter', () => {
          gsap.to(cardElement, {
            scale: 1.05,
            y: -5,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        cardElement.addEventListener('mouseleave', () => {
          gsap.to(cardElement, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
         <section ref={sectionRef} className="hero-section pb-5">
              <div ref={containerRef} className="container-fluid h-100 d-flex justify-content-center">
          <div className="row align-items-center">
          <div className="col-lg-6 col-md-8">
            <div className="hero-content">
              <h1 ref={titleRef} className="hero-title">
                BE THEIR <span className="gradient-text">HERO</span>
              </h1>
              <h3 ref={subtitleRef} className="hero-subtitle">
                FROM SHELTERS TO LOVING HOMES, HELP US SAVE MORE PETS.
              </h3>
              <div ref={buttonRef}>
                <UI.FilledButton 
                  text="DONATE & MAKE A DIFFERENCE" 
                  customColor='#25EBC3' 
                  borderColor='#000000' 
                  textColor='#000000'
                  className="hero-cta-btn"
                />
              </div>
            </div>
            
            <div ref={cardsRef} className="adoption-cards-container mt-4">
              <div className="adoption-card">
                <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=60&h=60&fit=crop&crop=face" alt="Pet" className="rounded-circle" />
                <div className="adoption-card-content">
                  <small className="text-white">SAVE A LIFE</small>
                  <div className="text-white-50 small">Rescue pets waiting</div>
                </div>
              </div>
              <div className="adoption-card">
                <img src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=60&h=60&fit=crop&crop=face" alt="Pet" className="rounded-circle" />
                <div className="adoption-card-content">
                  <small className="text-white">SAVE A LIFE</small>
                  <div className="text-white-50 small">Find your companion</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6 col-md-4 text-center">
            <div className="hero-image-container">
              <img 
                ref={imageRef}
                src="/hero-img.png" 
                alt="Cute puppy" 
                className="hero-pet-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Partners Section with Stagger Animation
function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const logos = logosRef.current?.querySelectorAll('.partner-logo');
      if (!logos || logos.length === 0) return;
      
      gsap.set(logos, { opacity: 0, y: 30 });

      gsap.to(logos, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Hover animations for logos
      logos?.forEach((logo) => {
        const logoElement = logo as HTMLElement;
        logoElement.addEventListener('mouseenter', () => {
          gsap.to(logoElement, {
            scale: 1.1,
            backgroundColor: "#e5e7eb",
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        logoElement.addEventListener('mouseleave', () => {
          gsap.to(logoElement, {
            scale: 1,
            backgroundColor: "#e9ecef",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="partners-section py-5">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col text-center">
            <div ref={logosRef} className="d-flex justify-content-center align-items-center flex-wrap">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="partner-logo mx-4 my-2">
                  <span className="partner-text">PARTNER</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Pet Care Section with Card Animations
function PetCareSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const vets = [
    { name: "ZEN CLINIC", hasCheckmark: true, rating: 5, isTop: true, description: "Vets on our platform are verified professionals that adhere to lawful medical practices." },
    { name: "VET DR. ALI RAZA", hasCheckmark: true, rating: 5, isTop: false, description: "Vets on our platform are verified professionals that adhere to lawful medical practices." },
    { name: "KURWA CLINIC", hasCheckmark: true, rating: 5, isTop: false, description: "Vets on our platform are verified professionals that adhere to lawful medical practices." }
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.vet-card');
      if (!cards || cards.length === 0) return;
      
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 50 });
      gsap.set(cards, { opacity: 0, y: 80, rotationX: -15 });
      gsap.set(buttonRef.current, { opacity: 0, scale: 0.8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .to(cards, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.2")
      .to(buttonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.4");

      // Card hover animations
      cards?.forEach((card) => {
        const cardElement = card as HTMLElement;
        cardElement.addEventListener('mouseenter', () => {
          gsap.to(cardElement, {
            y: -10,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
          });
        });
        
        cardElement.addEventListener('mouseleave', () => {
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pet-care-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 ref={titleRef} className="section-title">PET CARE</h2>
          <p ref={subtitleRef} className="section-subtitle">
            Connect with the best veterinary professionals - Your pets deserve the best.
          </p>
        </div>
        
        <div ref={cardsRef} className="row">
          {vets.map((vet, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="vet-card card h-100">
                {vet.isTop && <div className="top-badge">TOP VERIFIED VETS</div>}
                <div className="card-body text-center">
                  <div className="vet-avatar-container">
                    <div className="vet-avatar">
                      <svg viewBox="0 0 24 24" width="36" height="36" fill="white">
                        <path d="M12 8L10.67 8.09C10.38 7.45 9.8 7 9.14 7C8.15 7 7.36 7.79 7.36 8.78S8.15 10.56 9.14 10.56C9.79 10.56 10.36 10.13 10.66 9.5L12 9.5L13.34 9.5C13.64 10.13 14.21 10.56 14.86 10.56C15.85 10.56 16.64 9.77 16.64 8.78S15.85 7 14.86 7C14.2 7 13.62 7.45 13.33 8.09L12 8M18.5 12L16.75 12.69C16.55 12.18 16.06 11.81 15.5 11.81C14.67 11.81 14 12.48 14 13.31S14.67 14.81 15.5 14.81C16.06 14.81 16.55 14.44 16.75 13.93L18.5 14.62V12M5.5 12V14.62L7.25 13.93C7.45 14.44 7.94 14.81 8.5 14.81C9.33 14.81 10 14.14 10 13.31S9.33 11.81 8.5 11.81C7.94 11.81 7.45 12.18 7.25 12.69L5.5 12M12 15C8.5 15 6.5 18 6.5 18H17.5C17.5 18 15.5 15 12 15Z"/>
                      </svg>
                    </div>
                  </div>
                  <h5 className="vet-name mt-3">
                    {vet.name} {vet.hasCheckmark && <span className="checkmark">✓</span>}
                  </h5>
                  <div className="vet-rating mb-3">
                    {[...Array(vet.rating)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>
                  <p className="vet-description">{vet.description}</p>
                  <UI.FilledButton 
                    text="BOOK AN APPOINTMENT" 
                    customColor='#10B981' 
                    borderColor='#10B981' 
                    textColor='#ffffff'
                    className="w-100 mt-3"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div ref={buttonRef} className="text-center mt-4">
          <UI.FilledButton 
            text="VIEW MORE" 
            customColor='#10B981' 
            borderColor='#10B981' 
            textColor='#ffffff'
          />
        </div>
      </div>
    </section>
  );
}

// Mobile App Section with Phone Animations
function MobileAppSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const phonesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const phones = phonesRef.current?.querySelectorAll('.phone-mockup');
      if (!phones || phones.length === 0) return;
      
      gsap.set(contentRef.current, { opacity: 0, x: -100 });
      gsap.set(phones, { opacity: 0, y: 100, rotation: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(contentRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out"
      })
      .to(phones, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, "-=0.5");

      // Continuous floating animation for phones
      phones?.forEach((phone, index) => {
        gsap.to(phone, {
          y: index % 2 === 0 ? -15 : -25,
          duration: 2 + index * 0.5,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1
        });
      });

      // Parallax effect
      gsap.to(phonesRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mobile-app-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div ref={contentRef} className="app-content">
              <h2 className="app-title">GET MORE WITH OUR APP</h2>
              <p className="app-description">
                Download our mobile app to access exclusive features, get real-time updates on pets available for adoption, 
                schedule veterinary appointments, and stay connected with our rescue community wherever you go.
              </p>
              <div className="app-store-buttons">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="app-store-btn" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="app-store-btn" />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div ref={phonesRef} className="phone-mockups">
              <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=250&h=500&fit=crop" alt="Phone mockup 1" className="phone-mockup" />
              <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=250&h=500&fit=crop" alt="Phone mockup 2" className="phone-mockup" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Impact Section with Image Gallery Animation
function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const images = imagesRef.current?.querySelectorAll('img');
      const cards = cardsRef.current?.querySelectorAll('.story-card');
      if (!images || images.length === 0 || !cards || cards.length === 0) return;
      
      gsap.set(contentRef.current, { opacity: 0, x: -80 });
      gsap.set(images, { opacity: 0, scale: 0.8 });
      gsap.set(cards, { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(contentRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out"
      })
      .to(images, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.5")
      .to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=0.3");

      // Image hover effects
      images?.forEach((img) => {
        img.addEventListener('mouseenter', () => {
          gsap.to(img, {
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out"
          });
        });
        
        img.addEventListener('mouseleave', () => {
          gsap.to(img, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="impact-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div ref={contentRef}>
              <h2 className="impact-title">ALL LIVES MATTER</h2>
              <p className="impact-subtitle">
                Read about our latest efforts and how we spend your donation money to make an impact for the good cause.
              </p>
              <UI.FilledButton 
                text="CHECK OUT OUR CASE STUDIES" 
                customColor='#10B981' 
                borderColor='#10B981' 
                textColor='#ffffff'
                className="mb-4"
              />
              
              <div ref={cardsRef} className="story-cards">
                <div className="story-card mb-3">
                  <h6>Rescue Story: Max's Journey</h6>
                  <p className="small">From abandoned puppy to beloved family member...</p>
                  <UI.OutlinedButton text="READ MORE" customColor='#10B981' textColor='#10B981' />
                </div>
                <div className="story-card">
                  <h6>Emergency Surgery Success</h6>
                  <p className="small">How your donations saved Luna's life...</p>
                  <UI.OutlinedButton text="READ MORE" customColor='#10B981' textColor='#10B981' />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div ref={imagesRef} className="impact-images">
              <div className="row">
                <div className="col-6 mb-3">
                  <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=250&h=200&fit=crop" alt="Rescued pet" className="img-fluid rounded" />
                </div>
                <div className="col-6 mb-3">
                  <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=250&h=200&fit=crop" alt="Volunteer work" className="img-fluid rounded" />
                </div>
                <div className="col-12">
                  <img src="https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=500&h=200&fit=crop" alt="Happy pets" className="img-fluid rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Statistics Section with Counter Animation
function StatisticsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { number: "10K+", label: "ANIMALS SAVED" },
    { number: "500+", label: "VETERINARIANS" },
    { number: "2K+", label: "ANIMALS TREATED" },
    { number: "10K+", label: "ANIMALS SAVED" }
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      const numbers = statsRef.current?.querySelectorAll('.stat-number');
      if (!statItems || statItems.length === 0 || !numbers || numbers.length === 0) return;
      
      gsap.set(headerRef.current, { opacity: 0, y: 50 });
      gsap.set(statItems, { opacity: 0, y: 80, scale: 0.8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .to(statItems, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }, "-=0.3");

      // Counter animation for numbers
      numbers?.forEach((numberEl, index) => {
        const finalNumber = parseInt(stats[index].number.replace(/[^0-9]/g, ''));
        const obj = { value: 0 };
        
        gsap.to(obj, {
          value: finalNumber,
          duration: 2,
          ease: "power2.out",
          delay: 0.5 + index * 0.1,
          onUpdate: () => {
            const suffix = stats[index].number.includes('K') ? 'K+' : '+';
            (numberEl as HTMLElement).textContent = Math.round(obj.value) + suffix;
          },
          scrollTrigger: {
            trigger: numberEl,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="statistics-section">
      <div className="container">
        <div className="text-center">
          <div ref={headerRef} className="stats-header mb-5">
            <span className="paw-icon">🐾</span>
            <h2 className="stats-title">YOU MAKE A DIFFERENCE</h2>
          </div>
          <div ref={statsRef} className="row">
            {stats.map((stat, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="stat-item">
                  <h3 className="stat-number">{stat.number}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section with Card Carousel Effect
function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Sarah Mitchell",
      rating: 5,
      text: "Amazing platform! Found my perfect companion through their adoption service. The process was smooth and the staff was incredibly helpful.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "James Wilson",
      rating: 5,
      text: "The veterinary services are top-notch. Dr. Johnson saved my cat's life with her expertise. Highly recommend this platform to all pet owners.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Emily Chen",
      rating: 5,
      text: "Adopted two rescue dogs last year. The team provided excellent support throughout the process. My pets are now happy and healthy!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (!cards || cards.length === 0) return;
      
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      gsap.set(cards, { opacity: 0, y: 100, rotationY: -15 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .to(cards, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.3");

      // Card hover effects
      cards?.forEach((card) => {
        const cardElement = card as HTMLElement;
        cardElement.addEventListener('mouseenter', () => {
          gsap.to(cardElement, {
            y: -15,
            scale: 1.03,
            duration: 0.4,
            ease: "power2.out"
          });
        });
        
        cardElement.addEventListener('mouseleave', () => {
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="testimonials-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 ref={titleRef} className="section-title">TESTIMONIALS</h2>
        </div>
        <div ref={cardsRef} className="row">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="testimonial-card card h-100">
                <div className="card-body text-center">
                  <div className="testimonial-avatar-container">
                    <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
                  </div>
                  <div className="testimonial-rating my-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <h6 className="testimonial-name">{testimonial.name}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer with Smooth Entrance
function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const sections = contentRef.current?.querySelectorAll('.footer-section-content');
      if (!sections || sections.length === 0) return;
      
      gsap.set(sections, { opacity: 0, y: 50 });

      gsap.to(sections, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer-section py-5">
      <div className="container">
        <div ref={contentRef} className="row">
          <div className="col-lg-6 footer-section-content">
            <h3 className="footer-brand">SPOGPAWS</h3>
            <p className="footer-description">
              Connecting loving families with rescue pets and providing the best veterinary care for all animals.
            </p>
          </div>
          <div className="col-lg-6 footer-section-content">
            <div className="row">
              <div className="col-md-6">
                <h6 className="footer-heading">Contact</h6>
                <p className="footer-text">
                  Email: info@spogpaws.com<br />
                  Phone: (555) 123-4567<br />
                  Address: 123 Pet Rescue St.
                </p>
              </div>
              <div className="col-md-6">
                <h6 className="footer-heading">Quick Links</h6>
                <ul className="footer-links">
                  <li><a href="/adopt">Adopt</a></li>
                  <li><a href="/donate">Donate</a></li>
                  <li><a href="/volunteer">Volunteer</a></li>
                  <li><a href="/contact">Contact Us</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="text-center footer-section-content">
          <p className="footer-copyright">© 2024 SPOGPAWS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}