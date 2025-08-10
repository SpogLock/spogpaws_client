'use client';

import { useEffect } from 'react';
import { useAdoptionStore } from '@/services/adoption.service';
import Button from '@/components/ui/outlined-button';
import { AdoptionDto } from '@/types';

interface AdoptionCardProps {
  adoption: AdoptionDto;
  onViewDetails: (adoption: AdoptionDto) => void;
}

function AdoptionCard({ adoption, onViewDetails }: AdoptionCardProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{adoption.petName}</h3>
          <span className="text-sm text-muted-foreground">{adoption.petAge} years old</span>
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          {adoption.petType} • {adoption.petBreed}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Location:</span> {adoption.location}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {adoption.description}
        </p>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Contact:</span> {adoption.contactInfo}
        </p>
      </div>
      <div className="mt-4">
        <Button 
          customColor='#25EBC3'
          onClick={() => onViewDetails(adoption)}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}

export function AdoptionList() {
  const { adoptions, loading, getAllAdoptions } = useAdoptionStore();

  useEffect(() => {
    getAllAdoptions();
  }, [getAllAdoptions]);

  const handleViewDetails = (adoption: AdoptionDto) => {
    console.log('View adoption details:', adoption);
    // Navigate to adoption details page or open modal
  };

  if (loading.isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading adoptions...</p>
        </div>
      </div>
    );
  }

  if (loading.error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="text-sm text-red-800">
          Error loading adoptions: {loading.error}
        </div>
      </div>
    );
  }

  if (adoptions.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="mx-auto max-w-md">
          <div className="mx-auto h-12 w-12 text-muted-foreground">
            <svg 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" 
              />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No pets available</h3>
          <p className="mt-1 text-sm text-gray-500">
            No pets are currently available for adoption.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Pets for Adoption</h2>
        <p className="text-sm text-muted-foreground">
          {adoptions.length} pet{adoptions.length !== 1 ? 's' : ''} available
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adoptions.map((adoption) => (
          <AdoptionCard
            key={adoption.id}
            adoption={adoption}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
} 