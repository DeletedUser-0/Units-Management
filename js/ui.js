window.setInterval(function() {
    document.getElementById("x").innerHTML = `x: <b>${notate(player.x)}</b>`;
    document.getElementById("units").innerHTML = `<b>Units:</b> ${notate2(player.units.use)}/${notate2(player.units.total)}`;
    document.getElementById("mult").innerHTML = `Current Multiplier: <b style="color: blue">${notate(player.mult.now)}x</b> -> <b style="color: green">${notate(player.mult.next)}x</b>.`;
    document.getElementById("base").innerHTML = `${notate2(player.units.base)}`;
    document.getElementById("exp").innerHTML = `${notate2(player.units.exp)}`;
    document.getElementById("wait").innerHTML = `Wait <b>${player.cooldown.toFixed(1)}s</b>`;
    document.getElementById("results").innerHTML = `<span style="font-size: 70%;">Term <b>${notate2(player.calc.term)}</b> => ${notate(player.calc.base)}<sup>${notate(player.calc.exp)}</sup></span> <br> <span>&#8776;</span><b>${notate(player.calc.result)}</b>`;
    if (player.up5.level == 0) {
        document.getElementById("final").innerHTML = `${notate(player.calc.result)}<span style="color: blue;"><span>&#215;</span>${notate(player.mult.now)}</span> = <b style="color: green">${notate(player.calc.final)}</b>`;
    } else {
        document.getElementById("final").innerHTML = `(${notate(player.calc.result)}<span style="color: blue;"><span>&#215;</span>${notate(player.mult.now)}</span>)<sup><sup>${notate(player.up5.effect)}</sup></sup> = <b style="color: green">${notate(player.calc.final)}</b>`;
    };
    document.getElementById("up1").innerHTML = `Increase amount of units to be used <br> Cost: x: <b>${notate(player.up1.cost)}</b> <br> Level: ${notate2(player.up1.level)}`;
    if (player.up2.level >= 11) {
        document.getElementById("up2").innerHTML = `Term increase is now automatic <br> Cost: x: MAX </b> <br> Level: MAX`;
        if (player.autoterm == true) {
            term();
        };
        document.getElementById("autoterm").style.display = "block-inline";
    } else {
        document.getElementById("up2").innerHTML = `Decrease term increment cooldown <br> Cost: x: <b>${notate(player.up2.cost)}</b> <br> Level: ${notate2(player.up2.level)}/14`;
        document.getElementById("autoterm").style.display = "none";
    };
    document.getElementById("up3").innerHTML = `Exponent formula becomes better, but vice-versa for base. <br> Cost: x: <b>${notate(player.up3.cost)}</b> <br> Level: ${notate2(player.up3.level)}`;
    document.getElementById("up4").innerHTML = `Prestige formula becomes better. <br> Cost: x: <b>${notate(player.up4.cost)}</b> <br> Level: ${notate2(player.up4.level)}`;
    if (player.autoterm == false) {
        document.getElementById("autoterm").innerHTML = `Auto-increase term: OFF`;
    } else {
        document.getElementById("autoterm").innerHTML = `Auto-increase term: ON`;
    };
    if (player.up5.level == 0) {
        document.getElementById("up5").innerHTML = `Add exponent on final calculation. <br> Cost: x: <b>${notate(player.up5.cost)}</b> <br> Level: ${notate2(player.up5.level)}`;
    } else {
        document.getElementById("up5").innerHTML = `Final exponent becomes better. <br> Cost: x: <b>${notate(player.up5.cost)}</b> <br> Level: ${notate2(player.up5.level)}`;
    };
    if (OmegaNum.cmp(player.Xrecord, 1e40) >= 0) {
        const cheaptag1 = document.getElementById("cheaptag1");
        const cheapP1 = document.createElement("p");
        const cheapD1 = document.getElementById("chD1");
        const cheapT1 = document.getElementById("chD1").innerHTML = `All upgrades become cheaper (x<sup>${player.cheaper.effect}</sup>)`;
        const cheaptag2 = document.getElementById("cheaptag2");
        const cheapP2 = document.createElement("p");
        const cheapD2 = document.getElementById("chD2");
        const cheapT2 = document.getElementById("chD2").innerHTML = `Requirement: <b>${notate(player.cheaper.req)}</b>`;
        cheapP1.appendChild(cheapT1);
        cheapP2.appendChild(cheapT2);
        cheaptag1.replaceChild(cheapP1,cheapD1);
        cheaptag2.replaceChild(cheapP2,cheapD2);
    } else {
        const cheaptag1 = document.getElementById("cheaptag1");
        const cheapP1 = document.createElement("p");
        const cheapD1 = document.getElementById("chD1");
        const cheapT1 = document.getElementById("chD1").innerHTML = `Unlocked at <b>1.00e40</b> x value.`;
        const cheaptag2 = document.getElementById("cheaptag2");
        const cheapP2 = document.createElement("p");
        const cheapD2 = document.getElementById("chD2");
        const cheapT2 = document.getElementById("chD2").innerHTML = `${notate(OmegaNum.div(OmegaNum.log10(player.x), 40).times(100))}% completed.`;
        cheapP1.appendChild(cheapT1);
        cheapP2.appendChild(cheapT2);
        cheaptag1.replaceChild(cheapP1,cheapD1);
        cheaptag2.replaceChild(cheapP2,cheapD2);
    };
}, 0);