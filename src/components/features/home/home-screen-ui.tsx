'use client';
import LandingSection from '@/components/features/home/ui-goodies/landing-section/landing-section';
import PetCareSection from '@/components/features/home/ui-goodies/petcare-section/petcare-section';
import AppSection from '@/components/features/home/ui-goodies/app-section/app-section';
export default function Home() {
  return (
    <div>
       <LandingSection />
       <PetCareSection />
       <AppSection />
    </div>
  );
} 