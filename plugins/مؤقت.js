let handler = async (m, { conn }) => {

conn.sendMessage(
    m.chat,
    {
      image: {
        url: "https://telegra.ph/file/c0cad5270a204eb878711.jpg",
      },
      caption: `Here you go!`,
      fileLength: "999",
      viewOnce: true,
    },
    {
      quoted: m,
    },
  );
};
 
handler.help = ['ping']
handler.tags = ['main']
handler.command = ['once']

export default handler


/*
