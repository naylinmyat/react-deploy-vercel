'use client';
import React, { useContext, useEffect } from 'react';
import { FramerMotionWrapper, TextGenerateComponent } from '@components/index';
import { IsWinFontContext } from '../Providers';

const Lorem = () => {
  const isWinFontContext = useContext(IsWinFontContext);
  const { isWinFont,setIsWinFont } = isWinFontContext;

  useEffect(() => {
    setIsWinFont(false);
  }, []);

  return (
    <FramerMotionWrapper>
      <TextGenerateComponent />
    </FramerMotionWrapper>
  );
};

export default Lorem;
