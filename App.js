import { StyleSheet } from 'react-native';
import { AuthProvider, useAuth } from './app/store/AuthStore';
import AppStackNavigator from './app/stack/AppStack';
import AuthStackNavigator from './app/stack/AuthStack';
import { NavigationContainer } from '@react-navigation/native';

const MainNavigator = () => {
  const { isLogin } = useAuth();

  return isLogin ? <AppStackNavigator /> : <AuthStackNavigator />;
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
