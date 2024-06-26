'use client';
import React, { useContext, useEffect } from 'react';
import { FramerMotionWrapper, PremiumCard } from '@components/index';
import { getAllPremiumFonts } from '@core/api';
import { PremiumFontType } from '@core/golobalTypes';
import { IsWinFontContext } from '../Providers';

const Page = () => {
  const isWinFontContext = useContext(IsWinFontContext);
  const { isWinFont,setIsWinFont } = isWinFontContext;
  const [fonts, setFonts] = React.useState<PremiumFontType[]>([]);

  useEffect(() => {
    async function getFonts() {
      const data = await getAllPremiumFonts();
      setFonts(data);
    }
    if (fonts.length === 0) {
      getFonts();
    }
    setIsWinFont(false);
  }, [fonts]);

  return (
    <FramerMotionWrapper>
      <div className="grid grid-cols-1  gap-12 gap-y-12 mx-auto mt-3 w-fit lg:grid-cols-3 sm:grid-cols-2">
        {fonts?.length > 0 && fonts.map((font, i) => <PremiumCard font={font} key={i} id={i} />)}
      </div>
    </FramerMotionWrapper>
  );
};

export default Page;
