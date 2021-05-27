import React, { useState } from 'react';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import { Filter } from '../entities/Filter';
import { StyleSheet, View } from 'react-native';
import FilterSelect from '../components/FilterSelect';
import { Divider } from '@ui-kitten/components';

export default function () {
  const [filter, setFilter] = useState<Filter>({});

  return (
    <SafeAreaLayout style={styles.container}>
      <View style={styles.header}>
        <FilterSelect filter={filter} onFilterChange={setFilter} />
      </View>
      <Divider />
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
  },
});
