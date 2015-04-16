# typing-robot

## Preface

This code is for PhantomJS learning.

## PhantomJS

Run:
    ./run.sh

to execute the script. However, it's buggy now.

## Manual Script

Open your favorite browser, and past following code in its console:

```javascript
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
```

## 10fastfingers Anti-Cheat Prevention

Whenever you have extremely high score, 10fastfingers would determine that you're cheating. So you will get an notification which asks you to pass their another test in order to proof the high score belongs to you. And the new test is having texts in image instead of normal html span, so if one is going to pass that test using auto-script, one should add OCR programs into the script.
