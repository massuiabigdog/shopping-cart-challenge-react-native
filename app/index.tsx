import { registerRootComponent } from "expo";

import { AppNavigation } from "./config/Navigation";
import { UserProvider } from './context';
import { LogBox } from 'react-native';

import { NativeBaseProvider,   } from "native-base";

function App() {
  LogBox.ignoreAllLogs();//Ignore all log notifications



  return (
    <NativeBaseProvider>
        <UserProvider>
          <AppNavigation />
        </UserProvider>
    </NativeBaseProvider>
  );
}

export default registerRootComponent(App);