function hasNestedQuotes(text) {
	let firstQ = text.indexOf("[quote=");
	if (firstQ === -1) {
		return false;
	}
	let secondQ = text.indexOf("[quote=", firstQ + 1);
	if (secondQ === -1) {
		return false;
	}
	return true;
}

function removeNestedQuotes(text) {
	let nestedQuote = text.substring(
		text.lastIndexOf('[quote="'),
		text.indexOf("[/quote]", text.lastIndexOf('[quote="')) + 8
	);
	let modifiedText = text.replace(nestedQuote, "");

	if (hasNestedQuotes(modifiedText)) {
		return removeNestedQuotes(modifiedText);
	}

	return modifiedText;
}

let onlyLastQuote = window.location.href.includes("last=true");
if (onlyLastQuote) {
	let messageArea = document.querySelector("#message");
	let text = messageArea.innerHTML;
	if (hasNestedQuotes(text)) {
		text = removeNestedQuotes(text);
		messageArea.innerHTML = text;
	}
}

function lastaddquote(post_id, username, l_wrote) {
	var message_name = 'message_' + post_id;
	var theSelection = '';
	var divarea = false;
	var i;

	if (l_wrote === undefined) {
		// Backwards compatibility
		l_wrote = 'wrote';
	}

	if (document.all) {
		divarea = document.all[message_name];
	} else {
		divarea = document.getElementById(message_name);
	}

	// Get text selection - not only the post content :(
	// IE9 must use the document.selection method but has the *.getSelection so we just force no IE
	if (window.getSelection && !is_ie && !window.opera) {
		theSelection = window.getSelection().toString();
	} else if (document.getSelection && !is_ie) {
		theSelection = document.getSelection();
	} else if (document.selection) {
		theSelection = document.selection.createRange().text;
	}

	if (theSelection === '' || typeof theSelection === 'undefined' || theSelection === null) {
		if (divarea.innerHTML) {
			theSelection = divarea.innerHTML.replace(/<br>/ig, '\n');
			theSelection = theSelection.replace(/<br\/>/ig, '\n');
			theSelection = theSelection.replace(/&lt\;/ig, '<');
			theSelection = theSelection.replace(/&gt\;/ig, '>');
			theSelection = theSelection.replace(/&amp\;/ig, '&');
			theSelection = theSelection.replace(/&nbsp\;/ig, ' ');
		} else if (document.all) {
			theSelection = divarea.innerText;
		} else if (divarea.textContent) {
			theSelection = divarea.textContent;
		} else if (divarea.firstChild.nodeValue) {
			theSelection = divarea.firstChild.nodeValue;
		}
	}
	if (theSelection) {
		if (bbcodeEnabled) {
			let text = '[quote="' + username + '"]' + theSelection + '[/quote]'
			insert_text(removeNestedQuotes(text));
		} else {
			insert_text(username + ' ' + l_wrote + ':' + '\n');
			var lines = split_lines(theSelection);
			for (i = 0; i < lines.length; i++) {
				insert_text('> ' + lines[i] + '\n');
			}
		}
	}

	return;
}