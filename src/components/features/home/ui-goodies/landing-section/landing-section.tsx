'use client';
import Image from 'next/image';
import './landing-section.css';
import UI from '@/components/ui/ui_core';
export default function LandingSection() {
  return (
    <div className='home-screen'>
      <div className="container">
        <div className='row'>
          <div className='col-lg-7 col-md-12 ps-5 pt-5 pe-5'>
            <h1 className='hero-heading pt-0 mt-0 pt-md-5 mt-md-5 text-white'>BE THEIR <span className='hero-heading-span'>HERO</span></h1>
            <h3 className='text-white'>From Shelters to Loving Homes, <br className='d-none d-lg-block' /> Help Us Save More Pets.</h3>
            <UI.FilledButton className='mt-3' customColor='#25EBC3' textColor='#000000'>Donate Now</UI.FilledButton>
          </div>
          <div className='col-5'>
            <Image className='img-fluid ' src="/hero-img.png" alt='Home Screen Image' width={500} height={500} />
          </div>
        </div>
      </div>
    </div>
  )
}


