window.onload = function () {
    // Check if we are on the correct page
    if (
        window.location.href === 'https://ivelt.com/forum/' ||
        window.location.href.startsWith('https://ivelt.com/forum/index.php') ||
        window.location.href === 'https://www.ivelt.com/forum/' ||
        window.location.href.startsWith('https://www.ivelt.com/forum/index.php')
    ) {
    
        // Create a button
        var btn = document.createElement("button");
        btn.id = "advanced-search";
        btn.innerHTML = "וועלט אויס וואס צו זוכן";
        btn.style.position = "relative";
        btn.style.borderRadius = "50%";
        

        // Create a spacer
        var spacer = document.createElement("span");
        spacer.style.display = "inline-block";
        spacer.style.width = "10px";

        // Get the element with itemprop of 'name'
        var nameElement = document.querySelector('span[itemprop="name"]');

        // Insert the spacer and the button after the parent of nameElement
        nameElement.parentNode.insertAdjacentElement('afterend', spacer);
        spacer.insertAdjacentElement('afterend', btn);




        // Event listener for button
        document.getElementById("advanced-search").addEventListener("click", function () {
            this.disabled = true;
            var links = document.querySelectorAll('a[href^="./viewforum.php"]');
            links.forEach(function (link) {
                var forumId = link.href.split('=')[1].split('&')[0];
                var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.setAttribute('data-forum-id', forumId);
                link.insertAdjacentElement('beforebegin', checkbox);
            });

            // Create the popup box after checkboxes are added
            var popupBox = document.createElement("div");
            popupBox.id = "popup-box";
            popupBox.style.position = "fixed";
            popupBox.style.left = "50%";
            popupBox.style.top = "50%";
            popupBox.style.transform = "translate(-50%, -50%)";
            popupBox.style.background = "#fff";
            popupBox.style.padding = "20px";
            popupBox.style.border = "1px solid #000";
            popupBox.style.zIndex = "10000";
            popupBox.style.direction = "rtl";
            document.body.appendChild(popupBox);

            // Create "Search in subforums?" radio buttons
            var radioButtonLabel = document.createElement("label");
            radioButtonLabel.innerHTML = "זוך אין סאבפארומס?";
            document.getElementById("popup-box").appendChild(radioButtonLabel);

            // Use div to group each radio button with its label
            var radioOptionYes = document.createElement("div");
            radioOptionYes.style.cssText = "margin: 10px 0; display: flex; align-items: center;";
            var yesRadioButton = document.createElement("input");
            yesRadioButton.type = "radio";
            yesRadioButton.name = "searchInSubforums";
            yesRadioButton.value = "yes";
            yesRadioButton.checked = true; // Default selection
            radioOptionYes.appendChild(yesRadioButton);
            var yesLabel = document.createElement("label");
            yesLabel.innerHTML = "יא";
            radioOptionYes.appendChild(yesLabel);
            document.getElementById("popup-box").appendChild(radioOptionYes);

            var radioOptionNo = document.createElement("div");
            radioOptionNo.style.cssText = "margin: 10px 0; display: flex; align-items: center;";
            var noRadioButton = document.createElement("input");
            noRadioButton.type = "radio";
            noRadioButton.name = "searchInSubforums";
            noRadioButton.value = "no";
            radioOptionNo.appendChild(noRadioButton);
            var noLabel = document.createElement("label");
            noLabel.innerHTML = "ניין";
            radioOptionNo.appendChild(noLabel);
            document.getElementById("popup-box").appendChild(radioOptionNo);

            // Create "Select search type:" radio buttons
            var searchTypeLabel = document.createElement("label");
            searchTypeLabel.innerHTML = "וועלט אויס וועלכע זוך:";
            document.getElementById("popup-box").appendChild(searchTypeLabel);

            var searchTypeOptions = [
                { label: "אומגעלייענטע אשכולות", value: "unreadposts" },
                { label: "אומגעענטפערטע אשכולות", value: "unanswered" },
                { label: "נייע תגובות", value: "newposts" },
                { label: "אקטיווע אשכולות", value: "active_topics" }
            ];

            searchTypeOptions.forEach(function (option, index) {
                var radioOption = document.createElement("div");
                radioOption.style.cssText = "margin: 10px 0; display: flex; align-items: center;";
                var radioButton = document.createElement("input");
                radioButton.type = "radio";
                radioButton.name = "searchType";
                radioButton.value = option.value;
                if (index === 0) { // Default selection
                    radioButton.checked = true;
                }
                radioOption.appendChild(radioButton);
                var label = document.createElement("label");
                label.innerHTML = option.label;
                radioOption.appendChild(label);
                document.getElementById("popup-box").appendChild(radioOption);
            });

            // Create "Go Now" button
            var goNowButton = document.createElement("button");
            goNowButton.id = "go-now";
            goNowButton.innerHTML = "גיי יעצט";
            document.getElementById("popup-box").appendChild(goNowButton);
            document.getElementById("go-now").addEventListener("click", function() {
                var searchInSubforums = document.querySelector('input[name="searchInSubforums"]:checked').value;
                var scValue = (searchInSubforums === "yes") ? "1" : "0";
                var searchType = document.querySelector('input[name="searchType"]:checked').value;
            
                var baseURL = 'https://www.ivelt.com/forum/search.php?&sc=' + scValue + 'st=0&sk=t&sd=d&sr=topics&search_id=' + searchType;
                var selectedIds = [];
                document.querySelectorAll('input[type="checkbox"]:checked').forEach(function(checkbox) {
                    selectedIds.push('&fid%5b%5d=' + checkbox.getAttribute('data-forum-id'));
                });
                var finalURL = baseURL + selectedIds.join('');
            
                // Open the URL in a new window
                window.open(finalURL, "_blank");
            });
            
            // Create "Cancel" button
            var cancelButton = document.createElement("button");
            cancelButton.id = "cancel";
            cancelButton.innerHTML = "צו צוריק";
            document.getElementById("popup-box").appendChild(cancelButton);

            // Add event listener to the "Cancel" button
            document.getElementById("cancel").addEventListener("click", function () {
                // Remove the entire popup box
                document.body.removeChild(popupBox);
                    // Remove the checkboxes
                var checkboxes = document.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(function(checkbox) {
                    checkbox.parentNode.removeChild(checkbox);
                });
                // Re-enable the "advanced-search" button
                document.getElementById("advanced-search").disabled = false;
            });

            document.querySelectorAll("#popup-box button").forEach(function(button) {
                button.style.cssText = `
                    margin: 5px;
                    padding: 5px 10px;
                    cursor: pointer;
                    background-color: #008CBA; /* Blue background */
                    color: white; /* White text */
                    border: none; /* Remove border */
                    border-radius: 4px; /* Rounded corners */
                    text-align: center; /* Centered text */
                    transition-duration: 0.4s; /* Transition */
                `;
            });
            


            // Make the popup box draggable
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            if (document.getElementById(popupBox.id)) {
                document.getElementById(popupBox.id).onmousedown = dragMouseDown;
            } else {
                popupBox.onmousedown = dragMouseDown;
            }

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                popupBox.style.top = (popupBox.offsetTop - pos2) + "px";
                popupBox.style.left = (popupBox.offsetLeft - pos1) + "px";
            }

            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        });
    }
}
