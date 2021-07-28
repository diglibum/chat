export default
`
  <div class="input-profile">
    <input 
      id = {{ id }}
      data-id="{{ id }}"
      data-validation-type="{{ validationType }}"
      type="{{ type }}" 
      name="{{ name }}" 
      required="{{ required }}"
      value = "{{ value }}"
      {{#if disabled}}
          disabled
      {{/if}}
      class="input-profile__input" />
    <label for="{{ id }}" class="input-profile__label">{{ text }}</label>
    <div class="error-message input-profile__error-message hide">{{ errorMessage }}</div>
  </div>
`;
