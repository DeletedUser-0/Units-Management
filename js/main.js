class Player {
    constructor(data) {
        this.x = data?.x || 1;
        this.term = data?.term || 1;
        
        this.units = {
            total: data?.units?.total || 2,
            use: data?.units?.use || 0,
            base: data?.units?.base || 0,
            exp: data?.units?.exp || 0,
        };

        this.mult = {
            now: data?.mult?.now || 1,
            next: data?.mult?.next || 1,
        };

        this.calc = {
            term: data?.calc?.term || 1,
            base: data?.calc?.base || 1,
            exp: data?.calc?.exp || 1,
            result: data?.calc?.result || 1,
            final: data?.calc?.final || 1,
        };

        this.cooldown = 3;

        this.up1 = {
            cost: data?.up1?.cost || 1500,
            level: data?.up1?.level || 0,
            effect: data?.up1?.effect || 1,
        };

        this.up2 = {
            cost: data?.up2?.cost || 5000,
            level: data?.up2?.level || 0,
        };

        this.up3 = {
            cost: data?.up3?.cost || 1e9,
            level: data?.up3?.level || 0,
            effectexp: data?.up3?.effectexp || 1,
            effectbase: data?.up3?.effectbase || 1,
        };

        this.up4 = {
            cost: data?.up4?.cost || 5.55e20,
            level: data?.up4?.level || 0,
            effect: data?.up4?.effect || 0.94,
        };

        this.up5 = {
            cost: data?.up5?.cost || 3.16227e27,
            level: data?.up5?.level || 0,
            effect: data?.up5?.effect || 1,
        };

        this.cheaper = {
            req: data?.cheaper?.req || 1e45,
            effect: data?.cheaper?.effect || 0.97,
            mult: data?.cheaper?.mult || 1e10,
        };

        this.autoterm = true;
        this.Xrecord = 1;
    };
};

var player = new Player();

window.setInterval(function() {
    player.units.total = Math.round(OmegaNum.times(4, OmegaNum.logBase(OmegaNum.add(player.x, 1), OmegaNum.add(4, OmegaNum.logBase(player.x, 4)))).times(1.05).pow(player.up1.effect));
    if (OmegaNum.cmp(player.x, 1e7) < 0) {
        player.mult.next = OmegaNum.pow(1.4, OmegaNum.log10(player.x));
    } else {
        player.mult.next = OmegaNum.pow(1.4, OmegaNum.log10(player.x)).pow(OmegaNum.pow(player.up4.effect, OmegaNum.log10(player.x).sub(5)));
    };
    player.units.use = OmegaNum.add(player.units.base, player.units.exp);
    player.calc.base = OmegaNum.times(4, player.units.base).sub(OmegaNum.times(OmegaNum.times(2, player.up3.effectbase), player.calc.term)).add(OmegaNum.times(2, player.up3.effectbase));
    player.calc.exp = OmegaNum.logBase(OmegaNum.times(player.units.exp, player.calc.term), OmegaNum.pow(8, player.up3.effectexp)).add(0.5);
    player.calc.result = OmegaNum.pow(player.calc.base, player.calc.exp);
    if (player.cooldown < 0) {
        player.cooldown = 0;
    };
    player.calc.final = OmegaNum.times(player.calc.result, player.mult.now).pow(player.up5.effect);
    player.units.base = OmegaNum.floor(player.units.base);
    player.units.exp = OmegaNum.floor(player.units.exp);
    // ----- cheaper ----- //
    if (OmegaNum.cmp(player.x, player.cheaper.req) >= 0) {
        player.cheaper.req = OmegaNum.times(player.cheaper.req, player.cheaper.mult);
        player.up1.cost = OmegaNum.pow(player.up1.cost, player.cheaper.effect);
        player.up2.cost = OmegaNum.pow(player.up2.cost, player.cheaper.effect);
        player.up3.cost = OmegaNum.pow(player.up3.cost, player.cheaper.effect);
        player.up4.cost = OmegaNum.pow(player.up4.cost, player.cheaper.effect);
        player.up5.cost = OmegaNum.pow(player.up5.cost, player.cheaper.effect);
        player.cheaper.mult = OmegaNum.pow(player.cheaper.mult, 1.05);
        if (OmegaNum.cmp(player.cheaper.effect, 0.94) < 0) {
            player.cheaper.effect = OmegaNum.pow(player.cheaper.effect, 1.07);
        } else {
            player.cheaper.effect = 0.94;
        };
    };
    // ---- end of cheaper script ---- //
    if (OmegaNum.cmp(player.x, player.Xrecord) >= 0) {
        player.Xrecord = player.x;
    };
    player.cheaper.effect = new OmegaNum(player.cheaper.effect).toFixed(3);
}, 0);

