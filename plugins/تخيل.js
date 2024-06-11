/* 
رقم المطور للإستفادة من أوامر اخرى :
 
+967776358825 
 
coding by BK9 <3 for free, Enjoy.
*/
 
import fetch from 'node-fetch';

const handler = async (m, {conn, text}) => {
    const datas = global
    const idioma = datas.db.data.users[m.sender].language
    const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
    const tradutor = _translate.BK9.BK9

    if (!text) throw "يـرجـى إدخـال نـص، مـثـال\n .bk9img بيت ازرق في طبيعة خلابة";

  await conn.sendMessage(m.chat, {text: "يتم التحميل ..."}, {quoted: m});

  try {
    const BK9 = `https://api.bk9.site/ai/photoleap?q=${encodeURIComponent(text)}`;
    const response = await fetch(BK9);
    const result = await response.json();


    if (result.status) {
      await conn.sendMessage(m.chat, {image: {url: result.BK9}}, {quoted: m});
    } 
  } catch (error) {
    throw "فشل في إنشاء الصورة. الرجاء معاودة المحاولة في وقت لاحق.";
  }
};

handler.command = ['تخيل'];
handler.tags = ['ai'];
export default handler;
