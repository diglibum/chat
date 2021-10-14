export default `
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
        <span class="chat-header__menu" data-popup="chat-menu__popup"></span>
      </div>
        {{ content }}
      {{ messageForm }}
    </div>
    {{ chatPopup }}
    {{ userPopup }}
    {{ deleteUserPopup }}
    {{ chatMenu }}
  </div>
`;
