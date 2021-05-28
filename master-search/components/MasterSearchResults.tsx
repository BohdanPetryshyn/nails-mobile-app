import { List } from '@ui-kitten/components';
import MasterCard from './MasterCard';
import React, { useEffect, useState } from 'react';
import { Filter } from '../entities/Filter';
import { MasterSearchResult } from '../entities/MasterSearchResult';
import { MastersService } from '../../user/api/MastersService';
import ScreenLoader from '../../common/components/ScreenLoader';

export default function ({
  filter,
  onMasterPress,
}: {
  filter: Filter;
  onMasterPress: (email: string) => void;
}) {
  const [searchResults, setSearchResults] = useState<
    MasterSearchResult[] | undefined
  >([]);

  useEffect(() => {
    async function fetchSearchResult() {
      setSearchResults(undefined);
      const searchResults = await MastersService.search(filter);

      setSearchResults(searchResults);
    }
    fetchSearchResult();
  }, [filter]);

  return searchResults === undefined ? (
    <ScreenLoader />
  ) : (
    <List
      data={searchResults}
      renderItem={searchResult => (
        <MasterCard
          master={searchResult.item}
          key={searchResult.index}
          onMasterPress={onMasterPress}
        />
      )}
    />
  );
}
