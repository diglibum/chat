export default
`
    <li class="chat-list-item">
        <img src ="{{ avatar }}" alt="{{ title }}" class="chat-list-item__avatar"/>
        <div class="chat-list-item__content">
            <h5 class="chat-list-item__title">{{ title }}</h5>
            <div class="chat-list-item__message">{{ message }}</div>
        </div>
        <div class="chat-list-item__info">
            <span class="chat-list-item__time">{{ time }}</span>
            <span class="chat-list-item__badge">{{ unreadCount }}</span>
        </div>
    </li>     
`;
