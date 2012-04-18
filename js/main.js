/**
 * hide the address bar - and the error console,
 * if necessary - when the site is seen in Mobile Safari.
 */
if (!window.navigator.standalone) {
    document.addEventListener("DOMContentLoaded", adjustHeight, true);

    /*
     * However, because the height of the page has been modified dynamically, if the user
     * rotates the screen when not in full-screen mode, the page would become too high for
     * the screen. We must add an event listener for this case also. Note that the pageYOffset
     * test is especially useful here, because the position won’t be reinitialized with each
     * rotation. Here is the line that handles rotation:
     */
    window.addEventListener("orientationchange", adjustHeight, true);
} else {
    /* Target only standalone mode */
    document.addEventListener("click", clickHandler, true);
}

function adjustHeight() {
    var html = document.documentElement;
    var size = window.innerHeight;
    html.style.height = (size + size) + "px";
    window.setTimeout(function() {
        if (window.pageYOffset == 0) {
            window.scrollTo(0, 0);
        }
        html.style.height = window.innerHeight + "px";
    }, 0);
}

function clickHandler(e) {
    var element = e.target;
    /* handle clicks only on anchor elements */
    if (element.localName.toUpperCase() != 'A') {
        return;
    }
    /* ignore elements with a target value specified since "target"
       cannot be handled in full-screen mode
       those links shall open regularly in Mobile Safari */
    if (!!element.getAttribute('target')) {
        return;
    }
    var url = element.href;
    /* ignore links other than HTTP(S) and to different origin */
    var match = url.match(/^https?:\/\/(.+?)\/.*$/);
    if (!match || match[1] != window.location.host) {
         return;
    }
    /* finally open the link in full-screen view and prevent default behavior */
    window.location.href = url;
    e.preventDefault();
}


/*
 * You will be able at any time to check the value of the orientation using the window.orientation
 * property, as done in the following example, for instance to modify styles appropriately:
 */
switch (window.orientation) {
    /* Normal orientation, home button on the bottom */
    case 0:
        document.body.className = "portrait";
        break;
    /* Rotated 90 degrees to the left */
    case 90:
        document.body.className = "landscape";
        break;
    /* Upside down */
    case 180:
        document.body.className = "portrait";
        break;
    /* Rotated 90 degrees to the right */
    case -90:
        document.body.className = "portrait";
        break;
}


