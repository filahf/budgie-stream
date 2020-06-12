# stream-to-sonos
#### TODO
- [ ] Switch from sockets to IPC to improve perfomance
- [ ] React frontend
- [ ] Refraction
- [ ] Documentation
- [ ] Testing
##### Run instructions
```
cd electron-app
yarn install
yarn start
```
#### Common errors
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
