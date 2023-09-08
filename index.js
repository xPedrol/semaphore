const Status = {};
Status.INACTIVE = "Inactive";
Status.ACTIVE = "ACTIVE";
const stateChanged = document.getElementById("state-changed");
const container = document.getElementById("container");
const playStateChanged = () => {
    stateChanged.play();
};
let intervalAfterFinished = null;
let intervalAfterStarted = null;

class Light {
    _color;
    _status;
    _domElement;

    toggleStatus() {
        if (this._status === Status.ACTIVE) {
            this._status = Status.INACTIVE;
            this._domElement.classList.remove("active-light");
        } else {
            this._status = Status.ACTIVE;
            this._domElement.classList.add("active-light");
        }
    }

    set color(value) {
        this._domElement.classList.remove(this._color);
        this._domElement.classList.add(value);
        this._color = value;
    }

    set status(value) {
        this._domElement.classList.remove("active-light");
        this._status = value;
    }

    isActive() {
        return this._status === Status.ACTIVE;
    }

    constructor(color, status, domElement) {
        this._color = color;
        this._status = status;
        this._domElement = domElement;
    }
}

const greenLight = new Light("green", Status.INACTIVE, document.getElementById("green"));
const yellowLight = new Light("yellow", Status.INACTIVE, document.getElementById("yellow"));
const redLight = new Light("red", Status.INACTIVE, document.getElementById("red"));

const changeContainerColor = (color) => {
    container.classList.remove("container-yellow");
    container.classList.remove("container-green");
    container.classList.remove("container-red");
    container.classList.add(`container-${color}`);

};
const inactiveAll = () => {
    greenLight.status = Status.INACTIVE;
    yellowLight.status = Status.INACTIVE;
    redLight.status = Status.INACTIVE;
};

const resetAll = () => {
    inactiveAll();
    greenLight.color = "green";
    redLight.color = "red";
};
const start = () => {
    if (intervalAfterStarted) {
        finish()
        return;
    }
    resetAll();
    if (intervalAfterFinished) {
        clearInterval(intervalAfterFinished);
        intervalAfterFinished = null;
    }
    greenLight.toggleStatus();
    changeContainerColor("green");
    playStateChanged();
    intervalAfterStarted = setInterval(() => {
        if (greenLight.isActive()) {
            greenLight.toggleStatus();
            yellowLight.toggleStatus();
            changeContainerColor("yellow");
        } else if (yellowLight.isActive()) {
            yellowLight.toggleStatus();
            redLight.toggleStatus();
            changeContainerColor("red");
        } else if (redLight.isActive()) {
            redLight.toggleStatus();
            greenLight.toggleStatus();
            changeContainerColor("green");
        }
        playStateChanged();
    }, 2100);
};

const finish = () => {
    if (intervalAfterFinished) return;
    if (intervalAfterStarted) {
        clearInterval(intervalAfterStarted);
        intervalAfterStarted = null;
    }
    inactiveAll();
    greenLight.color = "yellow";
    redLight.color = "yellow";
    changeContainerColor("yellow");
    container.classList.add("container-inactive-yellow");
    intervalAfterFinished = setInterval(() => {
        greenLight.toggleStatus();
        yellowLight.toggleStatus();
        redLight.toggleStatus();
        playStateChanged();
        if (container.classList.contains("container-inactive-yellow")) {
            container.classList.remove("container-inactive-yellow");
        } else {
            container.classList.add("container-inactive-yellow");
        }

    }, 1000);
};
