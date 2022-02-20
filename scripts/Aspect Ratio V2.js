UI.AddLabel(" == CUSTOM ASPECT RATIO ==");
UI.AddSliderFloat("Aspect Ratio",1.0,2.0); // you can customize limites here (1.0 - lowest, 2.0 - highest)
UI.AddLabel("1.33 is 4:3                  1.77 is 16:9");
UI.AddCheckbox("4:3 mode");
UI.AddCheckbox("16:9 mode");
UI.AddLabel("======================");

var aspect_cache = 0;

function aspect(){
	var aspect_slider = UI.GetValue("Aspect Ratio");
	var cht = UI.GetValue("4:3 mode");
	var shd = UI.GetValue("16:9 mode");
	
	
	if (cht != 0) {
		UI.SetValue("Aspect Ratio", 1.33333333);
		UI.SetValue("4:3 mode", 0);
	}
	
	if (shd != 0) {
		UI.SetValue("Aspect Ratio", 1.77777777);
		UI.SetValue("16:9 mode", 0);
	}
	
	if (aspect_cache != aspect_slider) {
		aspect_cache = aspect_slider;
		UI.SetValue("Misc", "GENERAL", "Miscellaneous", "Hidden cvars", 1);
		Global.ExecuteCommand("r_aspectratio " + aspect_slider);
	}
}

Cheat.RegisterCallback("CreateMove","aspect");