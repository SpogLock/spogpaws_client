'use client';

import { useEffect } from 'react';
import { useAdoptionStore } from '@/services/adoption.service';
import Button from '@/components/ui/outlined-button';
import { AdoptionDto } from '@/types';
import UI from '@/components/ui/ui_core';

export default function HomeScreen() {
  return (
    <div className="container-fluid landing-page">
        <div className="row">
            <div className="col-md-6">
                <h1>BE THEIR HERO</h1>
                <h3>From Shelters to Loving Homes, Help Us Save More Pets.</h3>
                <UI.FilledButton text="Donate" customColor='#25EBC3' borderColor='#25EBC3' textColor='#000000'/>
            </div>
        </div>
    </div>
  );
}