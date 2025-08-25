'use client';
import './landing-section.css';
import UI from '@/components/ui/ui_core';

export default function LandingSection() {
  return (
    <div className='home-screen'>
      {/* Background Video */}
      <video 
        className="background-video" 
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="/241180_small.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Content Overlay */}
      <div className="content-overlay">
        <div className="container">
          <div className='row'>
            <div className='col-lg-8 col-md-10 col-12 ps-5  pe-5'>
              <h1 className='hero-heading pt-0 mt-0  text-white'>
                BE THEIR <span className='hero-heading-span'>HERO</span>
              </h1>
              <h3 className='text-white'>
                From Shelters to Loving Homes, <br className='d-none d-lg-block' /> 
                Help Us Save More Pets.
              </h3>
              <UI.FilledButton className='mt-3' customColor='#25EBC3' textColor='#000000'>
                Donate Now
              </UI.FilledButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


