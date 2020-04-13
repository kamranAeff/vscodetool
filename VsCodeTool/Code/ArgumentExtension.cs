namespace VsCodeTool.Code
{
    public static partial class Extension
    {
        internal static string Get(this string[] array, int index)
        {
            if (array == null || index < 0)
                return "";

            if (array.Length - 1 < index)
                return "";

            return array[index];
        }
    }
}
