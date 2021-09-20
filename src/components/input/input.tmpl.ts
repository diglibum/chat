export default
`
  <div class="input {{ className }}">
    <input
      id="{{ id }}"
      data-id="{{ id }}"
      data-validation-type="{{ validationType }}"
      type="{{ type }}"
      {{#if name}}
        name="{{ name }}"
      {{/if}}
      class="input__input"
      {{#if required}}
        required
      {{/if}} />
    <label for="{{ id }}" class="input__label">{{ text }}</label>
    <div class="error-message input__error-message hide"></div>
  </div>
`;
