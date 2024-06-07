'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import React from 'react';
import { usePathname } from 'next/navigation';

type SearchBarType = {
    searchValue: string;
    filterOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({
    searchValue,
    filterOnChange,
}: SearchBarType) => {
    const t = useTranslations('Index');
    const pathname = usePathname();

    return (
        <div className={`relative w-full sm:mr-4 sm:ml-4 mr-2 ml-2 ${pathname === '/' ? 'visible' : 'invisible'}`}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-1">
                <MagnifyingGlassIcon className="w-10 h-10 p-2 text-darkblue" />
            </span>
            <input
                value={searchValue}
                onChange={filterOnChange}
                className="w-full h-12 pl-12 py-2 pr-4 border border-none rounded-full  text-darkblue bg-secondary focus:outline-none focus:placeholder:text-[#a11d33] shadow"
                placeholder={t('search')}
                type="text"
            />
        </div>
    );
};

SearchBar.displayName = 'SearchBar';

export default SearchBar;
