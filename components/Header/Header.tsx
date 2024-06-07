'use client';


import { useTheme } from 'next-themes';
import { useContext, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { LangSelectBox, LogoMenu, NavMenu, Footer } from '..';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AnimatePresence } from 'framer-motion';
import filterSearch from '@core/filterSearch';
import { fbEvent } from '@core/fpixel';
import { getFontsArray } from '@core/getFonts';
import { useTranslations } from 'next-intl';
import SearchBar from '@components/SearchBar/SearchBar';
import { CheckedContext, FontListContext, SearchContext, ValueContext, FontSizeContext } from '../../app/[locale]/Providers';

const drawerWidth = 350;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface HeaderProps {
  // mobileMenuOpen: boolean;
  // setMobileMenuOpen: (value: boolean) => void;
  // isLightTheme: boolean;
  // switchTheme: () => void;

  pathname: any;
  children: any;
}

export default function Header ({ pathname, children }: HeaderProps): React.ReactElement {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  console.log(theme);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const [open, setOpen] = window.innerWidth >= 1345 ? useState(true) : useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const searchContext = useContext(SearchContext);
  const fontListContext = useContext(FontListContext);
  const checkedContext = useContext(CheckedContext);
  const valueContext = useContext(ValueContext);
  const fontSizeContext = useContext(FontSizeContext);
  const data = getFontsArray();
  const t = useTranslations('Index');
  const { searchValue, setSearchValue } = searchContext;
  const { checked, setChecked } = checkedContext;
  const { fontList, setFontList } = fontListContext;
  const { value, setValue } = valueContext;
  const { fontSize, setFontSize } = fontSizeContext;

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchKeyword = event.target.value;
    setSearchValue(searchKeyword);
    const filterData = filterSearch(searchKeyword, data, checked);
    setFontList(filterData);
    fbEvent('Search', { search_font: searchKeyword });
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    const searchKeyword = event.target.value;
    setValue(searchKeyword);
    fbEvent('Search', { search_string: searchKeyword });
  };

  return (
    // <header>
    //   <nav
    //     className="flex items-center justify-between w-full p-2 mx-auto border-b-2 shadow-lg max-w-8xl lg:px-8 border-secondary"
    //     aria-label="Global"
    //   >
    //     <div className="max-w-[996px] flex items-center w-full justify-between mx-auto">
    //       <div className="flex items-center">
    //         <div className="flex items-center px-5 ">
    //           <button
    //             type="button"
    //             className="-m-2.5 inline-flex items-center justify-center rounded-md text-gray-700"
    //             onClick={() => setMobileMenuOpen(true)}
    //           >
    //             <span className="sr-only">Open main menu</span>
    //             <Bars3Icon className="w-8 h-8" aria-hidden="true" />
    //           </button>
    //         </div>
    //         <LogoMenu />
    //       </div>
    //       <div className="flex items-center">
    //         <div className="">
    //           <LangSelectBox />
    //         </div>
    //         <div className="px-5">
    //           <DarkModeSwitch
    //             checked={currentTheme === 'light'}
    //             onChange={switchTheme}
    //             size={24}
    //             sunColor="#E4D1AC"
    //             moonColor="#365880"
    //           />
    //         </div>
    //         {/* <div className="hidden lg:flex">
    //           <LogoMenu />
    //         </div> */}
    //       </div>
    //       <NavMenu
    //         switchTheme={switchTheme}
    //         isLightTheme={currentTheme === 'light'}
    //         setMobileMenuOpen={setMobileMenuOpen}
    //         mobileMenuOpen={mobileMenuOpen}
    //       />
    //     </div>
    //   </nav>
    // </header>

    <Box sx={{ display: 'flex', widt: '100vw', overflow: 'hidden' }}>
      <AppBar position="fixed" open={open} elevation={0}>
        <header className='bg-primary dark:bg-lightblue'>
          <nav
            className="flex items-center justify-between w-full p-2 mx-auto border-b-2 shadow-lg max-w-8xl lg:px-8 border-secondary"
            aria-label="Global"
          >
            <div className="max-w-[996px] flex items-center w-full justify-between mx-auto">
              <div className="flex items-center">
                <div className="flex items-center pl-5 pr-0 ">
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ ...(open && { display: 'none' }) }}
                  >
                    <MenuIcon className='text-secondaryText dark:text-darkSecondaryText' />
                  </IconButton>
                </div>
                <LogoMenu />
              </div>
              <div className="flex items-center flex-grow">
                <SearchBar
                  searchValue={searchValue}
                  filterOnChange={inputOnChange}
                />
              </div>
              <div className="flex items-center">
                <div className="">
                  <LangSelectBox />
                </div>
                <div className="px-5">
                  <DarkModeSwitch
                    checked={currentTheme === 'light'}
                    onChange={switchTheme}
                    size={24}
                    sunColor="#E4D1AC"
                    moonColor="#365880"
                  />
                </div>
              </div>
            </div>
          </nav>
        </header>
      </AppBar>
      <NavMenu
        drawerWidth={drawerWidth}
        handleDrawerClose={handleDrawerClose}
        open={open}
        isLightTheme={currentTheme === 'light'}
        value={value}
        handleChange={handleChange}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      <Main open={open}>
        {
          window.innerWidth >= 1345 ?
            <>
              <AnimatePresence mode="wait">
                {pathname && pathname?.length > 3 ? (
                  <div className="flex-grow mx-5 mt-5 sm:mx-10 md:mx-20 lg:mx-auto lg:mt-10 lg:w-[996px] max-w-[996px] selection:bg-[#b7b7a4]">
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
      </Main>
    </Box>
  );
}