window.setInterval(function() {
    if (OmegaNum.cmp(player.cooldown, 0) > 0) {
        player.cooldown = OmegaNum.sub(player.cooldown, 0.1);
    };
}, 100);

function addbase() {
    if (OmegaNum.cmp(player.units.use, player.units.total) < 0) {
        if (OmegaNum.cmp(OmegaNum.div(OmegaNum.sub(player.units.total, player.units.use), 6), 1) >= 0) {
            player.units.base = OmegaNum.add(player.units.base, OmegaNum.div(OmegaNum.sub(player.units.total, player.units.use), 6));
        } else {
            player.units.base = OmegaNum.add(player.units.base, 1);
        };
    };
};

function addexp() {
    if (OmegaNum.cmp(player.units.use, player.units.total) < 0) {
        if (OmegaNum.cmp(OmegaNum.div(OmegaNum.sub(player.units.total, player.units.use), 6), 1) >= 0) {
            player.units.exp = OmegaNum.add(player.units.exp, OmegaNum.div(OmegaNum.sub(player.units.total, player.units.use), 6));
        } else {
            player.units.exp = OmegaNum.add(player.units.exp, 1);
        };
    };
};

function subbase() {
    if (OmegaNum.cmp(player.units.base, 0) > 0) {
        if (OmegaNum.cmp(player.units.base, 100) >= 0) {
            player.units.base = OmegaNum.div(player.units.base, 1.01);
        } else {
            player.units.base = OmegaNum.sub(player.units.base, 1);
        };
    };
};

function subexp() {
    if (OmegaNum.cmp(player.units.exp, 0) > 0) {
        if (OmegaNum.cmp(player.units.exp, 100) >= 0) {
            player.units.exp = OmegaNum.div(player.units.exp, 1.01);
        } else {
            player.units.exp = OmegaNum.sub(player.units.exp, 1);
        };
    };
};

function term() {
    if (player.cooldown <= 0) {
        player.calc.term = OmegaNum.add(player.calc.term, 1);
        if (player.up2.level <= 11) {
            player.cooldown = OmegaNum.round(OmegaNum.div(30, OmegaNum.pow(1.15, player.up2.level))).div(10);
        } else {
            player.cooldown = OmegaNum.round(OmegaNum.div(30, OmegaNum.pow(1.15, player.up2.level)).sub(OmegaNum.sub(player.up2.level, 11))).div(10);
        };
    };
};

function reseterm() {
    player.calc.term = 1;
};

function result_x() {
    if (OmegaNum.cmp(player.calc.final, player.x) >= 0) {
        player.x = player.calc.final;
        player.calc.term = 1;
    };
};

function prestige() {
    if (OmegaNum.cmp(player.mult.next, player.mult.now) >= 0) {
    var r = confirm("Do you really want to reset this run?");
        if (r == true) {
            player.mult.now = player.mult.next;
            player.x = 1;
            player.calc.term = 1;
            player.units.total = 2;
            player.units.use = 0;
            player.units.base = 0;
            player.units.exp = 0;
        };
    };
};

