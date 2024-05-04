import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import RStack from './nav/RStack';
let client = new QueryClient();
export default function Main() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <QueryClientProvider client={client}>
        <RStack />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
