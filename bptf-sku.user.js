// ==UserScript==
// @name backpack.tf SKU Extractor
// @namespace https://github.com/oishikm12
// @version 1.0.0
// @description Attempts to extract SKU from a stat page
// @match https://backpack.tf/stats/*
// @downloadURL https://github.com/oishikm12/bptf-sku/raw/master/bptf-sku.user.js
// @updateURL https://github.com/oishikm12/bptf-sku/raw/master/bptf-sku.meta.js
// @copyright 2020+, Oishik
// @run-at document-end
// ==/UserScript==

const qualities = {
    "Normal": 0,
    "Genuine": 1,
    "rarity2": 2,
    "Vintage": 3,
    "rarity3": 4,
    "Unusual": 5,
    "Unique": 6,
    "Community": 7,
    "Developer": 8,
    "Self-Made": 9,
    "Customized": 10,
    "Strange": 11,
    "Completed": 12,
    "Haunted": 13,
    "Collector's": 14,
    "Decorated Weapon": 15
}

const wears = {
    "Factory New": 1,
    "Minimal Wear": 2,
    "Field-Tested": 3,
    "Well-Worn": 4,
    "Battle Scarred": 5
}

const skins = {
    "Red Rock Roscoe": 0,
    "Wrapped Reviver Mk.II": 102,
    "Carpet Bomber Mk.II": 104,
    "Masked Mender Mk.II": 105,
    "Woodland Warrior Mk.II": 106,
    "Forest Fire Mk.II": 109,
    "King of the Jungle": 10,
    "Backwoods Boomstick Mk.II": 112,
    "Woodsy Widowmaker Mk.II": 113,
    "Night Owl Mk.II": 114,
    "Night Terror": 11,
    "Iron Wood Mk.II": 120,
    "Plaid Potshotter Mk.II": 122,
    "Backwoods Boomstick": 12,
    "Bovine Blazemaker Mk.II": 130,
    "Civil Servant Mk.II": 139,
    "Woodsy Widowmaker": 13,
    "Smalltown Bringdown Mk.II": 143,
    "Civic Duty Mk.II": 144,
    "Night Owl": 14,
    "Dead Reckoner Mk.II": 151,
    "Tartan Torpedo": 15,
    "Autumn Mk.II": 160,
    "Nutcracker Mk.II": 161,
    "Macabre Web Mk.II": 163,
    "Rustic Ruiner": 16,
    "Barn Burner": 17,
    "Homemade Heater": 18,
    "Lumber From Down Under": 19,
    "Sand Cannon": 1,
    "Bloom Buffed": 200,
    "Quack Canvassed": 201,
    "Bank Rolled": 202,
    "Merc Stained": 203,
    "Kill Covered": 204,
    "Fire Glazed": 205,
    "Pizza Polished": 206,
    "Bonk Varnished": 207,
    "Star Crossed": 208,
    "Clover Camo'd": 209,
    "Iron Wood": 20,
    "Freedom Wrapped": 210,
    "Cardboard Boxed": 211,
    "Dream Piped": 212,
    "Miami Element": 213,
    "Neo Tokyo": 214,
    "Geometrical Teams": 215,
    "Bomber Soul": 217,
    "Uranium": 218,
    "Country Crusher": 21,
    "Cabin Fevered": 220,
    "Polar Surprise": 221,
    "Hana": 223,
    "Dovetailed": 224,
    "Cosmic Calamity": 225,
    "Hazard Warning": 226,
    "Mosaic": 228,
    "Plaid Potshotter": 22,
    "Jazzy": 230,
    "Alien Tech": 232,
    "Damascus & Mahogany": 234,
    "Skull Study": 235,
    "Haunted Ghosts": 236,
    "Spectral Shimmered": 237,
    "Spirit of Halloween": 238,
    "Horror Holiday": 239,
    "Shot in the Dark": 23,
    "Totally Boned": 240,
    "Electroshocked": 241,
    "Ghost Town": 242,
    "Tumor Toasted": 243,
    "Calavera Canvas": 244,
    "Snow Covered": 245,
    "Frost Ornamented": 246,
    "Smissmas Village": 247,
    "Igloo": 248,
    "Seriously Snowed": 249,
    "Blasted Bombardier": 24,
    "Smissmas Camo": 250,
    "Sleighin' Style": 251,
    "Alpine": 252,
    "Gift Wrapped": 253,
    "Winterland Wrapped": 254,
    "Reclaimed Reanimator": 25,
    "Antique Annihilator": 26,
    "Old Country": 27,
    "American Pastoral": 28,
    "Backcountry Blaster": 29,
    "Wrapped Reviver": 2,
    "Yeti Coated": 300,
    "Park Pigmented": 301,
    "Mannana Peeled": 302,
    "Macaw Masked": 303,
    "Sax Waxed": 304,
    "Anodized Aloha": 305,
    "Bamboo Brushed": 306,
    "Tiger Buffed": 307,
    "Croc Dusted": 308,
    "Piña Polished": 309,
    "Bovine Blazemaker": 30,
    "Leopard Printed": 310,
    "War Room": 31,
    "Treadplate Tormenter": 32,
    "Bogtrotter": 33,
    "Earth, Sky and Fire": 34,
    "Hickory Hole-Puncher": 35,
    "Spruce Deuce": 36,
    "Team Sprayer": 37,
    "Rooftop Wrangler": 38,
    "Dragon Slayer": 390,
    "Smissmas Sweater": 391,
    "Civil Servant": 39,
    "Psychedelic Slugger": 3,
    "Citizen Pain": 40,
    "Local Hero": 41,
    "Mayor": 42,
    "Smalltown Bringdown": 43,
    "Civic Duty": 44,
    "Liquid Asset": 45,
    "Black Dahlia": 46,
    "Lightning Rod": 47,
    "Pink Elephant": 48,
    "Flash Fryer": 49,
    "Carpet Bomber": 4,
    "Spark of Life": 50,
    "Dead Reckoner": 51,
    "Shell Shocker": 52,
    "Current Event": 53,
    "Turbine Torcher": 54,
    "Brick House": 55,
    "Sandstone Special": 56,
    "Aqua Marine": 57,
    "Low Profile": 58,
    "Thunderbolt": 59,
    "Masked Mender": 5,
    "Autumn": 60,
    "Nutcracker": 61,
    "Pumpkin Patch": 62,
    "Macabre Web": 63,
    "Boneyard": 64,
    "Wildwood": 65,
    "Balloonicorn": 66,
    "Rainbow": 91,
    "Sweet Dreams": 68,
    "Blue Mew": 69,
    "Woodland Warrior": 6,
    "Brain Candy": 70,
    "Stabbed to Hell": 71,
    "Flower Power": 72,
    "Mister Cuddles": 73,
    "Shot to Hell": 74,
    "Torqued to Hell": 75,
    "Coffin Nail": 93,
    "Top Shelf": 77,
    "Dressed to Kill": 78,
    "High Roller's": 79,
    "Purple Range": 7,
    "Warhawk": 80,
    "Blitzkrieg": 81,
    "Airwolf": 82,
    "Corsair": 83,
    "Butcher Bird": 84,
    "Killer Bee": 92,
    "Red Bear": 86,
    "Sudden Flurry": 8,
    "Forest Fire": 9
}

