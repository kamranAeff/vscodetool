using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using VsCodeTool.Code;
using VsCodeTool.Data;

namespace VsCodeTool
{
    //https://dirask.com/q/typescript-compile-all-ts-files-to-one-js-PpObZD
    //https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
    internal class Program
    {
        private static string tsConfigFile = "tsconfig.json";

        private static void Main(string[] args)
        {
            //args = new[] { "D:\\Solutions\\TypeScript",
            //               "sources\\ts",
            //               "sources\\ts\\build\\app.ts" };

            Console.Clear();
            string workspace = args.Get(0);
            string sourcePath = args.Get(1);
            string outputFile = args.Get(2);

            Console.WriteLine($"##Variables \n" +
                $"Workspace:   {workspace}\n" +
                $"Source Path: {sourcePath}\n" +
                $"Output File: {outputFile}\n" +
                $"\n----------------------------------------------------");

            if (string.IsNullOrWhiteSpace(workspace))
                Console.WriteLine("Unfortunately arguments is empty!");
            else if (workspace.Replace("-", "") == "help")
            {
                Console.WriteLine("Please read 'Readme.md' file. Author: Kamran Aeff");
                return;
            }
            else if (string.IsNullOrWhiteSpace(sourcePath))
            {
                Console.WriteLine("Source path undefined! args[1]");
            }
            else if (string.IsNullOrWhiteSpace(outputFile))
            {
                Console.WriteLine("Output file path undefined! args[2]");
            }
            else
            {
                if (!Directory.Exists(workspace))
                {
                    Console.WriteLine($"Current workspace folder doesnt exists: '{workspace}'");
                    goto end;
                }

                Directory.SetCurrentDirectory(workspace);

                if (!File.Exists(tsConfigFile))
                {
                    Console.WriteLine($"Config file doesnt exists: '{Path.Combine(workspace, tsConfigFile)}'");
                    goto end;
                }

                using (var files = new AppDataSet.FileDataTable())
                {
                    foreach (string path in Directory.GetFiles(sourcePath, "*.ts", SearchOption.AllDirectories))
                    {
                        if (path == outputFile)
                            continue;

                        var coll = Regex.Matches(File.ReadAllText(path), usingPattern);

                        foreach (Match item in coll)
                            files.AddFileRow(path, item.Groups["logicalPath"].Value, GetAbsolutePath(path, item.Groups["logicalPath"].Value));

                        if (!files.AsEnumerable().Any(f => f.PhysicalPath == path))
                            files.AddFileRow(path, null, null);

                    }

                    var ns = (from f in files
                              where !f.IsAbsolutePathNull()
                              group f by f.AbsolutePath into fg
                              select new { UsingName = fg.Key, UseCount = fg.Count() }
                             );

                    ns = ns.Union(
                    files.Select(f => f.PhysicalPath)
                        .Except(ns.Select(f => f.UsingName))
                        .Select(f => new { UsingName = f, UseCount = 0 }))
                        .OrderByDescending(f => f.UseCount)
                        .ToList();

                    DeleteFile(outputFile);

                    if (ns.Any())
                    {
                        using (var sw = new StreamWriter(outputFile, true))
                        {
                            sw.WriteLine($"/* *** Developed by Kamran A-eff *** */{Environment.NewLine}");
                            foreach (var item in ns)
                            {
                                sw.WriteLine(File.ReadAllText(item.UsingName).ClearText());
                            }
                        }
                    }
                }
            }
        end:
            Console.WriteLine($"{Environment.NewLine}{Environment.NewLine}*** Developed by Kamran A-eff ***" +
                $"\n  tsc -p  '{workspace}/tsconfig.json'");
            Environment.Exit(0);
        }

        private static string GetAbsolutePath(string path, string logicalPath)
        {
            var arr = logicalPath.Split(new[] { '\\', '/' });
            for (int i = 0; i < arr.Length - 1; i++)
            {
                if (arr[i] == ".")
                    path = Path.GetDirectoryName(path);
                if (arr[i] == "..")
                {
                    path = Path.GetDirectoryName(path);
                    if (i == 0)
                        path = Path.GetDirectoryName(path);
                }
                else
                    break;
            }

            return Path.Combine(path, $"{Path.Combine(arr.Where(p => p != "." && p != "..").ToArray()).Replace(".ts", "")}.ts");
        }

        private static void JavascriptMinimizer(string[] args)
        {
            //    if (!Directory.Exists(args[1]))
            //        Console.WriteLine("Created Directory! >> '" + Directory.CreateDirectory(args[1]).FullName + "'");
            //    string str = Path.Combine(args[1], "min");
            //    if (!Directory.Exists(str))
            //        Console.WriteLine("Created Directory! >> '" + Directory.CreateDirectory(str).FullName + "'");
            //    Config config = Config.ReadJavascriptConfig(Path.Combine(args[1], Program.jsMinimizerConfigFile));
            //    File.WriteAllText(Path.Combine(str, config.OutputFile), "/* Developed by Kamran A-eff */");
            //    Func<string, string> func;
            //    foreach (string path in Enumerable.Select<string, string>((IEnumerable<string>)config.InputFiles, func ?? (func = (Func<string, string>)(f => Path.Combine(args[1], f)))))
            //    {
            //        if (!File.Exists(path))
            //        {
            //            Console.WriteLine("Can't find the file '" + path + "'!");
            //        }
            //        else
            //        {
            //            Console.WriteLine("Append the file '" + path + "'!");
            //            File.AppendAllText(Path.Combine(str, config.OutputFile), Extension.ClearWithRegex(Extension.ClearWithRegex(Extension.ClearWithRegex(File.ReadAllText(path), "(//.*)", "/*$1*/"), "(\\r\\n|\\r|\\n)", ""), "\\s+", " "));
            //        }
            //    }
        }
        
        static string usingPattern = "import.*from\\s*[\',\"](?<logicalPath>.*)[\',\"].*;?\n?";

        private static void DeleteFile(string path)
        {
            try
            {
                File.Delete(path);
            }
            catch
            {
            }
        }
    }
}
