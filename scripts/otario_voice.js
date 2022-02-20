UI.AddCheckbox("Otario voice")
UI.AddCheckbox("Loopback")

var total_kills = 0
var started = 0.0;
var playing = false;
var path = "D:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\csgo\\sound\\otario\\"

var get = {
    value(v) {
        return UI.GetValue("Misc", "JAVASCRIPT", "Script items", v);
    },

    string(s) {
        return UI.GetString("Misc", "JAVASCRIPT", "Script items", s);
    }
}

function OnPlayerDeath() {
    attacker = Event.GetInt("attacker");
    victim = Event.GetInt("userid");

    attacker_index = Entity.GetEntityFromUserID(attacker);
    victim_index = Entity.GetEntityFromUserID(victim);

    attacker_name = Entity.GetName(attacker_index);
    victim_name = Entity.GetName(victim_index);

    attacker_me = Entity.IsLocalPlayer(attacker_index);
    victim_me = Entity.IsLocalPlayer(victim_index)
    victim_enemy = Entity.IsEnemy(victim_index);

    if(victim_me)
    {
        // started = Global.Realtime();
        // playing = true;
        // // if (get.value("Loopback"))
        // // {
        // //     Global.ExecuteCommand("voice_loopback 1");
        // // } 
        //  Sound.PlayMicrophone(path + 'knife3.wav');
         total_kills = 0;
    }
    if (attacker_me) {
        total_kills += 1
        var kill_sound = "";

        if (get.value("Otario voice")) {
            started = Global.Realtime();
            playing = true;
            if (get.value("Loopback"))
            {
                Global.ExecuteCommand("voice_loopback 1");
            } 
     
            switch (total_kills) 
            {
                case 1:
                    Sound.PlayMicrophone(path + 'firstblood3.wav');
                break;
                case 2:
                    Sound.PlayMicrophone(path + 'doublekill2.wav');
                break;
                case 3:
                    Sound.PlayMicrophone(path + 'hattrick.wav');
                break;
                case 4:
                    Sound.PlayMicrophone(path + 'multikill.wav');
                break;
                case 5:
                    Sound.PlayMicrophone(path + 'godlike.wav');
                break;
                case 6:
                    Sound.PlayMicrophone(path + 'ownage.wav');
                break;
                case 7:
                    Sound.PlayMicrophone(path + 'triplekill.wav');
                break;
                case 8:
                    Sound.PlayMicrophone(path + 'triplekill.wav');
                break;
                case 9:
                    Sound.PlayMicrophone(path + 'triplekill.wav');
                break;
                case 10:
                    Sound.PlayMicrophone(path + 'triplekill.wav');
                    total_kills = 0;
                break;
            }
        }
    }
}

function RoundStart()
{
    started = Global.Realtime();
    playing = true;

    if (get.value("Loopback"))
    {
        Global.ExecuteCommand("voice_loopback 1");
    } 
    Sound.PlayMicrophone('D:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\csgo\\sound\\otario\\prepare3.wav');
}

function OnRoundEnd()
{
    // total_kills = 0;
}

function Reset()
{
    if (playing && Math.abs(started + 3.0 - Global.Realtime()) <= 0.05)
    {
        Sound.StopMicrophone();
        Global.ExecuteCommand("voice_loopback 0");
    }
}

Global.RegisterCallback("player_death", "OnPlayerDeath");
// Global.RegisterCallback("round_start", "RoundStart");
Global.RegisterCallback("round_end", "OnRoundEnd");
Global.RegisterCallback("FrameStageNotify", "Reset");