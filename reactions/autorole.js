const Discord = require("discord.js")

module.exports = {
    name: "autorole",

    run: async(client,dados) => {
        let servidor = await client.guilds.fetch("831483672065736704")
        let membro = await servidor.members.fetch(dados.d.user_id)
    
        let cargo1= await servidor.roles.fetch("832369903951675473")
        let cargo2= await servidor.roles.fetch("925546014193090600")
    
        if(dados.t === "MESSAGE_REACTION_ADD"){
            if(dados.d.emoji.id === "832674924295487519"){
                if(membro.roles.cache.has(cargo1)) return
                membro.roles.add(cargo1)
                membro.roles.remove(cargo2)
            }else if(dados.d.emoji.id === "832675528544354385"){
                if(membro.roles.cache.has(cargo2)) return
                membro.roles.add(cargo2)
                membro.roles.remove(cargo1)
                 
            }
            
        }

    }
}

