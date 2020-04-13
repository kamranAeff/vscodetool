# vscodetool

## File Structure
- assets
  - css
  - img
  - js
- source
  - scss
  - ts
- index.html
- Readme.md
- tsconfig.json

### Git Global Ignore Config
#### get configurations
> git config -l

#### set excluded files
> git config --global core.excludesfile 'C:/Program Files/Git/.gitignore_global'

<pre>
<h4>.gitignore_global file content</h4>
/assets/css/*
/assets/js/*
/node_modules
</pre>


### Sass Configuration File
<pre>
    "liveSassCompile.settings.showOutputWindow": false,
    "liveSassCompile.settings.formats": [
        {
            "format": "expanded",
            "extensionName": ".css",
            "savePath": "./assets/css"
        },
        {
            "format": "compressed",
            "extensionName": ".min.css",
            "savePath": "./assets/css"
        }
    ]
</pre>



# [TypeScript](https://www.typescriptlang.org/docs/handbook/basic-types.html)

## TypeScript access apply
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned

### TypeScript global Install
> npm install -g typescript

### Get TypeScript version
> tsc --version

### Compite TypeScript file
> tsc app.ts   <kbd>OR</kbd>
> tsc app.ts  --watch

## Typescript Concat Modules
### tasks.json
<pre>
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Union Typescript Files",
            "type": "shell",
            "windows": {
                "command": "{fullPath}\\vscodetool.exe",
                "args": [
                    "${workspaceRoot}",
                    "sources\\ts",
                    "sources\\ts\\build\\app.ts"
                ]
            },
            "group": "build"
        }
    ]
}
</pre>

### Typescript configuration file
<pre>
{
  "compilerOptions": {
    "target": "es5",
    "module": "System",
    "lib": [
      "DOM",
      "es2015",
      "es5"],
    "types": ["jquery"],
    "removeComments": true,
    "preserveConstEnums": true,
    "forceConsistentCasingInFileNames": false,
    "rootDir": "./",
    "outFile": "./assets/js/app.js",
    "baseUrl": "./",    
    "declaration": false
  },
  "files": ["sources/ts/build/app.ts"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
</pre> 

## Include Jquery Module for TypeScript
> npm install @types/jquery --save-dev



# [Babel configuration](https://babeljs.io/setup#installation)

## Create npm package config
> npm init

## Add babel modules
> npm install @babel/cli @babel/core @babel/polyfill @babel/preset-env --save-dev

## .babelrc file
{
  "presets": ["@babel/preset-env"]
}