module Part1 =

    let splitLines (s:string) =
        List.ofSeq(s.Split([|'\n'|]))

    let answer = 
        System.IO.File.ReadAllText(System.IO.Path.Combine(__SOURCE_DIRECTORY__, "input.txt"))
        |> splitLines
        |> List.fold(fun (state: list<int>) element ->
            if (element.Trim() = "") then  
                List.append state [0]
            else
                List.updateAt (state.Length - 1) (state.Item (state.Length - 1) + (element |> int)) state
            ) [0]
        |> List.sort
        |> List.last