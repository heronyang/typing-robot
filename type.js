/**
 * This script loads 10fastfingers and tries to do the typing test automatically.
 */

/* Setup */
var page = require("webpage").create();
var url = "http://10fastfingers.com/typing-test/english"

/* Page Evenet Handlers */
var logResources = false;

page.onInitialized = function() {
    console.log("page.onInitialized");
};

page.onLoadStarted = function() {
    console.log("page.onLoadStarted");

    window.setTimeout(function(){
        page.render('screenshots/screenshot_15sec_onLoadStarted.png');
    }, 5000);

    };

    page.onLoadFinished = function() {
        console.log("page.onLoadFinished");
        page.render('screenshots/screenshot_onLoadFinished.png');
    };

    page.onUrlChanged = function() {
        console.log("page.onUrlChanged");
    };

    page.onNavigationRequested = function() {
        console.log("page.onNavigationRequested");
    };

    page.onRepaintRequested = function() {
        // This function occurs too often, so turn the log off.
        // console.log("page.onRepaintRequested");
    };

    if (logResources === true) {
        page.onResourceRequested = function() {
            console.log("page.onResourceRequested");
        };
        page.onResourceReceived = function() {
            console.log("page.onResourceReceived");
        };
        }

        page.onClosing = function() {
            console.log("page.onClosing");
        };

        // window.console.log(msg);
        page.onConsoleMessage = function(msg) {
            console.log("page.onConsoleMessage: " + msg);
        };

        // window.alert(msg);
        page.onAlert = function() {
            console.log("page.onAlert");
        };
        // var confirmed = window.confirm(msg);
        page.onConfirm = function() {
            console.log("page.onConfirm");
        };
        // var user_value = window.prompt(msg, default_value);
        page.onPrompt = function() {
            console.log("page.onPrompt");
        };

        page.onResourceError = function(resourceError) {
            page.reason = resourceError.errorString;
            page.reason_url = resourceError.url;
        };

        page.onError = function (msg, trace) {
            console.log(msg);
            trace.forEach(function(item) {
                console.log('  ', item.file, ':', item.line);
            });
            };

            /* Main */

// setup
page.viewportSize = {
    width: 1440,
    height: 900
};

console.log("");
console.log("### Start to load '" + window.url + "' (this will take around 80 seconds in total)");

page.open(window.url, function(status) {

    // if failed
    if ( status !== 'success' ) {
        console.log(
            "Error opening url \"" + page.reason_url
            + "\": " + page.reason
        );
        phantom.exit(1);
    }

    // run javascript code
    var evaluatedHtml = page.evaluate(function() {
        console.log("### Javascript evaluated");
        return document.documentElement.outerHTML;
    });

    // start typing
    window.setTimeout(function(){
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {

            console.log("### Reading Content");

            (function(){

                    page.evaluate(function() {

                        var w = $("span.highlight").contents()[0];
                        console.log(">>> get word: " + w.textContent);

                        // type word
                        var input_field = $('input#inputfield');
                        input_field.val(w.textContent);

                        // type space (to submit current word)
                        var e = jQuery.Event("keyup");
                        e.which = 32;
                        input_field.trigger(e);

                        console.log(">>> type word: " + w.textContent);

                    });

                    setTimeout(arguments.callee, 200);

            })();


        });
    }, 5000);


    // close page
    window.setTimeout(function(){
        console.log("closing page");
        page.render('screenshots/screenshot_beforeClose.png');
        page.close();
    }, 70000);

    // exit phantomjs
    window.setTimeout(function(){
        console.log("exiting phantom");
        phantom.exit();
    }, 70500);

});
