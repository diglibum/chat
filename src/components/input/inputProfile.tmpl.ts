export default `
  <div class="input-profile">
    <input 
      id = {{ id }}
      data-id="{{ id }}"
      data-validation-type="{{ validationType }}"
      type="{{ type }}" 
      {{#if name}}
        name="{{ name }}"
      {{/if}} 
      {{#if required}}
        required
      {{/if}} 
      {{#if disabled}}
        disabled
      {{/if}}
      {{#if equal}}
        data-equal-to="{{ equal }}"
      {{/if}}
      value = "{{ value }}"
      class="input-profile__input" />
    <label for="{{ id }}" class="input-profile__label">{{ text }}</label>
    <div class="error-message input-profile__error-message hide">{{ errorMessage }}</div>
  </div>
`;
