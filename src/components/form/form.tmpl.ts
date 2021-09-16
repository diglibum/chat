export default
`
  <form class="form" data-id="{{ id }}" name="{{ name }}" autocomplete="{{ autocomplete }}" novalidate >
    {{ body }}
  </form>
`;

// export default
// `
//   <form class="form" name="{{ name }}" autocomplete="{{ autocomplete }}" data-id="{{ id }}"
//     {{#if novalidate}}
//       novalidate
//     {{/if}}
//   >
//     {{ body }}
//   </form>
// `;
