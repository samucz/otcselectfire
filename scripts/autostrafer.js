UI.AddSliderInt( "Turn speed", 1, 2 );

function Erectware()
{
    var CustomSpeed = UI.GetValue( "Misc", "JAVASCRIPT", "Script items", "Turn speed" );
    var VelocityProp = Entity.GetProp(Entity.GetLocalPlayer(), 'CBasePlayer', 'm_vecVelocity[0]'),
    Velocity = Math.sqrt(VelocityProp[0] * VelocityProp[0] + VelocityProp[1] * VelocityProp[1]);
    parseFloat(Velocity)
    Velocity2 = Velocity/1.5
    VelocityCus = Velocity2/CustomSpeed
    UI.SetValue( "Misc", "GENERAL", "Movement", "Turn speed", VelocityCus );
}


Cheat.RegisterCallback('CreateMove', 'Erectware')