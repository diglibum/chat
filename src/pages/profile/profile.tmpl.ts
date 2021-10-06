export default
`
  <div class="profile-page">
    <div class="profile-page__aside">
      <a onClick="history.back()" class="arrow-button go-back"></a>
    </div>
    <div class="profile-page__content">
      <div class="profile-page__content-container">
        <div class="profile-page__avatar">
          {{#if avatar }}
            <img src="{{ avatar }}" alt="Аватар" class="profile-page__avatar-img">
          {{/if}}
            <div class="profile-page__avatar-overlay" data-popup="add-avatar__popup">Поменять аватар</div>
        </div>
      <h1 class="profile-page__header">{{ header }}</h1>
        {{ content }}
      </div>
    </div>
  </div>
  {{ popup }}
`;
