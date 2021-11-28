export const noteContainer = () => {
  return `<div class="note-wrapper">
    <button class="open-button" id="open-notes" onclick="openForm()">My Notes</button>
    <div class="note-popup" id="myForm">
        <form class="note-container">
            <div id="notes" tabindex=0 style="overflow: auto" contenteditable="true" onfocusout="noteFocusHandler()">
                
            </div>
            <fieldset>
                <button  type="button" class="button" onclick="document.execCommand('italic',false,null);"
                    title="Italicize Highlighted Text"><i>I</i>
                </button>
                <button  type="button" class="button" onclick="document.execCommand( 'bold',false,null);"
                    title="Bold Highlighted Text"><b>B</b>
                </button>
                <button  type="button" class="button" onclick="document.execCommand( 'underline',false,null);"><u>U</u>
                </button>
            </fieldset>
            <button  type="button" class="btn cancel" onclick="closeForm()">Close</button>
        </form>
    </div>
</div>`;
};
