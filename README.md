# Les Loups de mer - WebGL project DMII1

The goal of this project is to create an interactive 3D experience using WebGL. Our mandatory theme is the **Greenwashing** in the agro-food sector targeting 65-75 years old people.

We're using Vue.js 3 & Three.js as main technology to develop this experience.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Git organization

There is multiple branches to use :

- `main` is the release branch
- `dev` features to implement
  - Divided in branches per feature with naming `<author>/<feat_name>`
- `models` for 3D models validation & integration. To merge in `dev` when it's ok

## Project Structure

```shell
.src
├── assets
│   └── js/webgl
│       └── main (webgl .ts files)
│       └── models (.glb & .fbx files)
│   └── base.css (style file)
├── components (vue components)
│   └── /*.vue
├── router
│   └── index.ts (containing all vue routes)
├── views (vue pages)
│   └── /*.vue
├── App.vue
├── main.ts
```
