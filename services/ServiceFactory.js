import { UserService } from "./UserService/UserService";

export class ServiceFactory {
  static contexts = new Map();

  static register(impl) {
    const service = ServiceFactory.contexts.get(impl.serviceName);
    if (service) return service;

    ServiceFactory.contexts.set(impl.serviceName, impl);
    return impl;
  }

  static use(serviceName) {
    const service = ServiceFactory.contexts.get(serviceName);
    if (service === undefined) {
      throw new Error("Service not found");
    }
    return service;
  }

  clear() {
    ServiceFactory.contexts.clear();
  }
}

export const register = () => {
  // register the services
  ServiceFactory.register(new UserService());
};
