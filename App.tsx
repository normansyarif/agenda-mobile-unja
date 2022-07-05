import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { LocaleConfig, Agenda } from 'react-native-calendars';

LocaleConfig.locales['id'] = {
  monthNames: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'],
  dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
  dayNamesShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
};
LocaleConfig.defaultLocale = 'id';

type Post = {
  id: number;
  title: string;
  time: string;
  date: string;
  lokasi: string;
};

const App: React.FC = () => {
  const [items, setItems] = useState<{ [key: string]: Post[] }>({});

  useEffect(() => {
    // run once

    const getData = async () => {
      const response = await fetch(
        'http://10.10.168.207/agenda.json',
      );
      const data: Post[] = await response.json();

      const mappedData = data.map((post, index) => {
        return {
          ...post,
        };
      })

      const reduced = mappedData.reduce(
        (acc: { [key: string]: Post[] }, currentItem) => {
          const { ...coolItem } = currentItem;
          const { date } = currentItem;

          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(coolItem);

          return acc;
        },
        {},
      );

      console.log(reduced);

      setItems(reduced);
    };

    getData();
  }, []);

  const renderItem = (item: Post) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.lokasi}>{item.lokasi}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.nama}>Jefri Marzal</Text>
        <Text style={styles.logout}>Logout</Text>
      </View>
      <Agenda items={items} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1
  },
  header: {
    backgroundColor: '#00BBF2',
    flexDirection: "row"
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'left',
  },
  logout: {
    color: 'white',
    flex: 1,
    textAlign: 'right',
    alignSelf: 'center',
    marginRight: 10
  },
  nama: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    padding: 10
  },
  time: {
    marginTop: 10,
    fontSize: 13,
    fontStyle: 'italic',
    color: 'grey'
  },
  lokasi: {
    marginTop: 10
  },
  itemContainer: {
    backgroundColor: 'white',
    margin: 5,
    padding: 10,
    borderRadius: 15,
    flex: 1,
  },
});

export default App;
