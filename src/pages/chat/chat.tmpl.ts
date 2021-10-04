export default
`
  <div class="chat-page">
    <div class="chat-page__aside">
      <div class="aside__header">
        {{ settingsLink }}
        {{ search }}
        <a href="/chat-add" data-popup="add-chat__popup" class="chat-page__link-button">
          Добавить чат
        </a>
      </div>
      <div class="aside-content">
        {{ list }}
      </div>
    </div>
    <div class="chat-page__content">
      <div class="chat-header">
        <div class="chat-header__avatar">
          {{#if chatAvatar }}
            <img src="{{ chatAvatar }}" alt="alt">
          {{/if}}
        </div>
        <h5 class="chat-header__title">{{ chatTitle }}</h5>
        <button type="button" class="chat-page__add-user" data-popup="add-user__popup">добавить пользователя в чат</button>
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
    {{ chatPopup }}
    {{ userPopup }}
  </div>
`;
