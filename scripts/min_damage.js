UI.AddCheckbox("Display indicator")
UI.AddHotkey("Heavy Pistol Override")
UI.AddSliderInt("Heavy Pistol Mindmg", 0, 130)
UI.AddHotkey("Scout Override")
UI.AddSliderInt("Scout Mindmg", 0, 130)
UI.AddHotkey("AWP Override")
UI.AddSliderInt("AWP Mindmg", 0, 130)
UI.AddHotkey("Auto Override")
UI.AddSliderInt("Auto Mindmg", 0, 130)

var heavy_cache = UI.GetValue("Rage", "heavy PISTOL", "Targeting", "Minimum damage")
var scout_cache = UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage")
var awp_cache = UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage")
var auto_cache = UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage")

var disabled = 25, started = 0;
function isActive(a)
{
    return UI.IsHotkeyActive("Script Items", a)
}

function setValue(cat, value)
{
    UI.SetValue("Rage", cat.toUpperCase(), "Targeting", "Minimum damage", value)
}

function isHeavyPistol(name)
{
    if (name == "r8 revolver" || name == "desert eagle")
    {
        return true
    }
}

function isAutoSniper(name)
{
    if(name == "scar 20" || weapon_name == "g3sg1")
    {
        return true
    }
}

function onCM()
{
    heavy_value = UI.GetValue("Script items", "Heavy Pistol Mindmg")
    scout_value = UI.GetValue("Script items", "Scout Mindmg")
    awp_value = UI.GetValue("Script items", "AWP Mindmg")
    auto_value = UI.GetValue("Script items", "Auto Mindmg")
    weapon_name =  Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
  
    if (isActive("Heavy Pistol Override") && isHeavyPistol(weapon_name))
    {
        setValue("HEAVY PISTOL", heavy_value)
    }
    else
    {
        setValue("HEAVY PISTOL", heavy_cache)
    }
  
    if (isActive("Scout Override") && weapon_name == "ssg 08")
    {
        setValue("SCOUT", scout_value)
    }
    else
    {// NOT MY CODE
        setValue("SCOUT", scout_cache)
    }

    if (isActive("AWP Override") && weapon_name == "awp")
    {
        setValue("AWP", awp_value)
    }
    else
    {
        setValue("AWP", awp_cache)
    }

    if (isActive("Auto Override") && isAutoSniper(weapon_name))
    {
      
        setValue("AUTOSNIPER", auto_value)
    }
    else
    {
        setValue("AUTOSNIPER", auto_cache)
    }
}
function indicator()
{
    screen = Render.GetScreenSize()
    wep = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
   

    x = screen[0] / 2
    y = screen[1] / 2
    auto = "MIN DAMAGE"
    var str = ""

    if (UI.GetValue("Script items", "Display indicator") && Entity.IsValid(Entity.GetLocalPlayer()) && Entity.IsAlive(Entity.GetLocalPlayer()))
    {
        if (isHeavyPistol(wep) && isActive("Heavy Pistol Override") || (wep == "ssg 08" && isActive("Scout Override") || (wep == "awp" && isActive("AWP Override") || (isAutoSniper(wep) && isActive("Auto Override")))))
            str = auto
        else 
            str = "";
    
    if (started == 0)
    {
        if (disabled >= 25)   
            disabled++;
// gay ass fade queria fazer com cores colourful to blackful u know instead of alpha
        if (disabled == 255)   
            started = 1;
    }
    
    if (started == 1)
    {   
        disabled--;
        if (disabled == 25)   
            started = 0;       
    }   

    min_damage_size = Render.TextSizeCustom("MIN DAMAGE", 3);
    if(str == "MIN DAMAGE")
        Render.String(x - min_damage_size[0] / 2, y + 160, 0, str, [191, 159, 255, 240], 3);
    
    if (str == "")
        Render.String(x - min_damage_size[0] / 2, y + 160, 0, "MIN DAMAGE", [191, 159, 255, 100], 3);

    on_shot_aa_size = Render.TextSizeCustom("ON SHOT", 3);

    dt_size = Render.TextSizeCustom("DT", 3);

    if (UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots", "Enabled") && UI.GetValue("Rage", "GENERAL", "Exploits", "Hide shots", "Enabled") && Exploit.GetCharge() == 1)
        Render.StringCustom(x - on_shot_aa_size[0] / 2, y + 169, 0, "ON SHOT", [128, 230, 150, 255], 3);
    else
        Render.StringCustom(x - on_shot_aa_size[0] / 2, y + 169, 0, "ON SHOT", [128, 230, 150, 100], 3);

    if (UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap", "Enabled") && UI.GetValue("Rage", "GENERAL", "Exploits", "Doubletap", "Enabled") && Exploit.GetCharge() == 1)
        Render.StringCustom(x - dt_size[0] / 2, y + 180, 0, "DT", [128, 230, 0, 255], 3);
    else
        Render.StringCustom(x - dt_size[0] / 2, y + 180, 0, "DT", [255, 0, 0, 100], 3);

    anti_urine_size = Render.TextSizeCustom("ANTI URINE", 3);

    if (UI.GetValue("Misc", "Javascript", "Script items", "enable"))
        Render.StringCustom(x - anti_urine_size[0] / 2, y + 147.5, 0, "ANTI URINE", [255, 165, 0, disabled], 3);
    }
}
Cheat.RegisterCallback("Draw", "indicator")
Cheat.RegisterCallback("CreateMove", "onCM")