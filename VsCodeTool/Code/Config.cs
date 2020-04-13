//using System.IO;
//using System.Web.Script.Serialization;

//namespace VsCodeTool.Code
//{
//    internal class Config
//    {
//        /*
//         {
//  "compilerOptions": {
//    "target": "es5",
//    "module": "commonjs",
//    "lib": [
//      "DOM",
//      "es2015",
//      "es5"],
//    "removeComments": true,
//    "preserveConstEnums": true,
//    "forceConsistentCasingInFileNames": true,
//    "rootDir": "./",
//    "outDir": "../../assets/js",
//    "baseUrl": "./"
//  }
//}
//             */
//        public string rootDir { get; set; }
//        public string outDir { get; set; }
//        public string baseUrl { get; set; }

//        public static Config ReadJavascriptConfig(string fileName)
//        {
//            if (!File.Exists(fileName))
//                File.WriteAllText(fileName, "{  \"outputFile\": \"\",  \"inputFiles\": []}");
//            Config config = new JavaScriptSerializer().Deserialize<Config>(File.ReadAllText(fileName));
//            if (config != null && string.IsNullOrWhiteSpace(config.OutputFile))
//            {
//                config.OutputFile = "minimizer.js";
//                config.InputFiles = new string[0];
//            }
//            return config;
//        }

//        public static Config ReadTypeScriptConfig(string fileName)
//        {
//            if (!File.Exists(fileName))
//                File.WriteAllText(fileName, "{  \"outputFile\": \"\",  \"inputFiles\": []}");
//            Config config = new JavaScriptSerializer().Deserialize<Config>(File.ReadAllText(fileName));
//            if (config != null && string.IsNullOrWhiteSpace(config.OutputFile))
//            {
//                config.OutputFile = "concator.ts";
//                config.InputFiles = new string[0];
//            }
//            return config;
//        }
//    }
//}
