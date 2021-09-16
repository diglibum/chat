import { Templator } from "../../modules/Templator";
import chatPageTmpl from "./chat.tmpl";
import "./chat.scss";
import { Block } from "../../modules/block";
import { Props } from "../../types/props";
import { SearchForm } from "./components/searchForm";
import { ChatList } from "./components/chatList";
import { ChatItem } from "./components/chatItem";

export class ChatPage extends Block {
  chatListData: any = [];

  constructor (props: Props = {}) {
    super("div", props);
  }

  componentDidMount () {
    this.chatListData = [
      {
        id: 123,
        title: "Андрей",
        avatar: "https://sun9-23.userapi.com/c625826/v625826466/1ba40/SWIeP1wT5DA.jpg",
        unread_count: 2,
        last_message: {
          user: {
            first_name: "Petya",
            second_name: "Pupkin",
            avatar: "https://pbs.twimg.com/media/Ea65XdZUcAAzH87.jpg",
            email: "my@email.com",
            login: "userLogin",
            phone: "8(911)-222-33-22"
          },
          time: "2020-01-02T10:49:22.000Z",
          content: "Изображение"
        }
      },
      {
        id: 124,
        title: "my-chat2",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREuozuvzB6l_lBK2nbSx-SH5pZ-liPujKBCQ&usqp=CAU",
        unread_count: 5,
        last_message: {
          user: {
            first_name: "Petya",
            second_name: "Pupkin",
            avatar: "https://pbs.twimg.com/media/Ea65XdZUcAAzH87.jpg",
            email: "my@email.com",
            login: "userLogin",
            phone: "8(911)-222-33-22"
          },
          time: "2020-01-02T14:22:22.000Z",
          content: "this is message content"
        }
      }
    ];
  }

  render () {
    const searchForm = new SearchForm({
      placeholder: "Поиск"
    });

    const chats = this.chatListData.reduce((acc: string, chat: any) => {
      const chatItem = new ChatItem(chat).toString();

      return acc.concat(chatItem + "\n");
    }, "");

    const chatList = new ChatList({ items: chats }).toString();
    const tmpl = new Templator(chatPageTmpl);

    const context = {
      list: chatList,
      search: searchForm,
      content: "Страница в разработке"
    };

    return tmpl.compile(context);
  }
}
