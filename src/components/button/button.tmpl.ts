export default
`
  <button 
    data-id="{{ id }}"
    type="{{ type }}"
    class="button {{ className }}"
    {{#if disabled }}
      disabled
    {{/if}}
    >
    {{ text }}
  </button>
`;
