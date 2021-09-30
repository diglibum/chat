export default
`
  <div class="chat-page">
    <div class="chat-page__aside">
      <div class="aside__header">
        {{ settingsLink }}
        {{ search }}
        <a href="/chat-add" class="chat-page__link-button">
          Добавить чат
        </a>
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
        {{ content }}
      </div>
      <div class="chat-footer">
        <div class="chat-footer__attach"></div>
        <input type="text" class="chat-footer__input" placeholder="Сообщение"/>
        <button type="submit" class="chat-footer__send"></button>
      </div>
    </div>
    {{ popup }}
  </div>
`;
