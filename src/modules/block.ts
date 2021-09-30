import { EventBus } from "./EventBus";
import { Props } from "../types";
import { v4 as uuidv4 } from "uuid";
import { renderDOM, removeDOM } from "../utils";

export class Block {
    private static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_CDP: "flow:component-did-placed",
      FLOW_CDR: "flow:component-did-removed",
      FLOW_RENDER: "flow:render"
    };

    private _element: Node; // ссылка на Node
    private _meta: {
        tagName: string;
        props: Props;
    };

    state: {};
    private _id: string;
    protected props: Props;
    protected children: Record<string, Block>;
    private eventBus: () => EventBus;

    constructor (tagName: string = "div", props: Props) {
      const eventBus: EventBus = new EventBus();
      this._meta = {
        tagName,
        props
      };
      this._id = uuidv4();
      this.props = this._makePropsProxy(props);
      this.eventBus = () => eventBus;
      this._registerEvents(eventBus);
      eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents (eventBus: EventBus) {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDP, this._componentDidPlaced.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDR, this._componentDidRemoved.bind(this));
    }

    _createResources () {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    }

    init () {
      this._createResources();
      this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidPlaced () {
      this.componentDidPlaced();
    }

    componentDidPlaced () {}

    _componentDidRemoved () {
      this.componentDidPlaced();
    }

    componentDidRemoved () {}

    _componentDidMount () {
      this.componentDidMount();
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount () { }

    _componentDidUpdate (oldProps: Props, newProps: Props) {
      const response = this.componentDidUpdate(oldProps, newProps);
      if (!response) {
        return;
      }
      this._render();
    }

    componentDidUpdate (oldProps: Props, newProps: Props) {
      if (oldProps === newProps) {
        return true;
      }
    }

    setProps = (nextProps: Props) => {
      if (!nextProps) {
        return;
      }
      Object.assign(this.props, nextProps);
    };

    get element (): Node {
      return this._element;
    }

    _render () {
      const block = this.render();
      this._element = this._createDocumentElement(this._meta.tagName);
      this._element.appendChild(block);
      this._addEvents();
    }

    reRender () {
      const block = this.render();
      this._element.textContent = "";
      this._element.appendChild(block);
      this._addEvents();
    }

    render (): any {}

    toString (): string {
      const wrapper = document.createElement("div");
      wrapper.appendChild(this.getContent());
      return wrapper.innerHTML;
    }

    getContent () {
      return this.element;
    }

    show () {
      renderDOM(this);
      this.eventBus().emit(Block.EVENTS.FLOW_CDP);
    }

    hide () {
      removeDOM(this);
      this.eventBus().emit(Block.EVENTS.FLOW_CDR);
    }

    getId () {
      return this._id;
    }

    _makePropsProxy (props: Props): Props {
      const self = this;

      props = new Proxy(props, {
        set (target, prop: string, value: unknown): boolean {
          target[prop] = value;
          self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
          return true;
        },
        get (target, prop: string): Function {
          const value = target[prop];
          return typeof value === "function" ? value.bind(target) : value;
        },
        deleteProperty (): boolean {
          throw new Error("нет доступа");
        }
      });
      return props;
    }

    _createDocumentElement (tagName: string) {
      const element = document.createElement(tagName);
      return element;
    }

    _addEvents () {
      const { events = {} } = this.props;
      Object.keys(events).forEach(eventName => {
        (document.querySelector("#root") as HTMLElement).addEventListener(eventName, (e: Event) => {
          this._callEventFunction(e, events[eventName]);
        }, true);
      });
    }

    _callEventFunction (e: Event, eventFn: Function) {
      const target = e.target as HTMLElement;
      const dataId = target.getAttribute("data-id");

      if (target != null) {
        if (dataId === this._id) {
          e.preventDefault();
          eventFn.bind(this);
          eventFn(e);
        }
      }
    }

    _removeEvents () {
      const { events = {} } = this.props;
      Object.keys(events).forEach(eventName => {
        (document.querySelector("#root") as HTMLElement).removeEventListener(eventName, (e: Event) => {
          this._callEventFunction(e, events[eventName]);
        });
      });
    }
}
