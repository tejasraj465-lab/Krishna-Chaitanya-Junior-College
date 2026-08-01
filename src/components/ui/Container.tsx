import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'main' | 'footer' | 'header';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  as: Tag = 'div',
}) => {
  return (
    <Tag className={`max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 ${className}`}>
      {children}
    </Tag>
  );
};
