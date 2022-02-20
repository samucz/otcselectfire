UI.AddLabel("shit aa fuck onetap.ru")
UI.AddCheckbox("enable");
UI.AddSliderInt("real lean", -60, 60);
UI.AddSliderInt("fake lean", -60, 60);
UI.AddSliderInt("lby", -60, 60);

var jitter_cache = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset") // memory jitter useless but need
var yaw_cache = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset") // // memory yaw player useless but need
var pitch_cache = UI.GetValue("Anti-Aim", "Extra", "Pitch") // need

var conita = false;
var delay = 0;

function randomIntFrom(min, max) // Get a random integer from [min] to [max] 
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function fresh_tick() {
    var old_tick_count;

    if (old_tick_count != Globals.Tickcount()) {
        old_tick_count = Globals.Tickcount();
        return true;
    }

    return false;
}


function main() {
    if (fresh_tick())
        conita = true;
    else
        conita = false;
}

function get_velocity() {
    velocity = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_vecVelocity[0]");
    speed = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
    return speed;
}

function rand_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var wish = {
    real: 0,
    fake: 0,
    lby: 0,
    side: 0,
    limit: 0
};

var local = {
    real: 0,
    fake: 0,
    duck_amount: 0,
    shifting: false,
    air: 0,
    in_air: false,
    cona: false,
    should_legit_aa: false
};

var globals = {
    tick_count: 0,
    cur_time: 0,
    debug: true
}

function update() {

    globals.tick_count = Globals.Tickcount();
    globals.cur_time = Globals.Curtime();
    local.real = Math.floor(Local.GetRealYaw());
    local.fake = Math.floor(Local.GetFakeYaw());
    local.duck_amount = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_flDuckAmount");
    local.air = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_flFallVelocity");
    local.cona = globals.tick_count % 2;
}
function set_wish_angles() {
    AntiAim.SetOverride(1);
    AntiAim.SetRealOffset(wish.real);
    AntiAim.SetFakeOffset(wish.fake);
    AntiAim.SetLBYOffset(wish.lby);
}

function adjust_antiaim() {
    if (local.air <= -1 || local.air >= 1 || Global.IsKeyPressed(0x20))
        local.in_air = true;
    else
        local.in_air = false;

    Global.IsKeyPressed(0x45) ? should_legit_aa = true : should_legit_aa = false;

    if(Global.IsKeyPressed(0x45))
    {
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 180); // if enabled
        UI.SetValue ("Anti-Aim", "Extra", "Pitch", 0)
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0);
        AntiAim.SetOverride(1);
        if (delay)
                wish.real = -90;
            else
                wish.real = 90;
    }
    else
    {
        UI.SetValue("Misc", "PERFORMANCE & INFORMATION", "Restrictions", "0");
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0);
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", jitter_cache);
        UI.SetValue ("Anti-Aim", "Extra", "Pitch", pitch_cache)
        AntiAim.SetOverride(0);
    }

    if(!Global.IsKeyPressed(0x45))
    {
        if (local.in_air) {
            wish.real = 0;
            wish.fake = 15;
            wish.lby = 60;
        }
        else {
            var randomBoolean = Math.random() < 0.5;

              if (delay)
                wish.real = -28;
           else
                 wish.real = 10;
    
            wish.fake = UI.GetValue("Misc", "Javascript", "Script Items", "fake lean");
            wish.lby = UI.GetValue("Misc", "Javascript", "Script Items", "lby");
        }
    }

    set_wish_angles();
}




function create_move() {
    // local.cona = !local.cona;
    delay += 1;

    if (delay == 3)
        delay = 0;

    if (!UI.GetValue("Misc", "Javascript", "Script items", "enable")) {
        AntiAim.SetOverride(0);
        return;
    }

    // if (delay == 1)
    //     UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", true);
    // else if (delay == 2)
    //     UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", false);

   

    update();
    adjust_antiaim();
}

var old_tick_count = 0;

function leg()
{
    if (Globals.Tickcount() - old_tick_count > 3)
    {
        if (UI.GetValue("Misc", "GENERAL", "Movement", "Slide walk"))
            UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 0);
        else
            UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 1);

        old_tick_count = Globals.Tickcount();
    }
}

function reset()
{
    old_tick_count = 0; 
}

function onFrameStageNotify() {
    if ( Cheat.FrameStage() == 4 ) leg();
}

// Cheat.RegisterCallback("Draw", "leg")
Cheat.RegisterCallback("CreateMove", "create_move");
Cheat.RegisterCallback('player_connect_full', 'reset');



Cheat.RegisterCallback( "FrameStageNotify", "onFrameStageNotify" );
