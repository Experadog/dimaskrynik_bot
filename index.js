const { 
  Telegraf,
  Markup
} = require('telegraf');

require("dotenv").config();
const text = require("./const")

const { message } = require('telegraf/filters');



const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Здарова ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!`));
bot.help((ctx) => ctx.reply(text.commands));
bot.command("list", async (ctx) => {
  try {
    await ctx.replyWithHTML("<b>Список Дэбиов</b>", Markup.inlineKeyboard(
      [
        [Markup.button.callback("Чома", "btn_1"), Markup.button.callback("Руслик", "btn_2")], 
        [Markup.button.callback("Грач", "btn_3"),Markup.button.callback("Дрынчикс", "btn_4")],
        [Markup.button.callback("КолямБИЧ", "btn_5"),Markup.button.callback("СэрГей", "btn_6")],
      ]
    ))
  } catch(e) {
    console.error(e)
  }
})

function addActionBot(name, src, text) {
  bot.action(name, async (ctx) => {
    try {
      await ctx.answerCbQuery()
      if(src) {
        await ctx.replyWithPhoto({
          source: src
        })
      }
      await ctx.replyWithHTML(text, {
        disable_web_page_preview: true
      })
    } catch(e) {
      console.error(e)
    }
  })
}

addActionBot("btn_1", "./assets/чома.jpg", text.text1)
addActionBot("btn_2", "./assets/руслик.jpg", text.text2)
addActionBot("btn_3", "./assets/грач.jpg", text.text3)
addActionBot("btn_4", "./assets/влад.jpg", text.text4)
addActionBot("btn_5", "./assets/коля.jpg", text.text5)
addActionBot("btn_6", "./assets/серега.jpg", text.text6)

bot.launch();
// bot.start((ctx) => ctx.reply('Ну здарова, свинота'));
// bot.on(message('sticker'), (ctx) => ctx.reply('🖕'));
// bot.hears('здарова', (ctx) => ctx.reply('здоровее видали'));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));