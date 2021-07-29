export default
`
  <div class="input {{ className }}">
    <input
      id="{{ id }}"
      data-id="{{ id }}"
      data-validation-type="{{ validationType }}"
      type="{{ type }}" 
      name="{{ name }}" 
      class="input__input"
      required={{ required }} />
    <label for="{{ id }}" class="input__label">{{ text }}</label>
    <div class="error-message input__error-message hide"></div>
  </div>
`;
