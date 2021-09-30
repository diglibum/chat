export default
`
  <div class="profile-view">
    {{ mailInput }}
    {{ loginInput }}
    {{ firstNameInput }}
    {{ secondNameInput }}
    {{ displayNameInput }}
    {{ phoneInput }}
  </div>
  <div class="profile-view__links">    
    <div class="profile-view__link">{{ profileEditLink }}</div>
    <div class="profile-view__link">{{ passwordEditLink }}</div>
    <div class="profile-view__link profile-view__link_logout">Выйти</div>
  </div>
`;
