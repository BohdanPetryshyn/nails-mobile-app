import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from '@ui-kitten/components';
import { Client } from '../../user/entities/client';
import { ClientsService } from '../../user/api/ClientsService';
import { UserDataUtils } from '../../user/entities/user-data';
import { UserUtils } from '../../user/entities/user';

export default function ({
  selectedEmail,
  onEmailSelect,
  ...autocompleteProps
}: {
  selectedEmail?: string;
  onEmailSelect: (email: string) => void;
} & AutocompleteProps) {
  const [results, setResults] = useState<Client[]>();
  const [resultsByEmail, setResultsByEmail] = useState<Map<string, Client>>();
  const [value, setValue] = useState<string>();

  const fetchResults = async (query: string) => {
    setResults(undefined);
    const results = await ClientsService.search(query);
    setResults(results);
    setResultsByEmail(UserUtils.indexByEmail(results));
  };

  const onChangeText = (query: string) => {
    setValue(query);
    fetchResults(query);
  };

  useEffect(() => {
    if (resultsByEmail && selectedEmail) {
      const selectedClient = resultsByEmail.get(selectedEmail);
      selectedClient &&
        setValue(UserDataUtils.getFullName(selectedClient.clientData));
    }
  }, [selectedEmail]);

  const onSelect = (index: number) => {
    if (results) {
      const selectedClient = results[index];
      setValue(UserDataUtils.getFullName(selectedClient.clientData));
      onEmailSelect(selectedClient.loginData.email);
    }
  };

  return (
    <Autocomplete
      value={value}
      onSelect={onSelect}
      onChangeText={onChangeText}
      {...autocompleteProps}
    >
      {results?.map((result, index) => (
        <AutocompleteItem
          title={UserDataUtils.getFullName(result.clientData)}
          key={index}
        />
      ))}
    </Autocomplete>
  );
}
