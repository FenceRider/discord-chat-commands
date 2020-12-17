fs = require('fs')
const Discord = require("discord.js");
const client = new Discord.Client();
client.on('ready', function () { console.log('ready') })
client.on('error', function (e) { console.log("error", e) })

try {
    let data = fs.readFileSync("./creds.json");
    let creds = JSON.parse(data);
    client.login(creds.token);
} catch (e) {
    console.log("error reading ./creds.json", e);
}

client.on('message', (m) => {
    //must be from me and be in form <effect> <args>~<msg>
    try {
        if (m.author.id != client.user.id || m.content.match(/[^\s]+(\s[^\s]+)*~.*/).length == 0) return;
        let parts = m.content.split("~");
        let effect_parts = parts[0].split(" "); //get effect and args
        let content = parts[1];
        effects[effect_parts.shift()](m, content, ...effect_parts);
    } catch (e) {
        console.log("error while parsing command, please check your syntax");
    }
});


let effects = {

    rotate: function (m, content, count) {
        var interval;
        var a = ("" + content + "");
        function hi() {
            if (count-- < 0) {
                clearInterval(interval);
            }
            var out = a.substring(1);
            out = out + a.substring(0, 1);
            a = out;
            m.edit(out).then(() => { });
        }
        interval = setInterval(hi, 1000);
    },

    hungry(m, content) {
        var interval;
        var strmsg = (content);
        var a = true;
        var n = 1;
        function hi() {
            if (n++ > strmsg.length) { clearInterval(interval); m.delete(); return;}
            if (a) { n--; }
            var out = ' .'.repeat(n - 1) + ((a) ? '<' : '-');
            a = !a;
            out += strmsg.substring(n);
            m.edit(out);
        }
        
        interval = setInterval(hi, 1000);
    },

    reveal: function (m, content) {
        var interval;
        var strmsg = "";
        m.edit("");
        var a = true;
        var n = 0;
        function hi() {
            if (n++ > content.length+1) { clearInterval(interval); }
            var out = strmsg;
            out += content.substring(0, n)
            m.edit(out.length <= 0 ? "." : out)
        }
        interval = setInterval(hi, 1000);
    },

    wrap: function (m, content, count, wrap_a, wrap_b) {
        var interval;
        var strmsg = content;
        var isa = true;
        function hi() {
            if (count-- < 0) { clearInterval(interval); }
            var out = "";
            if (isa) {
                out = wrap_a + strmsg + wrap_a;
            } else {
                out = wrap_b + strmsg + wrap_b;
            }
            isa = !isa;
            m.edit(out)
        }
        interval = setInterval(hi, 1000);
    },

    wof: function (m) {
        var wheel = ":three:  :broken_heart:  :broken_heart:  :broken_heart:  :zero:  :one:  :two:  :two:  :one:  :zero:  :zero:  :zero:  :zero:  :star:  :zero:  :zero:  :zero:  :zero:  :zero:  :one:  :two:  :two:  :one:  :zero:  :broken_heart:  :broken_heart:  :broken_heart:  :three:"
        var vel = 10;
        var x = 1;
        absolutex = 1;
        function hi() {
            if (vel < 0) { clearInterval(interval); }
            var out = wheel + '\n';
            out += ' :heavy_minus_sign: '.repeat(27 - x);
            out += ' :arrow_up_small: ';
            out += ' :heavy_minus_sign: '.repeat(x);
            vel -= Math.floor(Math.random() * 2);;

            x += vel;
            if (x >= 28) {
                x %= 28;
            }

            //absolutex += vel;
            //x = absolutex%8;
            m.edit(out);
        }
        interval = setInterval(hi, 1000);
    }

}