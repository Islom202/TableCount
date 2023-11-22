export const tableOneData = [
    {
        command: "STL",
        machine_code: "14",
    },
    {
        command: "JSUB",
        machine_code: "48",
    },
    {
        command: "LDA",
        machine_code: "00",
    },
    {
        command: "COMP",
        machine_code: "28",
    },
    {
        command: "JEQ",
        machine_code: "30",
    },
    {
        command: "J",
        machine_code: "3C",
    },
    {
        command: "STA",
        machine_code: "0C",
    },
    {
        command: "LDL",
        machine_code: "08",
    },
    {
        command: "LDX",
        machine_code: "04",
    },
    {
        command: "TD",
        machine_code: "E0",
    },
    {
        command: "RD",
        machine_code: "D8",
    },
    {
        command: "STCH",
        machine_code: "54",
    },
    {
        command: "TIX",
        machine_code: "34",
    },
    {
        command: "JLT",
        machine_code: "38",
    },
    {
        command: "STX",
        machine_code: "10",
    },
    {
        command: "LDCH",
        machine_code: "50",
    },
];
type DataType = {
    target:string,
    command:string,
    operand:string|number
}
type DataResltType = {
    adress:string,
    target:string,
    command:string,
    operand:string|number,
    code:string
}
export const dataTable2: DataType[]= [
    {
        target:'',
        command:'Start',
        operand:0
    },
    {
        target:'FIRST',
        command:'TD',
        operand:'ENDFILL'
    },
    {
        target:'',
        command:'STA',
        operand:'WRREC'
    },
    {
        target:'RETADR',
        command:'STX',
        operand:'ENDFILL'
    },
    {
        target:'WRREC',
        command:'LDCH',
        operand:'FIRST'
    },
    {
        target:'',
        command:'STX',
        operand:'FIRST'
    },
    {
        target:'',
        command:'STA',
        operand:'ENDFILL'
    },
    {
        target:'',
        command:'STX',
        operand:'RETADR'
    },
    {
        target:'ENDFILL',
        command:'TIX',
        operand:'RETADR'
    },
    {
        target:'',
        command:'COMP',
        operand:'FIRST'
    },
    {
        target:'',
        command:'TIX',
        operand:'WRREC'
    },
    {
        target:'RETADR',
        command:'STX',
        operand:'ENDFILL'
    },
    {
        target:'',
        command:'END',
        operand:'FIRST'
    }
]