export default `
    <li class="chat-list-item">
        <div class="chat-list-item__avatar">
            {{#if avatar }}
                <img src ="{{ avatar }}" alt="{{ title }}" />
            {{/if}}
        </div>
        <div class="chat-list-item__content">
            <h5 class="chat-list-item__title">{{ title }}</h5>
            <div class="chat-list-item__message">{{ message }}</div>
        </div>
        <div class="chat-list-item__info">
            <span class="chat-list-item__time">{{ time }}</span>
            {{#if unreadCount }}
                <span class="chat-list-item__badge">{{ unreadCount }}</span>
            {{/if}}
        </div>
    </li>     
`;
