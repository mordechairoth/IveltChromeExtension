function hasNestedQuotes(text){
    let firstQ = text.indexOf('[quote=');
    if(firstQ === -1){
           return false;
    }
    let secondQ = text.indexOf('[quote=', firstQ + 1);
    if(secondQ === -1){
           return false;
    }
      return true;
}

function removeNestedQuotes(text){

    let nestedQuote = text.substring(text.lastIndexOf('[quote="'), text.indexOf('[/quote]', text.lastIndexOf('[quote="')) + 8);
    let modifiedText = text.replace(nestedQuote, "");

    if(hasNestedQuotes(modifiedText)){
        return removeNestedQuotes(modifiedText);
    }
    
    return modifiedText;
}

let messageArea = document.querySelector('#message');
let text = messageArea?.innerHTML??"";
let onlyLastQuote = window.location.href.includes('last=true');

if(messageArea && onlyLastQuote && hasNestedQuotes(text)){
    text = removeNestedQuotes(text);
    messageArea.innerHTML = text;
}


