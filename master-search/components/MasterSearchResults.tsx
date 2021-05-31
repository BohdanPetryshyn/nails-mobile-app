import { List } from '@ui-kitten/components';
import MasterCard from './MasterCard';
import React, { useEffect, useState } from 'react';
import { Filter } from '../entities/Filter';
import { MasterSearchResult } from '../entities/MasterSearchResult';
import { MastersService } from '../../user/api/MastersService';
import ScreenLoader from '../../common/components/ScreenLoader';
import { AppointmentCreateRequest } from '../../user/entities/appointment';
import { selectUserEmail } from '../../user/store/slice';
import { useAppSelector } from '../../common/store/hooks';

export default function ({
  filter,
  onMasterPress,
}: {
  filter: Filter;
  onMasterPress: (createRequest: AppointmentCreateRequest) => void;
}) {
  const clientEmail = useAppSelector(selectUserEmail)!;
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
      renderItem={item => (
        <MasterCard
          master={item.item}
          key={item.index}
          onPress={() =>
            onMasterPress({
              masterEmail: item.item.masterEmail,
              clientEmail,
              from: filter.from.toISOString(),
              services: item.item.availableServices,
            })
          }
        />
      )}
    />
  );
}
