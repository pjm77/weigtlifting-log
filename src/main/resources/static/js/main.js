$(document).ready(function () {

    /* This event listener is responsible for hiding the logo container and making the tab navigation bar stick to the
       top of the screen when user is scrolling down the page and showing the logo container and unsticking the
       navigation bar when the page is scrolled back to the very top. */

    let logo = document.getElementById('logo-container');
    let navbar = document.getElementById('big-tabs');
    let tab4 = document.getElementById('testdonthide');
    let filler = document.getElementById('filler');
    let dontshow = false;

    window.addEventListener('scroll', function () {
        console.log($(this).scrollTop());
        if ($(this).scrollTop() === 0) {
            if (dontshow === false) {
                if (logo.style.display === 'none') {
                    navbar.classList.remove('sticky');
                    $(filler).slideUp('fast').queue(false);
                    $(logo).show('fast').queue(false);
                }
            } else {
                dontshow = false;
            }

        } else if (logo.style.display !== 'none') {
            $(logo).slideUp('fast').queue(false);
            $(filler).show('fast').queue(false);
            navbar.classList.add('sticky');
        }
    });

    tab4.addEventListener('click', function () {
        dontshow = true;
    });
});

/* function updates a single lift section in General Strength tab
   whenever the user moves the slider it updates the corresponding number field and calculates 1 rep max
   when number field is updated it moves the slider and 1 rep max is calculated
   parameters are:
    fieldToUpdate - id of the corresponding field to update
    value - value that fieldToUpdate will be updated with
    weightField - id of the field holding weight for the current lift
    repsField - id of the field holding repetitions for the current lift
    maxField - id of the field holding the 1 rep max for the current lift that will be calculated */
function updateGS(fieldToUpdate, value, weightField, repsField, maxField) {
    document.getElementById(fieldToUpdate).value = value;
    let weight = document.getElementById(weightField).value;
    let reps = document.getElementById(repsField).value;
    document.getElementById(maxField).value = Math.round(weight * (1 + (reps / 30)) * 100) / 100;
}

/* This function updates an element of certain id with given value */
function update(field, val) {
    document.getElementById(field).value = val;
}

/* This function calculates the 1 rep max and percentages in 1 Rep Max tab */
function calculate1RM() {
    let weight = document.getElementById('weight-text').value;
    let reps = document.getElementById('reps-text').value;
    let result = weight * (1 + (reps / 30));
    document.getElementById('result').value = result;
    document.getElementById('percentage-1').value =
        (document.getElementById('percentage-input-1').value * 0.01 * result).toFixed(2);
    document.getElementById('percentage-2').value =
        (document.getElementById('percentage-input-2').value * 0.01 * result).toFixed(2);
    document.getElementById('percentage-3').value =
        (document.getElementById('percentage-input-3').value * 0.01 * result).toFixed(2);
    document.getElementById('percentage-4').value =
        (document.getElementById('percentage-input-4').value * 0.01 * result).toFixed(2);
    document.getElementById('percentage-5').value =
        (document.getElementById('percentage-input-5').value * 0.01 * result).toFixed(2);
    document.getElementById('percentage-6').value =
        (document.getElementById('percentage-input-6').value * 0.01 * result).toFixed(2);
    document.getElementById('percentage-7').value =
        (document.getElementById('percentage-input-7').value * 0.01 * result).toFixed(2);
    document.getElementById('percentage-8').value =
        (document.getElementById('percentage-input-8').value * 0.01 * result).toFixed(2);
    document.getElementById('percentage-9').value =
        (document.getElementById('percentage-input-9').value * 0.01 * result).toFixed(2);
    document.getElementById('percentage-10').value =
        (document.getElementById('percentage-input-10').value * 0.01 * result).toFixed(2);
    document.getElementById('percentage-11').value =
        (document.getElementById('percentage-input-11').value * 0.01 * result).toFixed(2);
    document.getElementById('percentage-12').value =
        (document.getElementById('percentage-input-12').value * 0.01 * result).toFixed(2);
    document.getElementById('percentage-13').value =
        (document.getElementById('percentage-input-13').value * 0.01 * result).toFixed(2);
}

/* This function updates descriptions for percentages of 1 Rep Max */
function updatePercentageDescription(description, percentage) {
    let x = 0;
    let descriptions = [
        "Upper body ballistic work, lower body plyometrics. Improves muscle hardness and contraction speed.",
        "Lower body ballistic work. Improves muscle hardness, develops power and contraction speed.",
        "Explosiveness, speed and power. Great for muscle hardness. 60% can be used for hypertrophy when done to failure.",
        "Best range for muscle mass building, also good for explosiveness (~70%) and strength (~80%) in Olympic lifting.",
        "Best for building muscle strength, use ~80% for easy recovery, ~90% for quick strength peaking.",
        "Increases maximal strength via neural factors. Good for displaying strength. Difficult to recover from."];
    if (percentage < 21) {
        x = 0;
    } else if (percentage < 41) {
        x = 1;
    } else if (percentage < 61) {
        x = 2;
    } else if (percentage < 81) {
        x = 3;
    } else if (percentage < 91) {
        x = 4;
    } else {
        x = 5;
    }
    document.getElementById(description).innerHTML = descriptions[x];
}