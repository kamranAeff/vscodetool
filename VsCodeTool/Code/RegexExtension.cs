using System.Text.RegularExpressions;

namespace VsCodeTool.Code
{
    public static partial class Extension
    {
        internal static string ClearWithRegex(this string value, string pattern, string replacement)
        {
            return Regex.Replace(value, pattern, replacement, RegexOptions.IgnoreCase);
        }


        internal static string ClearText(this string text)
        {
            text = Regex.Replace(text, "export\\s*default\\s*", "");
            text = Regex.Replace(text, "export\\s*", "");
            text = Regex.Replace(text, "import.*from.*;?\n?", "");
            text = Regex.Replace(text, "export.*{.*}\n?", "");
            return text;
        }
    }
}
