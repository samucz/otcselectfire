UI.AddCheckbox("uwutario trashtalk");
UI.AddDropdown("Language", ["PORTUGALIA", "LONDON"]);

const niggers = 
[
      "sem ofensa, mas ate com cheats es mau"
    , "quem ser o proximo?"
    , "para deixares de ser mau, dirige-te a otario.tk e podes finalmente ser superior"
    , "««« otario.tk »»» patrocinado por CHENTRIC #CHN"
    , "n fiques irritado, a vida nem sempre corre bem"
    , "otario.tk manda cumprimentos para a tua familia toda"
    , "escrever isto foi demorado, por favor demonstra respeito"
    , "foste com o vento"
    , "sai da frente guedes"
    , "entra em otario.tk e talvez deixes de chorar"
];

const niggers_uk = 
[
      "dont mind me"
    , "I'm just that good"
    , "shooting you with a knife, seems like an easy task"
    , "otario.tk owns me and all"
    , "stress and anger is what you're feeling right now"
    , "you disgust me"
    , "owning"
    , "otario.tk"
    , "Who's next?"
    , "got enough bullets for the whole server"
    , "'fucking mommies since 1999'"
];

function on_player_death() 
{
    if (UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "uwutario trashtalk")) 
    {
        attacker = Event.GetInt("attacker");
        attacker_index = Entity.GetEntityFromUserID(attacker);

        if (attacker_index == Entity.GetLocalPlayer())
        {
            if (UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Language") == 0) 
            {
                const random = Math.floor(Math.random() * niggers.length);
                Global.ExecuteCommand("say " + niggers[random]  + "\n");
            }
            else if(UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Language") == 1) 
            {
                const random = Math.floor(Math.random() * niggers_uk.length);
                Global.ExecuteCommand("say " + niggers_uk[random]  + "\n");
            }
        }
    }
}

Global.RegisterCallback("player_death", "on_player_death");
