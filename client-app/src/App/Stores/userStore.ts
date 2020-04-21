import { action, computed, configure, observable } from "mobx";
import { IUser, IUserFormValues } from "../Models/user";
import agent from "../Api/agent";
import { RootStore } from "./rootStore";

configure({ enforceActions: "always" });

export default class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      this.user = user;
    } catch (error) {
      console.error(error);
    }
  };
}
