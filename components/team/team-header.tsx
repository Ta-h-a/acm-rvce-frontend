import React from 'react';
import { motion } from 'framer-motion';

const TeamHeader: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center my-12"
    >
      <h1 className="font-heading text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">Our Team</h1>
      <p className="text-lg max-w-2xl mt-4 mx-auto text-muted-foreground">
        Meet the dedicated individuals behind ACM RVCE who work to foster innovation and growth in computing.
      </p>
    </motion.div>
  );
};

export default TeamHeader; 