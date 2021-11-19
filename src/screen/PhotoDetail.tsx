import {
  clearActive,
  getPhotoDetail,
  PhotoState,
} from '@/redux/reducer/photos.slice';
import {Layout} from '@/style/layout';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const PhotoDetail = ({navigation, route}: {navigation: any; route: any}) => {
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const photo = useSelector(
    (state: {photo: PhotoState}) => state.photo.activePhoto,
  );

  useEffect(() => {
    getData(route.params.id);
  }, [route]);

  const getData = (id: number) => {
    setLoading(true);
    dispatch(getPhotoDetail({id}));
    setLoading(false);
  };

  const goBack = () => {
    dispatch(clearActive());
    navigation.goBack();
  };

  if (isLoading || !photo) {
    return (
      <View style={[Layout.fullSize, Layout.justifyContentCenter]}>
        <ActivityIndicator size={50} />
      </View>
    );
  }
  return (
    <View style={[Layout.fullSize, Layout.defaultPadding, style.body]}>
      <Text style={[style.title]}>{photo.title}</Text>
      <Image source={{uri: photo.thumbnailUrl}} style={[style.itemImage]} />
      <TouchableOpacity style={[style.button]} onPress={goBack}>
        <Text style={[style.buttonText]}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhotoDetail;

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
    width: '100%',
    height: '100%',
    flex: 1,
    marginVertical: 20,
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
  button: {
    backgroundColor: '#f57b56',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 16,
    marginTop: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});
