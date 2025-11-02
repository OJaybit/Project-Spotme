import React from 'react';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { CTA } from '../components/landing/CTA';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <CTA />
    </div>
  );
};