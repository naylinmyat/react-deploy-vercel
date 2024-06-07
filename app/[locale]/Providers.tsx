'use client';

import { sendGTMEvent } from '@next/third-parties/google';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { hotjar } from 'react-hotjar';
import { Footer, Header } from '@components/index';
import { pageview as fbPageview } from '@core/fpixel';
import { createContext } from 'react';
import { FontType, SelectOptionType } from '@core/golobalTypes';
import { useTranslations } from 'next-intl';

interface SearchContextType {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}
const SearchDefaultValue: SearchContextType = {
  searchValue: '',
  setSearchValue: () => {},
};

interface FontListContextType {
  fontList: FontType[];
  setFontList: React.Dispatch<React.SetStateAction<FontType[]>>;
}
const FontListDefaultValue: FontListContextType = {
  fontList: [],
  setFontList: () => {},
};

interface CheckedContextType {
  checked: { task: string; done: boolean; value: string }[];
  setChecked: React.Dispatch<React.SetStateAction<{ task: string; done: boolean; value: string }[]>>;
}
const CheckedDefaultValue: CheckedContextType = {
  checked: [],
  setChecked: () => {},
};

interface ValueContextType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const ValueDefaultValue: ValueContextType = {
  value: '',
  setValue: () => {},
};

interface FontSizeContextType {
  fontSize: SelectOptionType;
  setFontSize: React.Dispatch<React.SetStateAction<SelectOptionType>>;
}
const FontSizeDefaultValue: FontSizeContextType = {
  fontSize: {label: '', value: ''},
  setFontSize: () => {},
};

interface IsWinFontContextType {
  isWinFont: boolean;
  setIsWinFont: React.Dispatch<React.SetStateAction<boolean>>;
}
const IsWinDefaultValue: IsWinFontContextType = {
  isWinFont: false,
  setIsWinFont: () => {},
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('Index');

  const [searchValue, setSearchValue] = useState<string>('');
  const [fontList, setFontList] = useState<FontType[]>([]);
  const [checked, setChecked] = useState<{ task: string; done: boolean; value: string }[]>([
    { task: t('zaw-gyi'), done: true, value: 'zawgyi' },
    { task: t('unicode'), done: true, value: 'unicode' },
    { task: t('win'), done: true, value: 'win' },
  ]);
  const [value, setValue] = useState<string>('');
  const [fontSize, setFontSize] = useState<SelectOptionType>({
    label: '24',
    value: '24',
  });
  const [isWinFont, setIsWinFont] = useState<boolean>(false);

  const hotJarKey = process.env.NEXT_PUBLIC_HOT_JAR;

  useEffect(() => {
    setMounted(true);
    if (hotJarKey) {
      hotjar.initialize(parseInt(hotJarKey), 1);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      sendGTMEvent(url);
      fbPageview(url);
    };
    if (pathname) {
      handleRouteChange(pathname);
    }
  }, [pathname]);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <FontListContext.Provider value={{ fontList, setFontList }}>
          <CheckedContext.Provider value={{ checked, setChecked }}>
            <ValueContext.Provider value={{ value, setValue }}>
              <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
                <IsWinFontContext.Provider value={{ isWinFont, setIsWinFont }}>
                  <div className="flex flex-col min-h-screen ">
                    <Header pathname={pathname} children={children} />
                    {
                      window.innerWidth < 1345 ?
                        <>
                          <AnimatePresence mode="wait">
                            {pathname && pathname?.length > 3 ? (
                              <div className="flex-grow mx-5 mt-5 sm:mx-10 md:mx-20 h-full lg:mx-auto lg:mt-10 lg:w-[996px] max-w-[996px] selection:bg-[#b7b7a4]">
                                {children}
                              </div>
                            ) : (
                              children
                            )}
                          </AnimatePresence>
                          <Footer />
                        </> :
                        <></>
                    }
                  </div>
                </IsWinFontContext.Provider>
              </FontSizeContext.Provider>
            </ValueContext.Provider>
          </CheckedContext.Provider>
        </FontListContext.Provider>
      </SearchContext.Provider>
    </ThemeProvider>
  );
};

export const SearchContext = createContext<SearchContextType>(SearchDefaultValue);
export const FontListContext = createContext<FontListContextType>(FontListDefaultValue);
export const CheckedContext = createContext<CheckedContextType>(CheckedDefaultValue);
export const ValueContext = createContext<ValueContextType>(ValueDefaultValue);
export const FontSizeContext = createContext<FontSizeContextType>(FontSizeDefaultValue);
export const IsWinFontContext = createContext<IsWinFontContextType>(IsWinDefaultValue);

export default Providers;
