const PracticeMode = {
    COMBO: 0,
    OKI: 1
}


var btnModeSwitch;
var btnCharacterChange;

var cbxCharacters;

var txtCharacterLabel;

var currCharacter;
var moveSetFile;
var practiceMode;


window.onload = function(e) {
    btnModeSwitch = this.document.getElementById("mode-button");
    btnCharacterChange = this.document.getElementById("character-change-button");

    cbxCharacters = this.document.getElementById("fighters-combobox");

    txtCharacterLabel = this.document.getElementById("char-name");

    practiceMode = PracticeMode.COMBO;
    currCharacter = "AKI";
};


function changeCharacter() {
    currCharacter = cbxCharacters.options[cbxCharacters.selectedIndex].value;
    txtCharacterLabel.innerText = (`Current Character: ${cbxCharacters.options[cbxCharacters.selectedIndex].text}`);
    console.log(currCharacter);
}


function switchMode() {
    practiceMode = (practiceMode == PracticeMode.COMBO) ? PracticeMode.OKI : PracticeMode.COMBO;
    btnModeSwitch.innerText = (practiceMode == PracticeMode.COMBO) ? "Oki" : "Combo";
}