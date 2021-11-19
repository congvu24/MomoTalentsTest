import useAuth from '@/hook/auth/useAuth';
import Photo from '@/model/photo.model';
import {logout} from '@/redux/reducer/auth.slice';
import {getPhotos, PhotoState} from '@/redux/reducer/photos.slice';
import {Layout} from '@/style/layout';
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';

const PhotosScreen = ({navigation}: {navigation: any}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const listPhoto = useSelector(
    (state: {photo: PhotoState}) => state.photo.list,
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    dispatch(getPhotos());
    setLoading(false);
  };

  const checkLogin = useAuth();

  useEffect(() => {
    if (checkLogin === false) {
      navigation.replace('Login');
    }
  }, [checkLogin]);

  const buildListItem = ({item}: {item: Photo}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Detail', {id: item.id});
      }}>
      <View style={[style.itemWrap]}>
        <Image source={{uri: item.thumbnailUrl}} style={[style.itemImage]} />

        <Text style={[style.itemTitle]} ellipsizeMode="tail" numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderList = query
    ? listPhoto.filter(item =>
        item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      )
    : listPhoto;
  return (
    <View style={[Layout.fullSize, Layout.defaultPadding, style.body]}>
      <TouchableOpacity
        onPress={() => {
          dispatch(logout());
        }}>
        <Text style={[style.title]}>Danh sách hình ảnh</Text>
      </TouchableOpacity>
      <View style={[style.inputWrap]}>
        <TextInput
          onChangeText={value => setQuery(value)}
          value={query}
          style={[style.input]}
          placeholder="Search..."
          placeholderTextColor="grey"
        />
        <Icon name="search" size={18} color="#000" />
      </View>
      <View>
        <FlatList
          data={renderList}
          keyExtractor={(item: Photo) => item.id.toString()}
          onRefresh={() => getData()}
          refreshing={isLoading}
          renderItem={buildListItem}
        />
      </View>
    </View>
  );
};

export default PhotosScreen;

const style = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    color: 'orange',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    padding: 6,
    paddingVertical: 10,
    // backgroundColor: '',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
  },
  itemTitle: {
    flex: 1,
    color: 'grey',
    fontSize: 18,
    fontWeight: '400',
  },
  inputWrap: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  input: {
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 5,
    flex: 1,
    padding: 8,
    fontSize: 16,
  },
});
