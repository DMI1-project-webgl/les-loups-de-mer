import type Element from "./Element";

export default interface AssetsUrl {
    models: Array<Element> | Array<null>;
    textures: Array<Element> | Array<null>;
    envs: Array<string> | Array<null>;
    hdr: Array<string> | Array<null>;
  }