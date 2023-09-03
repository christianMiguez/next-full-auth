declare global {
  declare module globalThis {
    var _mongoClientPromise: any;
  }
}

export {};
