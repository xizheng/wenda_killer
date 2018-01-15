const express = require('express')
const serveStatic = require('serve-static')
const SseStream = require('ssestream')
const request = require('request')

const app = express()
app.use(serveStatic(__dirname))
app.get('/sse', (req, res) => {
  console.log('new connection')

  const sseStream = new SseStream(req)
  sseStream.pipe(res)
  var id_xigua = ''
  var uc_xigua = ''
  var id_huajiao = ''
  var id_cddh = ''
  var id_zscr = ''
  var result11 = ''
  request.cookie('vrpos=R71mqrGbpODh9V6n8HOJb70y2V4Trj8JQWD9Gvxm9MU=; dt_ssuid=6277428700; usid=ex-hDNi__ymfhoZU; FREQUENCY=1515816551863_1; ld=plllllllll2zQYBulllllVIBPuYlllllNn3uqkllll9lllllRylll5@@@@@@@@@@; wuid=AAEm8FKkHQAAAAqROm/rvgsAZAM=; SNUID=31CE8513686205C8EC652ECE681749AB; SUID=56A6E2742513910A000000005A598666; IPLOC=CN3100; SUV=00F52C4874E2812D5A584227E861B755')
  
  const pusher = setInterval(() => {

    var options_xigua = {
    url: 'http://wd.sa.sogou.com/api/ans?key=xigua',
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C202 Sogousearch/Ios/5.9.7',
      'referer': 'http://wd.sa.sogou.com/'
    }
    };
    function callback_xigua(error, response, body) {
      console.log(body)
      console.log(response)
      if (!error && response.statusCode == 200) {
        var info1 = JSON.parse(body)
        var result1 = JSON.parse(info1.result[1])
        if (result1.result=="啊呀，这题汪仔还在想"){
          result1.result = "这题我不会，靠你了"
        }
        if (id_xigua=='' || id_xigua!=result1.cd_id){
           sseStream.write({
             event: 'xigua',
             data: result1.title+'\n【AI答案】:'+'【'+result1.result+'】'
           })
           id_xigua = result1.cd_id
        }
      }
    }
    request(options_xigua, callback_xigua);

    request('http://crop-answer.sm.cn/answer/curr?format=json&activity=million', function (error1, response1, body1) {
         if (!error1 && response1.statusCode == 200) {
           var info11 = JSON.parse(body1)
           if (info11.data.round){
             result11 = info11.data.options[parseInt(info11.data.correct)].title
           }
           if (info11.data.round && uc_xigua!=info11.data.round){
           sseStream.write({
             event: 'xigua',
             data: info11.data.round+'. '+info11.data.title+'【枪手答案】:【'+result11+'】'
           })
           uc_xigua = info11.data.round
           }

         }
        }) 
  //   var options_huajiao = {
  //   url: 'http://wd.sa.sogou.com/api/ans?key=huajiao',
  //   headers: {
  //     'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C202 Sogousearch/Ios/5.9.7'
  //   }
  //   };
  //   function callback_huajiao(error, response, body) {
  //     if (!error && response.statusCode == 200) {
  //       var info2 = JSON.parse(body)
  //       var result2 = JSON.parse(info2.result[1])
  //       if (result2.result=="啊呀，这题汪仔还在想"){
  //         result2.result = "这题我不会，靠你了"
  //       }
  //       if (id_huajiao=='' || id_huajiao!=result2.cd_id){
  //         sseStream.write({
  //           event: 'huajiao',
  //           data: result2.title+'\n【答案】:【'+result2.result+'】'
  //         })
  //         id_huajiao = result2.cd_id
  //       }
  //     }
  //   }
  //   request(options_huajiao, callback_huajiao);

  //   var options_cddh = {
  //   url: 'http://wd.sa.sogou.com/api/ans?key=cddh',
  //   headers: {
  //     'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C202 Sogousearch/Ios/5.9.7'
  //   }
  //   };
  //   function callback_cddh(error, response, body) {
  //     if (!error && response.statusCode == 200) {
  //       var info3 = JSON.parse(body)
  //       var result3 = JSON.parse(info3.result[1])
  //       if (result3.result=="啊呀，这题汪仔还在想"){
  //         result3.result = "这题我不会，靠你了"
  //       }
  //       if (id_cddh=='' || id_cddh!=result3.cd_id){
  //         sseStream.write({
  //           event: 'cddh',
  //           data: result3.title+'\n【答案】:【'+result3.result+'】'
  //         })
  //         id_cddh = result3.cd_id
  //       }
  //     }
  //   }
  //   request(options_cddh, callback_cddh);
  //   var options_zscr = {
  //   url: 'http://wd.sa.sogou.com/api/ans?key=zscr',
  //   headers: {
  //     'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_2 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C202 Sogousearch/Ios/5.9.7'
  //   }
  //   };
  //   function callback_zscr(error, response, body) {
  //     if (!error && response.statusCode == 200) {
  //       var info4 = JSON.parse(body)
  //       var result4 = JSON.parse(info4.result[1])
  //       if (result4.result=="啊呀，这题汪仔还在想"){
  //         result4.result = "这题我不会，靠你了"
  //       }
  //       if (id_zscr=='' || id_zscr!=result4.cd_id){
  //         sseStream.write({
  //           event: 'zscr',
  //           data: result4.title+'\n【答案】:【'+result4.result+'】'
  //         })
  //         id_zscr = result4.cd_id
  //       }
  //     } 
  //   }   
  //   request(options_zscr, callback_zscr);
  }, 500)

  res.on('close', () => {
    console.log('lost connection')
    clearInterval(pusher)
    sseStream.unpipe(res)
  })
})

app.listen(80, (err) => {
  if (err) throw err
  console.log('server ready on http://localhost:80')
})
