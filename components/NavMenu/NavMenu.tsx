'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';
import { usePathname } from 'next/navigation';
import { RadioSelectBar } from '..';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { fbEvent } from '@core/fpixel';
import { SelectOptionType } from '@core/golobalTypes';
import { Divider } from '@mui/material';
import { useContext } from 'react';
import { IsWinFontContext } from '../../app/[locale]/Providers';

interface NavMenuProps {
  // mobileMenuOpen: boolean;
  // setMobileMenuOpen: (value: boolean) => void;
  // isLightTheme: boolean;
  // switchTheme: () => void;

  drawerWidth: number;
  handleDrawerClose: () => void;
  open: boolean;
  isLightTheme: boolean;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  fontSize: SelectOptionType;
  setFontSize: React.Dispatch<React.SetStateAction<SelectOptionType>>;
}

export default function NavMenu({ drawerWidth,handleDrawerClose,open,isLightTheme,value,handleChange,fontSize,setFontSize }: NavMenuProps) {
  const pathname = usePathname();
  const activeLink = 'relative font-bold leading-6 tracking-wide text-base';
  const unactiveLink = 'relative  font-semibold leading-6 tracking-wide text-base';
  const t = useTranslations('Index');
  let sliderTimeout: NodeJS.Timeout;
  const isWinFontContext = useContext(IsWinFontContext);
  const { isWinFont,setIsWinFont } = isWinFontContext;
  // const classes = useStyles();

  const menuItems = [
    {
      title: t('content'),
      href: '/',
      locale: '/en',
    },
    {
      title: t('premium'),
      href: '/premium',
      locale: '/en/premium',
    },
    {
      title: t('generate'),
      href: '/myanmar-fonts-generator',
      locale: '/en/myanmar-fonts-generator',
    },
    {
      title: t('about-us'),
      href: '/about-us',
      locale: '/en/about-us',
    },
  ];

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(sliderTimeout);
    setFontSize({ label: event.target.value, value: event.target.value });
    fbEvent('Change', {
      content_type: event.target.value,
      content_name: event.target.value,
      value: event.target.value,
    });
  };

  return (
    <>
      {/* <div className="items-center hidden lg:gap-x-12">
        {menuItems.map((item) => (
          <motion.div whileHover={{ scale: 1.2 }} key={item.title}>
            <Link href={item.href} className={pathname == item.href ? activeLink : unactiveLink}>
              {(item.href === pathname || item.locale === pathname) && (
                <motion.span
                  layoutId="underline"
                  className="absolute top-full left-0 block h-[1px] bg-darkblue dark:bg-white w-full "
                />
              )}
              {item.title}
            </Link>
          </motion.div>
        ))}
        <LangSelectBox />
        <DarkModeSwitch
          checked={isLightTheme}
          onChange={switchTheme}
          size={30}
          sunColor="#E4D1AC"
          moonColor="#365880"
        />
      </div>

      <Dialog as="div" className="" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-primary dark:bg-lightblue sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <Image
                className="w-auto h-10"
                src={Logo}
                alt="mm fonts collection logo"
                sizes="100vw"
                placeholder="blur"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2">
                {menuItems.map((item) => (
                  <motion.div whileHover={{ scale: 1.2 }} key={item.title}>
                  <Link href={item.href} className={pathname == item.href ? activeLink : unactiveLink}>
                    {(item.href === pathname || item.locale === pathname) && (
                      <motion.span
                        layoutId="underline"
                        className="absolute top-full left-0 block h-[1px] bg-darkblue dark:bg-white w-full "
                      />
                    )}
                    {item.title}
                  </Link>
                </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 2,
            borderColor: isLightTheme ? 'black' : 'white',
            borderRadius: '0px 24px 24px 0',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div className="bg-[#e3d4b6] dark:bg-[#3f628a] h-full">
          <div className="flex items-center justify-end p-6">
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon className='text-secondaryText dark:text-darkSecondaryText text-5xl' />
            </IconButton>
          </div>
          <textarea
            name="postContent"
            rows={5}
            cols={100}
            value={value}
            onChange={handleChange}
            placeholder={isWinFont === true ? t('type-win') : t('type-something')}
            className="peer min-h-[50px] md:min-h-[100px] h-auto w-[285px] rounded-2xl ml-[30px] resize-none dark:bg-[#4d6e94] bg-[#ebdbbe] px-4 py-4 text-md font-normal text-blue-gray-700 dark:text-white outline outline-0 focus:placeholder:text-[#a11d33] placeholder:text-secondaryText dark:placeholder:text-darkSecondaryText"
          />
          <RadioSelectBar
              id="range-bar"
              fontSize={fontSize}
              setFontSize={setFontSize}
              handleSliderChange={handleSliderChange}
              customClassName="w-[285px] ml-[30px] mt-1 mb-6"
          />
          <Divider sx={{ width: 315,bgcolor: 'white',marginLeft: 2 }} />
          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-5 text-center">
                {menuItems.map((item) => (
                  <motion.div whileHover={{ scale: 1.2 }} key={item.title} className='text-secondaryText dark:text-darkSecondaryText'>
                  <Link href={item.href} className={pathname == item.href ? activeLink : unactiveLink}>
                    {(item.href === pathname || item.locale === pathname) && (
                      <motion.span
                        layoutId="underline"
                        className="absolute top-full left-0 block h-[1px] bg-darkblue dark:bg-white w-full "
                      />
                    )}
                    {item.title}
                  </Link>
                </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
