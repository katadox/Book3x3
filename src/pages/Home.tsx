import React from 'react';
import { Hero } from '../components/Hero';

interface HomeProps {
  onStartCreate: () => void;
  onExplore: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStartCreate, onExplore }) => {
  return (
    <div className="space-y-12">
      <Hero onStartCreate={onStartCreate} onExplore={onExplore} />
    </div>
  );
};
