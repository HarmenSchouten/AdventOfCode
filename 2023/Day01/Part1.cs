using System;
using System.IO;

var text = await File.ReadAllTextAsync(Path.Combine(SourceDirectory(), "input.txt"));

var answer = text
    .Split("\r\n")
    .Select(item => item.Where(c => int.TryParse($"{c}", out _)).Select(c => int.Parse($"{c}")))
    .Where(item => item.Count() > 0)
    .Aggregate(0, (acc, state) => acc + state.First() * 10 + state.Last());

Console.WriteLine(answer);

// Inputs live next to this file, wherever the script is run from
static string SourceDirectory([System.Runtime.CompilerServices.CallerFilePath] string path = "") => Path.GetDirectoryName(path)!;
