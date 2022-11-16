import { store } from "../slices/store";

export class Base {
  constructor(serviceName) {
    this.name = serviceName;
    this.dispatch = store.dispatch;
  }

  get serviceName() {
    return this.name;
  }
  get rootState() {
    return store.getState();
  }
}
