export default
`
  <div class="chat-page">
    <div class="chat-page__aside">
      <div class="aside__header">
        <a href="/settings" class="aside__header-link">Профиль</a>
        {{ search }}
      </div>
      <div class="aside-content">
        {{ list }}
      </div>
    </div>
    <div class="chat-page__content">
      <div class="chat-header">
        <img src="https://pbs.twimg.com/media/Ea65XdZUcAAzH87.jpg" alt="alt" class="chat-header__avatar">
        <h5 class="chat-header__title">Вадим</h5>
        <span class="chat-header__menu"></span>
      </div>
      <div class="chat-body">
        <span class="chat-body__date">19 июня</span>
        <ul class="chat-body__message-list">
          <li class="message message_text">
            Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. 
            <br /><br />
            Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
            <span class="message__time">11:56</span>
          </li>
          <li class="message message_image">
            <img src="https://vybrat-tekhniku.ru/wp-content/uploads/2021/06/camera-4555440_1280.jpg" alt="msim">
            <span class="message__time">11:56</span>
          </li>
          <li class="message message_text message_my message_received">
            Сообщение получено
            <span class="message__time">11:00</span>
          </li>
          <li class="message message_text message_my message_sended">
            Сообщение отправлено!
            <span class="message__time">12:00</span>
          </li>
          <li class="message message_text message_my message_error">
            Сообщение не отправлено!
            <span class="message__time">13:00</span>
          </li>
        </ul>
      </div>
      <div class="chat-footer">
        <div class="chat-footer__attach"></div>
        <input type="text" class="chat-footer__input" placeholder="Сообщение"/>
        <button type="submit" class="chat-footer__send"></button>
      </div>
    </div>
  </div>
`;
