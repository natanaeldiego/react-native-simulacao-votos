## Voting simulation using React Native

## Simulação de votos usando o React Native

## Screen Preview

## Preview da tela

![Hook Preview](https://raw.githubusercontent.com/natanaeldiego/react-native-simulacao-votos/master/img/Screenshot.png)

## Install at local  

## Instale no local  
Open Terminal, then type command:  
Abra o Terminal e digite o comando:  
> git clone https://github.com/natanaeldiego/react-native-simulacao-votos.git

Go to project folder:  
Vá para a pasta do projeto:  
> cd react-native-simulacao-votos

Type following command:
Digite o seguinte comando:
> npm install  

You must have ANDROID_HOME environtment variable, to check if you already have, type in your terminal:  
Você deve ter a variável de ambiente ANDROID_HOME, para verificar se você já possui, digite seu terminal:  
> echo $ANDROID_HOME  

If blank, you can read at / Se estiver em branco, você pode ler AQUI [HERE](https://goo.gl/XSBmwE)  

Make sure you have already installed React Native globally by running this command:  
Verifique se você já instalou o React Native globalmente executando este comando:  
> sudo npm install -g react-native-cli

At this point, you should be able to run the project.
Neste ponto, você deve poder executar o projeto.
To run your project on your device/emulator at Debug configuration, type:  
Para executar seu projeto no seu dispositivo / emulador na configuração Debug, digite:  
> npm run android-dev  

Or if you want to run at iOS simulator, run:  
Ou se você deseja executar no simulador do iOS, execute:  
> npm run ios-dev
 
If you have error message like / Se você tiver uma mensagem de erro como `Execution failed for task ':app:dexDebug'.` run this on your terminal:  
execute isto no seu terminal:  
> npm run android-clean

To build .apk file just type:  
Para criar o arquivo .apk, basta digitar:  
> npm run android-release  

You must sign .apk with keystore, to do this just type in your terminal:  
Você deve assinar .apk com o keystore, para isso basta digitar no seu terminal:  
> npm run android-signer

The .apk file is located at / O arquivo .apk está localizado em `react-native-simulacao-votos/android/app/build/outputs/apk/app-release-unsigned.apk`

##  Available Command  

## Comandos disponíveis  

| npm run ... | Description / Descrição |
| --- | --- |
| adb-reverse | Reset port ADB to tcp:8081 / Redefina a porta ADB para tcp: 8081 |
| ios-dev| Run iOS project / Execute o projeto no iOS |
| ios-bundle | Bundle with entry file index.js / Pacote com arquivo de entrada index.js |
| ios-build  | Run ios project with "Release" configuration / Execute o projeto ios com a configuração "Release" |
| android-clean | Fix building android if preDexDebug error / Corrigir construção de android se o erro preDexDebug |
| android-build-debug | Build android .apk with "Debug" configuration / Crie android .apk com a configuração "Debug" |
| android-release  | Build android .apk with "Release" configuration / Build android .apk with "Release" configuration |
| android-signkey  | Generate keystore android / Gerar android keystore  |
| android-signer | To sign app-release-unsigned.apk with random keystore / Para assinar app-release-unsigned.apk com keystore aleatório |
| android-dev | Run android development-mode on simulator / Execute o modo de desenvolvimento android no simulador |
| android-bundle | Bundle with entry file index.android.js / Pacote com arquivo de entrada index.js |

## Copyright and License

Copyright 2013-2020 Blackrock Digital LLC. Code released under the [MIT](https://github.com/BlackrockDigital/startbootstrap-resume/blob/gh-pages/LICENSE) license.
