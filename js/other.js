function notate(n = new OmegaNum(0)) {
    n = new OmegaNum(n);

    if (n.sign == -1) { return `-${n.abs()}`; }
    if (isNaN(n.array[0])) { return "NaN"; }
    if (!isFinite(n.array[0])) { return Infinity; }

    if (!n.array[1]) {
        let e = Math.floor(Math.log10(n.array[0]));
        return e < 3 ? n.toPrecision(3) : `${Math.floor(n).toLocaleString("pt-PT")}`;
    } else if (n.array[1] < 2) { 
        return `${Math.pow(10, n.array[0] - Math.floor(n.array[0])).toPrecision(3)}x10<sup>${Math.floor(n.array[0]).toLocaleString("pt-PT")}</sup>`;
    } else {
        return `${"e".repeat(n.array[1])}${Math.floor(n.array[0])}`;
    };
};

function notate2(n = new OmegaNum(0)) {
    n = new OmegaNum(n);

    if (n.sign == -1) { return `-${n.abs()}`; }
    if (isNaN(n.array[0])) { return "NaN"; }
    if (!isFinite(n.array[0])) { return Infinity; }

    if (!n.array[1]) {
        let e = Math.floor(Math.log10(n.array[0]));
        return e < 3 ? Math.round(n) : `${Math.floor(n).toLocaleString("pt-PT")}`;
    } else if (n.array[1] < 2) { 
        return `${Math.pow(10, n.array[0] - Math.floor(n.array[0])).toPrecision(3)}x10<sup>${Math.floor(n.array[0]).toLocaleString("pt-BR")}</sup>`;
    } else {
        return `${"e".repeat(n.array[1])}${Math.floor(n.array[0])}`;
    };
};

function notate3(n = new OmegaNum(0)) {
    n = new OmegaNum(n);

    if (n.sign == -1) { return `-${n.abs()}`; }
    if (isNaN(n.array[0])) { return "NaN"; }
    if (!isFinite(n.array[0])) { return Infinity; }

    if (!n.array[1]) {
        let e = Math.floor(Math.log10(n.array[0]));
        return e < 3 ? n.toPrecision(3) : `${Math.floor(n).toLocaleString("pt-PT")}`;
    } else if (n.array[1] < 2) { 
        return `${Math.pow(10, n.array[0] - Math.floor(n.array[0])).toPrecision(3)}e${Math.floor(n.array[0]).toLocaleString("pt-PT")}`;
    } else {
        return `${"e".repeat(n.array[1])}${Math.floor(n.array[0])}`;
    };
};

function Save() {
    localStorage.player = JSON.stringify(player);
};

function Load() {
    player = new Player(JSON.parse(localStorage.player));
    console.log("Save loaded");
    return player.obj || "default";
};

var mainGameLoop = window.setInterval(function() {
    Save();
}, 3 * 1000);

Load();