/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react';
import React from 'react';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginButton,
} from 'react-native-fbsdk-next';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LoginButton
        onLoginFinished={(error, result: any) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then((data: any) => {
              let accessToken = data.accessToken;
              console.log(accessToken.toString());

              const responseInfoCallback = (error: any, result: any) => {
                if (error) {
                  console.log(error);
                  console.log('Error fetching data: ' + error.toString());
                } else {
                  console.log(result);
                  console.log('Success fetching data: ' + result.toString());
                }
              };

              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken: accessToken,
                  parameters: {
                    fields: {
                      string: 'email,name,first_name,middle_name,last_name',
                    },
                  },
                },
                responseInfoCallback,
              );

              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
