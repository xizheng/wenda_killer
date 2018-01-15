var request = require('request')
var redis = require("redis"),
    client = redis.createClient();
client.on("error", function (err) {
    console.log("Error " + err);
});

var options_xigua = {
    url: 'http://wd.sa.sogou.com/api/ans?key=xigua',
    headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C202 Sogousearch/Ios/5.9.7',
        'referer': 'http://wd.sa.sogou.com/',
        'Cookie': 'vrpos=R71mqrGbpODh9V6n8HOJb70y2V4Trj8JQWD9Gvxm9MU=; dt_ssuid=6277428700; usid=ex-hDNi__ymfhoZU; FREQUENCY=1515816551863_1; ld=plllllllll2zQYBulllllVIBPuYlllllNn3uqkllll9lllllRylll5@@@@@@@@@@; wuid=AAEm8FKkHQAAAAqROm/rvgsAZAM=; SNUID=31CE8513686205C8EC652ECE681749AB; SUID=56A6E2742513910A000000005A598666; IPLOC=CN3100; SUV=00F52C4874E2812D5A584227E861B755'
    }
};
var options_huajiao = {
    url: 'http://wd.sa.sogou.com/api/ans?key=huajiao',
    headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C202 Sogousearch/Ios/5.9.7',
        'referer': 'http://wd.sa.sogou.com/',
        'Cookie': 'vrpos=R71mqrGbpODh9V6n8HOJb70y2V4Trj8JQWD9Gvxm9MU=; dt_ssuid=6277428700; usid=ex-hDNi__ymfhoZU; FREQUENCY=1515816551863_1; ld=plllllllll2zQYBulllllVIBPuYlllllNn3uqkllll9lllllRylll5@@@@@@@@@@; wuid=AAEm8FKkHQAAAAqROm/rvgsAZAM=; SNUID=31CE8513686205C8EC652ECE681749AB; SUID=56A6E2742513910A000000005A598666; IPLOC=CN3100; SUV=00F52C4874E2812D5A584227E861B755'
    }
};
var options_cddh = {
    url: 'http://wd.sa.sogou.com/api/ans?key=cddh',
    headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C202 Sogousearch/Ios/5.9.7',
        'referer': 'http://wd.sa.sogou.com/',
        'Cookie': 'vrpos=R71mqrGbpODh9V6n8HOJb70y2V4Trj8JQWD9Gvxm9MU=; dt_ssuid=6277428700; usid=ex-hDNi__ymfhoZU; FREQUENCY=1515816551863_1; ld=plllllllll2zQYBulllllVIBPuYlllllNn3uqkllll9lllllRylll5@@@@@@@@@@; wuid=AAEm8FKkHQAAAAqROm/rvgsAZAM=; SNUID=31CE8513686205C8EC652ECE681749AB; SUID=56A6E2742513910A000000005A598666; IPLOC=CN3100; SUV=00F52C4874E2812D5A584227E861B755'
    }
};
var options_zscr = {
    url: 'http://wd.sa.sogou.com/api/ans?key=zscr',
    headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C202 Sogousearch/Ios/5.9.7',
        'referer': 'http://wd.sa.sogou.com/',
        'Cookie': 'vrpos=R71mqrGbpODh9V6n8HOJb70y2V4Trj8JQWD9Gvxm9MU=; dt_ssuid=6277428700; usid=ex-hDNi__ymfhoZU; FREQUENCY=1515816551863_1; ld=plllllllll2zQYBulllllVIBPuYlllllNn3uqkllll9lllllRylll5@@@@@@@@@@; wuid=AAEm8FKkHQAAAAqROm/rvgsAZAM=; SNUID=31CE8513686205C8EC652ECE681749AB; SUID=56A6E2742513910A000000005A598666; IPLOC=CN3100; SUV=00F52C4874E2812D5A584227E861B755'
    }
};

function callback_xigua(error, response, body) {
    if (!error && response.statusCode == 200) {
        client.set("sg_xigua",body,redis.print)
    }
}
function callback_huajiao(error, response, body) {
    if (!error && response.statusCode == 200) {
        client.set("sg_huajiao",body,redis.print)
    }
}
function callback_cddh(error, response, body) {
    if (!error && response.statusCode == 200) {
        client.set("sg_cddh",body,redis.print)
    }
}
function callback_zscr(error, response, body) {
    if (!error && response.statusCode == 200) {
        client.set("sg_zscr",body,redis.print)
    }
}

setInterval(() => {
request(options_xigua, callback_xigua);
request(options_huajiao, callback_huajiao);
request(options_cddh, callback_cddh);
request(options_zscr, callback_zscr);
request('http://crop-answer.sm.cn/answer/curr?format=json&activity=million', function (error1, response1, body1) {
    if (!error1 && response1.statusCode == 200) {
        client.set("uc_xigua",body1,redis.print)
    }
})
}, 200)
