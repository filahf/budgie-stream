
<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo, twitter_handle, email
-->



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/filahf/budgie-stream">
    <img src="images/logo.png" alt="Logo" width="160" height="160">
  </a>

  <h3 align="center">Budgie Stream</h3>

  <p align="center">
    Stream system output to your Sonos devices
    <br />
    <a href="https://github.com/filahf/budgie-stream/releases"><strong>Download »</strong></a>
    <br />
    <br />
    <a href="#usage">Usage</a>
    ·
    <a href="https://github.com/filahf/budgie-stream/issues">Report Bug</a>
    ·
    <a href="https://github.com/filahf/budgie-stream/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Dev Environment](#dev-environment)
  * [Installation](#installation)
  * [Common Errors](#common-errors)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

The project is built using Electron/React/Express. The image above show the simplified flow of audio data, from capture to playback on your Sonos device.

### Built With

* Electron
* React
* Express
* [node-sonos]()
* [nicercast]()



<!-- GETTING STARTED -->
## Dev Environment

To get a local copy up and running follow these simple steps.

### Installation
 
1. Clone the repo
```sh
git clone https://github.com/filahf/budgie-stream.git
```
2. Install NPM packages
```sh
yarn install
```
3. Start
```sh
cd budgie-stream/
yarn start
```
#### Common Errors
<details>
  <summary>Node module was built with the wrong version</summary>
  Run electron rebuild

```sh
$(npm bin)/electron-rebuild
```

Or if you're on Windows:

```sh
.\node_modules\.bin\electron-rebuild.cmd
```
</details>



<!-- USAGE EXAMPLES -->
## Usage

Usage guide TBD



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/filahf/budgie-stream/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Filip Åhfelt - filipahfelt.se

Project Link: [https://github.com/filahf/budgie-stream](https://github.com/filahf/budgie-stream)




[product-screenshot]: images/flowdiagram.png


