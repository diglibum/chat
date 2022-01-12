import { EventBus } from "./eventBus";
import { getValueFromPath } from "../utils";
interface State {
  [key: string]: State | unknown;
}

export const unAuthorizedState: State = {
  isAuthorized: false,
  user: null,
  token: null,
  chats: [],
  currentChat: {
    id: null,
    messages: [],
  },
  messages: [],
  lastMessage: null,
};

const initialState: State = {
  ...unAuthorizedState,
};

class Store {
  private static EVENTS = {
    FLOW_SDU: "flow:state-did-update",
  };

  private eventBus: () => EventBus;
  private _globalState: State;

  constructor() {
    const eventBus: EventBus = new EventBus();
    this.eventBus = () => eventBus;
    this._globalState = this._makeStateProxy(initialState);
  }

  registerEvent(listener: () => any, ctx: unknown = this) {
    this.eventBus().on(Store.EVENTS.FLOW_SDU, listener.bind(ctx));
  }

  getState(path?: string) {
    if (path) {
      return getValueFromPath(this._globalState, path);
    }
    return this._globalState;
  }

  setState(nextState: State) {
    if (!nextState) {
      return;
    }
    Object.assign(this._globalState, nextState);
  }

  _makeStateProxy(state: State): State {
    state = new Proxy(state, {
      set: (target, prop: string, value: unknown): boolean => {
        target[prop] = value;
        this.eventBus().emit(Store.EVENTS.FLOW_SDU, { ...target }, target);
        return true;
      },
      get: (target, prop: string): Function => {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      deleteProperty(): boolean {
        throw new Error("нет доступа");
      },
    });
    return state;
  }
}

export default new Store();
