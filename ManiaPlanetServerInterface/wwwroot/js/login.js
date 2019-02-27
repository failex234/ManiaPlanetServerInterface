var ctrlpressed
function onload() {
    $('body').fadeIn(200);

    //Event Handler
    $('#closemodal').on('click', () => {
        clearInputFields();
        setTimeout(() => { $('#digit-1').focus() }, 1);
    });

    $('.pin-digit-input').on('keydown', e => {
        //Get the id of the current element
        let elemid = e.currentTarget.id;
        let currindex = parseInt(elemid.replace("digit-", ""));

        //Check if CTRL+v is pressed
        if (e.key === "Control" || e.key === "v") {
            if ($('#digit-' + currindex).val() === "") {
                setTimeout(() => {
                    $('#digit-' + currindex).val("")
                }, 0);
            } else {
                e.preventDefault();
            }
            return;
        }

        //When current input field is full. Fill the next one with the entered value
        if ($('#digit-' + currindex).val().length != 0 && e.key.match(/^[0-9]$/g) !== null && currindex != 4) {
            $('#digit-' + (currindex + 1)).focus();
            $('#digit-' + (currindex + 1)).val(e.key);
            e.preventDefault();
            return;
        }

        e.preventDefault();

        //Clear text field on backspace and go one field to the left
        if (e.key === "Backspace") {
                $('#digit-' + currindex).val("");
                if (currindex > 1) {
                    $('#digit-' + (currindex - 1)).focus();
                    if ('#digit-' + currindex.val() !== "") {
                        $('#digit-' + (currindex - 1)).val("");
                    }
                }
        } else {
            //Fill text field with pressed key and go one field to the right
            if (e.key.match(/^[0-9]$/g) !== null) {
                $('#digit-' + currindex).val(e.key);
                if (currindex < 4) {
                    $('#digit-' + (currindex + 1)).focus();
                }

                if (allInputsFilled()) {
                    login(getPin());
                }
            }
        }

    });

    $('.pin-digit-input').on('paste', e => {
        let text = e.originalEvent.clipboardData.getData("text");

        $('#digit-1').focus();
        if (text.length <= 4 && text.match(/^[0-9]{1,4}$/g) !== null) {
            setTimeout(() => {
                for (var i = 0; i < text.length; i++) {
                    $('#digit-' + (i + 1)).focus();
                    $('#digit-' + (i + 1)).val(text.charAt(i));
                }
            }, 1);
        } else {
            e.preventDefault();
        }
    });

    $('#digit-1').focus();
}

function allInputsFilled() {
    for (let i = 0; i < 4; i++) {
        if ($('#digit-' + (i + 1)).val() === "") return false;
    }
    return true;
}

function getPin() {
    return $('#digit-1').val() + $('#digit-2').val() + $('#digit-3').val() + $('#digit-4').val();
}

function clearInputFields() {
    $('#digit-1').val("");
    $('#digit-2').val("");
    $('#digit-3').val("");
    $('#digit-4').val("");
}

function login(pin) {
    let div, loginpin = { password: pin };
    //Send POST request with entered pin to check if it is correct
    $.post("Api/Login", JSON.stringify(loginpin), (data, status) => {
        if (data === "true") {
            $('body').fadeOut(200);
            setTimeout(() => { window.location = "/" }, 200);
        } else {
            $('#openmodal').click();
        }
    });
}