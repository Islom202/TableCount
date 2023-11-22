import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { tableOneData, dataTable2 as data2 } from "./dataTable1";

type DataResltType = {
    adress: string | number;
    target: string;
    command: string;
    operand: string | number;
    code: string;
};

const App = () => {
    const [tableOne, setTableOne] = useState(false);
    const [tableTwo, setTableTwo] = useState(false);
    const [tableTwoS, setTableTwoS] = useState(false);
    const [dataTable2, setDataTable] = useState<any[]>(data2);
    const [targ1, setTarg] = useState("");
    const [com1, setCom] = useState("");
    const [oper1, setOper] = useState("");

    //  хз
    
    //
    function checkCommand(command: string) {
        const da = command.includes("+");
        const parsedCommand = command.replace("+", ""); // Удаляем символ "+"
        const foundCommand = tableOneData.find(
            (item) => item.command === parsedCommand
        );
        if (foundCommand) {
            if (da) {
                return 4;
            }
            return 3;
        }
        return false;
    }
    const AddTable = () => {
        console.log(isNaN(Number(oper1)));
        let item: any;
        if (isNaN(Number(oper1))) {
            item = {
                target: targ1,
                command: com1,
                operand: oper1,
            };
        } else {
            item = {
                target: targ1,
                command: com1,
                operand: Number(oper1),
            };
        }
        const length = dataTable2.length;
        const newDataTable2 = [
            ...dataTable2.slice(0, length - 1),
            item,
            ...dataTable2.slice(length - 1),
        ];

        setDataTable(newDataTable2);
    };

    const defalt = dataTable2[0].operand;
    const defSr = String(defalt);

    
    function checkCommandData(command: string) {
        const parsedCommand = command; // Удаляем символ "+"

        for (let i = 0; i < tableOneData.length; i++) {
            if (tableOneData[i].command === parsedCommand) {
                return tableOneData[i].machine_code;
            }
        }
        return false;
    }

    function checkCommandID(command: string) {
   
        const parsedCommand = command;

        for (let i = 0; i < dataTable2.length; i++) {
            if (dataTable2[i].target === parsedCommand) {
                return i;
            }
        }
        return false;
    }

    let DataResult: any[] = [];

    function dataCodeRaschet() {
        for (var i = 1; i < dataTable2.length; i++) {
            const code = checkCommandData(DataResult[i].command);
            const code3 = checkCommandID(DataResult[i].operand);
            if(code3){
                DataResult[i].code = code+String(DataResult[code3].adress.toString(16).length == 1
                ? defSr +
                  defSr +
                  defSr +
                  DataResult[code3].adress.toString(16)
                : DataResult[code3].adress.toString(16).length == 2
                ? defSr + defSr + DataResult[code3].adress.toString(16)
                : DataResult[code3].adress.toString(16).length == 3
                ? defSr + DataResult[code3].adress.toString(16)
                : DataResult[code3].adress.toString(16));
            }
        }
    }

    function dataResultRaschet() {
        for (var i = 0; i < dataTable2.length; i++) {
            DataResult[i] = {
                adress: "",
                target: dataTable2[i].target,
                command: dataTable2[i].command,
                operand: dataTable2[i].operand,
                code: "",
            };
            if (i == 0) {
                DataResult[i] = {
                    adress: defalt,
                    target: dataTable2[i].target,
                    command: dataTable2[i].command,
                    operand: dataTable2[i].operand,
                    code: "",
                };
            } else {
                const adr = checkCommand(DataResult[i - 1].command)
                    ? checkCommand(DataResult[i - 1].command)
                    : DataResult[i - 1].command == "RESB"
                    ? DataResult[i - 1].operand
                    : DataResult[i - 1].command == "RESW"
                    ? 3 * DataResult[i - 1].operand
                    : DataResult[i - 1].command == "WORD"
                    ? 3
                    : 0;
                const sumAdt = DataResult[i - 1].adress + adr;
                DataResult[i].adress = sumAdt;
            }
        }
        dataCodeRaschet();
    }

    dataResultRaschet();

    return (
        <Wrapper>
            <Container>
                <Table>
                    <Shablon u={"Команда"} c={"Код"} />
                    {tableOneData.map((a, i) => (
                        <Shablon
                            u={tableOne ? a.command : ""}
                            c={tableOne ? a.machine_code : ""}
                            key={i}
                        />
                    ))}
                    {/* {tableOne && <div>{tableOneData.map((a,i)=><Shablon u={a.command} c={a.machine_code} key={i} />)}</div>} */}
                    <button
                        className={`test1 ${tableOne ? "test2" : ""}`}
                        style={{ marginTop: "30px" }}
                        onClick={() => {
                            setTableOne(!tableOne);
                        }}
                    >
                        Загрузить
                    </button>
                </Table>
                <Table>
                    <Shablon2
                        adr={"Адрес"}
                        chel={"Цель"}
                        comad={"Команда"}
                        oper={"Операнд"}
                        kod={"Код"}
                    />
                    {DataResult.map((a, i) => (
                        <Shablon2
                            adr={
                                tableTwoS
                                    ? a.adress.toString(16).length == 1
                                        ? defSr +
                                          defSr +
                                          defSr +
                                          a.adress.toString(16)
                                        : a.adress.toString(16).length == 2
                                        ? defSr + defSr + a.adress.toString(16)
                                        : a.adress.toString(16).length == 3
                                        ? defSr + a.adress.toString(16)
                                        : a.adress.toString(16)
                                    : ""
                            }
                            chel={tableTwo ? a.target : ""}
                            comad={tableTwo ? a.command : ""}
                            oper={tableTwo ? a.operand : ""}
                            kod={tableTwoS ? a.code : ""}
                            key={i}
                        />
                    ))}
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            justifyContent: "center",
                            marginTop: "50px",
                     
                           
                        }}
                    >
                        <input
                            type="text"
                            placeholder="цель"
                            onChange={(e) => {
                                setTarg(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="команда"
                            onChange={(e) => {
                                setCom(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="операнд"
                            onChange={(e) => {
                                setOper(e.target.value);
                            }}
                        />
                        <button
                            onClick={() => {
                                AddTable();
                            }}
                        >
                            Добавить
                        </button>
                    </div>
                    <div
                        style={{
                            marginTop: "30px",
                            display: "flex",
                            justifyContent: "center",
                            gap: "10px",
                        }}
                    >
                        <button
                            className={`test1 ${tableTwo ? "test2" : ""}`}
                            onClick={() => {
                                setTableTwo(!tableTwo);
                            }}
                        >
                            Загрузить
                        </button>
                        <button
                            className={`test1 ${tableTwoS ? "test2" : ""}`}
                            onClick={() => {
                                setTableTwoS(!tableTwoS);
                            }}
                        >
                            Расчитать
                        </button>
                    </div>
                </Table>
            </Container>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
`;
const Container = styled.div`
    width: 90%;
    padding-top: 4%;
    display: flex;
    gap: 300px;
`;
const Table = styled.div``;
const Title = styled.div<{ width: string }>`
    width: ${(props) => props.width};
    display: flex;
    height: 30px;
    max-height: 30px;
`;
const TextBlock = styled.div`
    width: 100%;
    color: black;
    border: 2px solid gray;
    font-size: 20px;

    
   
  

`;

export default App;

const Shablon = ({ u, c }: any) => {
    return (
        <Title width="400px">
            <TextBlock>{u}</TextBlock>
            <TextBlock>{c}</TextBlock>
        </Title>
    );
};

const Shablon2 = ({ adr, chel, comad, oper, kod }: any) => {
    return (
        <Title width="600px">
            <TextBlock>{adr}</TextBlock>
            <TextBlock>{chel}</TextBlock>
            <TextBlock>{comad}</TextBlock>
            <TextBlock>{oper}</TextBlock>
            <TextBlock>{kod}</TextBlock>
        </Title>
    );
};