const TEMPLATE = {
    defindex: 0,
    quality: 0,
    craftable: true,
    australium: false,
    killstreak: 0,
    festive: false, // this is festivized
    effect: null,
    skin: null,
    wear: null,
    elevated: null,
    target: null,
    craftnumber: null,
    crateseries: null,
    output: null,
    outputQuality: null,
};

/**
 * Returns the trimmed name from a backpack.tf stats URL
 * @param {String} url An Url to parse
 * @return {String} The name
 */
function urlName(url) {
    return decodeURI(url.replace(/^.+stats\/(Strange%20Decorated%20Weapon|Strange%20Unusual|Genuine|Vintage|Unusual|Unique|Strange|Haunted|Collector%27s|Self-Made|Decorated%20Weapon)\//, '').replace(/\/.*/, '').replace(/%3A/g, ':').replace(/%2C/g, ',').replace(/%27/g, '\''));
}

/**
 * Extracts skin name as well as id from name
 * @param {String} name Entire name to search
 * @return {Array} [skin, id]
 */
function getSkin(name) {
    for (const skin in skins) {
        if (name.startsWith(skin)) return [skin, skins[skin]];
    }
    return [null, null];
}

/**
 * Finds id of quality
 * @param {String} name Quality string
 * @return {Number} Id of quality
 */
function getQuality(name) {
    const id = qualities[name];
    if (id === undefined) return null;
    else return id;
}

/**
 * Finds id of wear
 * @param {String} name Wear string
 * @return {Number} Id of wear
 */
function getWear(name) {
    const id = qualities[name];
    if (id === undefined) return null;
    else return id;
}

/**
 * Extracts defindex from listings
 */
function determineDefindex() {
    let defTargets = document.getElementsByClassName('listing-item');
    let def = null;
    for (let i = 0; i < defTargets.length; i++) {
        let children = defTargets[i].childNodes;
        if (children[1] != undefined) {
            def = Number(children[1].dataset.defindex);
            break;
        }
    }
    return def;
}

/**
 * Generates SKU for an item
 * @param {Object} item Properties of items
 * @return {String} Sku
 */
function generateSKU(item) {
    const forma = JSON.parse(JSON.stringify(TEMPLATE));

    for (const attrib in item) {
        if (!Object.prototype.hasOwnProperty.call(item, attrib)) continue;
        forma[attrib] = item[attrib];
    }

    let sku = `${item.defindex};${item.quality}`;

    if (item.effect) {
        sku += `;u${item.effect}`;
    }
    if (item.australium === true) {
        sku += ';australium';
    }
    if (item.craftable === false) {
        sku += ';uncraftable';
    }
    if (item.wear) {
        sku += `;w${item.wear}`;
    }
    if (item.skin) {
        sku += `;pk${item.skin}`;
    }
    if (item.elevated == 11) {
        sku += ';strange';
    }
    if (typeof item.killstreak === 'number' && item.killstreak !== 0) {
        sku += `;kt-${item.killstreak}`;
    }
    if (item.target) {
        sku += `;td-${item.target}`;
    }
    if (item.festive === true) {
        sku += ';festive';
    }
    if (item.craftnumber) {
        sku += `;n${item.craftnumber}`;
    }
    if (item.crateseries) {
        sku += `;c${item.crateseries}`;
    }
    if (item.output) {
        sku += `;od-${item.output}`;
    }
    if (item.outputQuality) {
        sku += `;oq-${item.outputQuality}`;
    }

    return sku;
}

/**
 * Determines how to generate SKU
 */
function target() {
    const targets = [
        document.querySelector("#page-content > div.row > div > div.stats-body > div.stats-subheader > div > a:nth-child(1)"),
        document.querySelector("#page-content > div.row > div > div.stats-body > div.stats-subheader > div > a:nth-child(2)"),
        document.querySelector("#page-content > div.row > div > div.stats-body > div.stats-subheader > div > a:nth-child(3)"),
    ];

    let flag = false;

    targets.forEach((element) => {
        if (element && element.href.startsWith('https://marketplace.tf')) {
            extractFromMptf(element.href);
            flag = true;
        }
    });

    if (flag == false) {
        extractFromUrl(window.location.href);
    }
}

/**
 * Copies sku to clipboard
 */
function copyClipboard() {
    const text = document.getElementById("copyThis").innerText.replace('SKU -', '').trim();
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.error('Oops, unable to copy', err);
    }
}

/**
 * Displays SKU on page
 * @param {String} stuff
 */
function display(stuff) {
    if (stuff !== null) {
        const position = document.getElementsByClassName("price-boxes");
        const data = `
        <a href="#" id="copyThis" class="price-box" style="height:51px;">
            <div class="icon">
                <i class="fa fa-plus"></i>
            </div>
            <div class="text" style="margin-top: 1rem">
                <div class="value">SKU - ${stuff}</div>
            </div>
        </a>
        `;
        position[0].innerHTML += data;
    }
    const myDiv = document.querySelector("#copyThis");
    if (myDiv) {
        myDiv.addEventListener("click", copyClipboard, false);
    }
}

/**
 * Determines sku from marketplace.tf
 * @param {String} url Marketplace.tf Url
 */
function extractFromMptf(url) {
    const sku = url.replace('https://marketplace.tf/partneritem?', '').split('&')[0];
    display(sku.replace('sku=', '').trim());
}

/**
 * Determines sku from stat url
 * @param {String} url Backpack.tf url
 */
function extractFromUrl(url) {
    const parts = url.split('/');
    let trimname = urlName(url);
    let obj = {
        tradable: true,
    };
    const qualString = decodeURI(parts[4]);

    if (qualString == 'Strange Unusual') {
        obj.quality = 5;
        obj.elevated = 11;
    } else if (qualString == 'Strange Decorated Weapon') {
        obj.quality = 15;
        obj.elevated = 11;
    } else {
        obj.quality = getQuality(qualString);
    }

    obj.effect = parts[parts.length - 1];

    if (isNaN(obj.effect) == true) {
        obj.craftable = obj.effect == 'Non-Craftable' ? false : true;
        obj.effect = undefined;
    } else if (obj.effect.includes('-')) {
        obj.craftable = parts[parts.length - 2] == 'Non-Craftable' ? false : true;
        const cat = obj.effect.split('-');
        if (cat.length == 2) {
            if (trimname == 'Chemistry Set') { // basic chemistry set
                obj.output = cat[0];
                obj.outputQuality = cat[1];
            } else { // basic kit
                obj.target = cat[1];
            }
        } else {
            // strangifier chemistry kit, basic fabricator
            obj.output = cat[0];
            obj.outputQuality = cat[1];
            obj.target = cat[2];
        }
        obj.effect = undefined;
    } else {
        obj.craftable = parts[parts.length - 2] == 'Non-Craftable' ? false : true;
        if (trimname == 'Strangifier') {
            obj.target = Number(obj.effect);
        }
        if (obj.quality == 5) obj.effect = Number(obj.effect);
        else {
            obj.crateseries = Number(obj.effect);
            obj.effect = null; // otherwise we would get crates too
        }
    }

    if (trimname.startsWith('Festivized ')) {
        obj.festive = true;
        trimname = trimname.replace('Festivized ', '');
    }

    if (trimname.startsWith('Australium ') && obj.quality == 11) {
        obj.australium = true;
        trimname = trimname.replace('Australium ', '');
    }

    if (trimname.startsWith('Professional Killstreak ')) {
        obj.killstreak = 3;
        trimname = trimname.replace('Professional Killstreak ', '');
    } else if (trimname.startsWith('Specialized Killstreak ')) {
        obj.killstreak = 2;
        trimname = trimname.replace('Specialized Killstreak ', '');
    } else if (trimname.startsWith('Killstreak ')) {
        obj.killstreak = 1;
        trimname = trimname.replace('Killstreak ', '');
    } else {
        obj.killstreak = 0;
    }

    const wear = trimname.substring(trimname.indexOf('(') + 1, trimname.lastIndexOf(')'));
    const wearId = getWear(wear);
    if (wearId != undefined) {
        obj.wear = wearId;
        trimname = trimname.replace('(' + wear + ')', '').trim();
        const [skin, id] = getSkin(trimname);
        if (skin != null) {
            obj.skin = id;
            trimname = trimname.replace(skin + ' ', '');
        }
    }

    console.log(trimname.trim());

    obj.defindex = determineDefindex();
    if (obj.defindex == null) {
        display(null);
    } else {
        display(generateSKU(obj));
    }
}

target();