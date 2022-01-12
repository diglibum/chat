export default `
    <div class="message {{ className }}">
        {{ content }}
        {{#if image }}
            <img src="{{ image }}" alt="image message" /> 
        {{/if}}
        <span class="message__time">{{ dateTime }}</span>
    </div>
`;
