export default
`
    <div class="popup {{ className }} 
    {{#if hidePopup }}    
        hide
    {{/if}}">
        <div class="popup__wrapper">
            <div class="popup__container">
                <div class="popup__header">
                    {{ title }}
                </div>
                <div class="popup__body">
                    {{ body }}
                </div>
            </div>
        </div>
    </div>
`
;
