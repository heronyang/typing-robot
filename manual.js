// Simply paste following code to your brower console, 
// and you're good to go!

for ( var i = 0, l = 500; i < l; i++ ) {

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

    // sleep for a little while (otherwise, it's too fast)
    var start = new Date().getTime();
    var milliseconds = 200;
    for (var j = 0; j < 1e7; j++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }

}