function up1() {
    if (OmegaNum.cmp(player.x, player.up1.cost) >= 0) {
        if (OmegaNum.cmp(player.up1.level, 7) >= 0) {
            player.up1.cost = OmegaNum.pow(player.up1.cost, OmegaNum.add(1.25, OmegaNum.times(player.up1.level, 0.015)));
        } else {
            player.up1.cost = OmegaNum.pow(player.up1.cost, 1.25);
        };
        player.up1.effect = OmegaNum.add(player.up1.effect, 0.06);
        player.up1.level += 1;
    };
};

function up2() {
    if (OmegaNum.cmp(player.x, player.up2.cost) >= 0) {
        player.up2.level += 1;
        if (player.up2.level >= 14) {
            player.up2.cost = Infinity;
        } else {
            if (player.up2.level <= 11) {
                player.up2.cost = OmegaNum.pow(player.up2.cost, 1.15);
            } else if (player.up2.level == 12) {
                player.up2.cost = OmegaNum.pow(player.up2.cost, 1.3);
            } else if (player.up2.level == 13) {
                player.up2.cost = OmegaNum.pow(player.up2.cost, 1.5);
            };
        };
    };
};

function up3() {
    if (OmegaNum.cmp(player.x, player.up3.cost) >= 0) {
        player.up3.cost = OmegaNum.pow(player.up3.cost, OmegaNum.add(1.1, OmegaNum.times(0.03, player.up3.level)));
        player.up3.level += 1;
        player.up3.effectexp = OmegaNum.pow(0.92, player.up3.level);
        player.up3.effectbase = OmegaNum.pow(1.4, player.up3.level);
    };
};

function up4() {
    if (OmegaNum.cmp(player.x, player.up4.cost) >= 0) {
        if (player.up4.level <= 3) {
            player.up4.cost = OmegaNum.pow(10, OmegaNum.round(OmegaNum.log10(OmegaNum.pow(player.up4.cost, 1.15))));
        } else {
            player.up4.cost = OmegaNum.pow(10, OmegaNum.round(OmegaNum.log10(OmegaNum.pow(player.up4.cost, 1.3))));
        };
        player.up4.level += 1;
        player.up4.effect = OmegaNum.pow(0.94, OmegaNum.pow(0.7, player.up4.level));
    };
};

function up5() {
    if (OmegaNum.cmp(player.x, player.up5.cost) >= 0) {
        player.up5.cost = OmegaNum.pow(player.up5.cost, 1.46);
        player.up5.level += 1;
        player.up5.effect = OmegaNum.add(1, OmegaNum.times(0.056, player.up5.level));
    };
};

function autoterm() {
    if (player.autoterm == false) {
        player.autoterm = true;
    } else {
        player.autoterm = false;
    };
};

function resetrun() {
    var r = confirm("Do you really want to reset this run?");
    if (r == true) {
        player.x = 1;
        player.calc.term = 1;
        player.units.total = 2;
        player.units.use = 0;
        player.units.base = 0;
        player.units.exp = 0;
    };
};

function resetgame() {
    player.x = 1;
    player.term = 1;
    player.units.total = 2;
    player.units.use = 0;
    player.units.base = 0;
    player.units.exp = 0;
    player.mult.now = 1;
    player.mult.next = 1;
    player.calc.term = 1;
    player.calc.base = 1;
    player.calc.exp = 1;
    player.calc.result = 1;
    player.calc.final = 1;
    player.cooldown = 3;
    player.up1.cost = 1500;
    player.up1.level = 0;
    player.up1.effect = 1;
    player.up2.cost = 5000;
    player.up2.level = 0;
    player.up3.cost = 1e9;
    player.up3.level = 0;
    player.up3.effectbase = 1;
    player.up3.effectexp = 1;
    player.up4.cost = 5.55e20;
    player.up4.level = 0;
    player.up4.effect = 0.94;
    player.up5.cost = 3.15227e27;
    player.up5.level = 0;
    player.up5.effect = 1;
    player.cheaper.req = 1e45;
    player.cheaper.effect = 0.97;
    player.cheaper.mult = 1e10;
    player.autoterm = false;
    player.Xrecord = 1;
};