import LoadingModal from '@/components/LoadingModal';
import useAuth from '@/hook/auth/useAuth';
import {AuthState, userLogin} from '@/redux/reducer/auth.slice';
import {Layout} from '@/style/layout';
import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';

const LoginScreen = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const isLoading = useSelector(
    (state: {auth: AuthState}) => state.auth.isLoading,
  );

  const dispatch = useDispatch();

  const validateEmail = (value: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(value) === false) {
      setEmailValid(false);
      return false;
    } else {
      setEmailValid(true);
      return true;
    }
  };

  const login = async () => {
    if (validateEmail(email) && password) {
      dispatch(userLogin({email: email, password: password}));
    } else {
      Toast.show({
        type: 'error',
        text1: 'Lỗi!',
        text2: 'Bạn phải nhập đầy đủ thông tin đăng nhập',
      });
    }
  };

  const checkLogin = useAuth();

  useEffect(() => {
    if (checkLogin === true) {
      navigation.replace('Photo');
    }
  }, [checkLogin]);

  return (
    <View style={[style.wrapper]}>
      <LoadingModal isLoading={isLoading} />
      <View style={[Layout.fullSize, Layout.defaultPadding, style.body]}>
        <View style={[style.headerWrap]}>
          <Text style={[style.title]}>Wellcome back</Text>
          <Text style={[style.subtitle]}>Please enter your account here</Text>
        </View>
        <View>
          <KeyboardAvoidingView>
            <View style={[style.inputWrap, !emailValid ? style.invalid : null]}>
              <Icon name="envelope-o" size={18} color="#000" />
              <TextInput
                onChangeText={value => setEmail(value)}
                value={email}
                style={[style.input]}
                placeholder="Email"
                placeholderTextColor="grey"
                keyboardType="email-address"
              />
            </View>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView>
            <View style={[style.inputWrap]}>
              <Icon name="lock" size={18} color="#000" />
              <TextInput
                secureTextEntry={true}
                onChangeText={value => {
                  setPassword(value);
                }}
                value={password}
                style={[style.input]}
                placeholder="Password"
                placeholderTextColor="grey"
              />
            </View>
          </KeyboardAvoidingView>
        </View>
        <View>
          <TouchableOpacity style={[style.button]} onPress={login}>
            <Text style={[style.buttonText]}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const style = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  body: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  headerWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: 'orange',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: 'grey',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  inputWrap: {
    // backgroundColor: 'red',
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
    backgroundColor: '#fa744b',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 16,
    marginTop: 30,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  invalid: {
    borderColor: 'red',
  },
});
