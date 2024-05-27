import util from 'util'
import path from 'path'
let user = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata, command, conn, text, usedPrefix}) {
if (!text) throw `*أدخــل الـسـؤال !*`
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let x = `${pickRandom(['احــتـمـال قـلـيـل' 'هل انت ممحون او لا جاوب هههه🤣😭' 'لالالالالاااا' 'اول شي كم عمرك يروحي هه, ,قم يا ابني بصرعك اير بين العيون, ,'نــعم بـالـتـأكـيد', 'لا أعـتـقـد', 'مــستـحـيــل'])}`
let l = Math.floor(Math.random() * x.length);
let top = `*هــل ${text}*
*الــأجــابـه :* ${x}`.trim()
conn.sendFile (m.reply (top, null, { mentions: [a]}))}
handler.help = handler.command = ['هل'|'تحبني']
handler.tags = ['fun']
handler.group = true
handler.limit = 0
export default handler
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}
