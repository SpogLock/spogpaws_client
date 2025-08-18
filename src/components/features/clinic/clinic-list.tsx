'use client';

import { useEffect } from 'react';
import { useClinicStore } from '@/services/clinic.service';
import Button from '@/components/ui/outlined-button';
import { ClinicDto } from '@/types';

interface ClinicCardProps {
  clinic: ClinicDto;
  onViewDetails: (clinic: ClinicDto) => void;
}

function ClinicCard({ clinic, onViewDetails }: ClinicCardProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{clinic.clinicName}</h3>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Hours:</span> {clinic.openingHours}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {clinic.about}
        </p>
      </div>
      <div className="mt-4">
        <Button 
          text="View Details"
          onClick={() => onViewDetails(clinic)}
        />
      </div>
    </div>
  );
}

export function ClinicList() {
  const { clinics, loading, getAllClinics } = useClinicStore();

  useEffect(() => {
    getAllClinics();
  }, [getAllClinics]);

  const handleViewDetails = (clinic: ClinicDto) => {
    console.log('View clinic details:', clinic);
    // Navigate to clinic details page or open modal
  };

  if (loading.isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading clinics...</p>
        </div>
      </div>
    );
  }

  if (loading.error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="text-sm text-red-800">
          Error loading clinics: {loading.error}
        </div>
      </div>
    );
  }

  if (clinics.length === 0) {
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.25a3.375 3.375 0 00-3.375 3.375v1.5c0 .621.504 1.125 1.125 1.125h4.125c.621 0 1.125-.504 1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375z" 
              />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No clinics found</h3>
          <p className="mt-1 text-sm text-gray-500">
            No veterinary clinics are currently available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Veterinary Clinics</h2>
        <p className="text-sm text-muted-foreground">
          {clinics.length} clinic{clinics.length !== 1 ? 's' : ''} available
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clinics.map((clinic) => (
          <ClinicCard
            key={clinic.clinicId}
            clinic={clinic}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
} 