# legenddigitaliton

[![Build Status](https://travis-ci.org/legenddigital/legenddigitaliton.png?branch=master)](https://travis-ci.org/legenddigital/legenddigitaliton)
[![ISC License](http://img.shields.io/badge/license-ISC-blue.svg)](http://copyfree.org)

legenddigitaliton is a cross-platform GUI for legenddigital written in node.js using
Electron.

## Installation

Currently legenddigitaliton is available on Windows, Linux, and macOS.

legenddigitaliton will NOT use or in any way disrupt the wallet file you may
already be using at this time.

Download the legenddigitaliton release for your operating system on [legenddigital/legenddigital-binaries](https://github.com/legenddigital/legenddigital-binaries/releases).

On macOS, Ubuntu (14.04 and later), and recent Debians, there should be
no additional dependencies needed.

On Fedora or similar distros you may need to install the libXScrnSaver
package if you see this error:
```
error while loading shared libraries: libXss.so.1
```

You can install this on a recent Fedora with the command:

```bash
sudo dnf -y install libXScrnSaver
```

On linux you will need to decompress the package:
```bash
tar -xvzf legenddigitaliton-X.X.X.tar.gz
```
and then run the file:
```bash
./legenddigitaliton
```

This will start lddld and lddlwallet for you.

On macOS, double-click the .dmg file, drag the .app to your
Applications folder.  Double click on legenddigitaliton.app to start.

You can also install via [brew cask](https://caskroom.github.io):
```bash
brew cask install legenddigitaliton
```

From there follow the on screen instructions to setup your wallet.

### Options

When running a release version, there are a few options available.

To see additional debug information (including the output of lddld and lddlwallet) run:

```
legenddigitaliton --debug
```

To pass additional arguements to lddlwallet (such as to increase the logging level run:

```
legenddigitaliton --extrawalletargs='-d=debug'
```

## Developing

Due to potential compatibility issues, for now, all work should be
done with electron 1.4.15.

You need to install lddld, lddlwallet and lddlctl.

- [lddld/lddlctl installation instructions](https://github.com/legenddigital/lddld#updating)
- [lddlwallet installation instructions](https://github.com/legenddigital/lddlwallet#installation-and-updating)

This has been tested on Linux and OSX.

Adjust the following steps for the paths you want to use.

``` bash
mkdir code
cd code
git clone https://github.com/legenddigital/legenddigitaliton.git
cd legenddigitaliton
yarn
mkdir bin/
cp $GOPATH/bin/lddl* bin/
yarn dev
```

## Setting up your development environment
The following steps will help you configure your legenddigitaliton development environment and reduce future startup times.

### Wallet
When you launch legenddigitaliton, you will be prompted to select a wallet to use. Select your wallet or create a new one using the in-app wizard. Be sure to save your seed and make your password memorable.

### Legenddigital Node
It will be helpful to you to run the Legenddigital node in a separate process and simply attach to it between legenddigitaliton restarts. In order to see the advanced daemon configuration options you open your ```config.json``` and set the ```daemon_start_advanced``` flag to ```true``` as follows:

```"daemon_start_advanced": true,```

Note: Your config.json file is located in the following directory(s)

Windows - ```C:\Users\<your-username>\AppData\Local\legenddigitaliton\config.json```

OSX - ```$HOME/Library/Application\ Support/legenddigitaliton/config.json```

Linux - ```~/.config/legenddigitaliton/config.json```

Run the following to start the Legenddigital daemon in a standalone terminal window:

Windows - ```lddld --testnet -u USER -P PASSWORD --rpclisten=127.0.0.1:19119 --rpccert=C:\Users\<username>\AppData\Local\Lddld\rpc.cert```

OSX - ```lddld --testnet -u USER -P PASSWORD --rpclisten=127.0.0.1:19119 --rpccert=$HOME/Library/Application\ Support/Lddld/rpc.cert```

Linux - ```lddld --testnet -u USER -P PASSWORD --rpclisten=127.0.0.1:19119 --rpccert=~/.lddld/rpc.cert```

You can connect to this daemon in ```Advanced Startup => Different Local Daemon Location``` and input the parameters requested. Note that all the parameters needed are present in the command you used to start the node for your respective system.

### Windows

On windows you will need some extra steps to build grpc.  This assumes
you are using msys2 with various development tools (copilers, make,
ect) all installed.

Install node from the official package https://nodejs.org/en/download/
and add it to your msys2 path.  You must install the same version of node as required for Linux and OSX (6.9.5).

Install openssl from the following site:
https://slproweb.com/products/Win32OpenSSL.html

From an admin shell:

```bash
npm install --global --production windows-build-tools
```

Then build grpc as described above.

## Building the package

You need to install lddld, lddlwallet and lddlctl.

- [lddld/lddlctl installation instructions](https://github.com/legenddigital/lddld#updating)
- [lddlwallet installation instructions](https://github.com/legenddigital/lddlwallet#installation-and-updating)

To build a packaged version of legenddigitaliton (including a dmg on OSX and
exe on Windows), follow the development steps above.  Then build the
lddl command line tools:

```bash
cd code/legenddigitaliton
mkdir bin
cp `which lddld` bin/
cp `which lddlctl` bin/
cp `which lddlwallet` bin/
npm install
npm run package
```

## Building release versions

### Linux

You need to make sure you have the following packages installed for the building to work:
- icns2png
- graphicsmagick
- rpm-build

```bash
npm run package-linux
```

After it is finished it will have the built rpm, deb and tar.gz in the releases/ directory.

## Docker

A docker file for building legenddigitaliton is also provided.  With no options it builds for linux on amd64 although it is possible to attempt OSX or arm builds (neither of which have been tested).

```
$ ./build-docker.sh <OS> <ARCH>
```

## Contact

If you have any further questions you can find us at:

- irc.freenode.net (channel #legenddigital)
- [webchat](https://webchat.freenode.net/?channels=legenddigital)
- forum.legenddigital.org
- legenddigital.slack.com

## Issue Tracker

The
[integrated github issue tracker](https://github.com/legenddigital/legenddigitaliton/issues)
is used for this project.

## License

legenddigitaliton is licensed under the [copyfree](http://copyfree.org) ISC License.
