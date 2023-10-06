import { useState } from "react";
import { create, all } from "mathjs"; // Importa create y all desde mathjs
import "./Calculator.css";
const math = create(all); // Crea una instancia de mathjs

export default function Calculator() {
  //FORMULA Y RESULTADO
  const [formula, setFormula] = useState("");
  const [result, setResult] = useState(0);
  //ESTADO PARA SABER SI SE REALIZO ALGUN CALCULO
  const [thereIsResult, setThereIsResult] = useState(false);
  //ESTADOS PARA LOS OPERADORES
  const [currentOperator, setCurrentOperator] = useState(null);
  const [decimalEntered, setDecimalEntered] = useState(false);
  const [minusEntered, setMinusEntered] = useState(false);

  const calcular = (event) => {
    let operadores = ["+", "-", "/", "*"];
    const value = event.target.value;

    //SOLO PUEDE INGRESAR NUMEROS Y OPERADORES

    //SI ES UN NUMERO ENTRA ACA
    if (!isNaN(parseFloat(value))) {
      esUnNumero(value);
    }
    //SI ES UN OPERADOR ENTRA ACA
    else if (operadores.includes(value)) {
      esUnOperador(value);
    }
    //MANEJAR PUNTO DECIMAL
    else if (value === "." && !decimalEntered && formula !== "") {
      setFormula((prevFormula) => prevFormula + value);
      setResult((prevResult) => prevResult + value);
      setDecimalEntered(true);
    }
  };

  function esUnNumero(value) {
    //NUMERO INGRESADO ES 0
    if (value === "0") {
      //RESULTADO VACIO SE BLOQUEA EL 0
      if (result === 0) {
        setFormula(value);
      }
      //RESULTADO CONTIENE ALGUN CALCULO SE DEJA AGREGAR TODOS LOS 0 QUE QUIERA
      else {
        setFormula((prevFormula) => prevFormula + value);
        setResult((prevResult) => prevResult + value);
      }
    }

    //NUMERO NO ES 0
    else {
      //RESULTADO VACIO SE REEMPLAZA POR EL NUMERO INGRESADO
      if (result === 0) {
        setResult(value);
        setFormula(value);
      }

      //RESULTADO CONTIENE ALGUN CALCULO ENTONCES SE AGREGA EL NUMERO NUEVO AL YA EXISTENTE
      else if (["+", "-", "*", "/"].includes(result)) {
        setFormula((prevFormula) => prevFormula + value);
        setResult((prevResult) => prevResult.slice(0, -1) + value);
      } else {
        setFormula((prevFormula) => prevFormula + value);
        setResult((prevResult) => prevResult + value);
      }
    }
  }

  function esUnOperador(value) {
    //ULTIMO ELEMENTO DE FORMULA (QUE SERIA EL OPERADOR INGRESADO)
    const lastChar = formula.slice(-1);
    const lastTwoChars = formula.slice(-2);

    //LOGICA SI YA HAY UN RESULTADO REALIZADO ✅
    if (thereIsResult) {
      setFormula(result + value);
      setResult(value);
      setThereIsResult(false);
      setCurrentOperator(value);
      setDecimalEntered(false);
    }
    //LÓGICA SI NO HAY NINGUN OPERADOR ACTUALMENTE
    else if (!currentOperator) {
      setCurrentOperator(value);
      setFormula((prevFormula) => prevFormula + value);
      setResult(value);
      setDecimalEntered(false);
    }

    //LOGICA PARA REALIZAR LOS CALCULOS
    else {
      switch (value) {
        case "+":
          if (!["+", "-", "/", "*"].includes(lastChar)) {
            setCurrentOperator(value);
            setFormula((prevFormula) => prevFormula + value);
            setResult(value);
            setDecimalEntered(false);
          } else if (lastTwoChars[0] !== "-" && lastTwoChars[1] === "-") {
            // Eliminar los dos últimos caracteres y agregar el nuevo operador
            setFormula((prevFormula) => prevFormula.slice(0, -2) + value);
            setResult(value);
            setCurrentOperator(value);
            setDecimalEntered(false);
          } else {
            setCurrentOperator(value);
            setFormula((prevFormula) => prevFormula.slice(-2, -1) + value);
            setResult(value);
            setDecimalEntered(false);
          }
          break;

        case "-":
          if (!["+", "-", "/", "*"].includes(lastChar) && !minusEntered) {
            setCurrentOperator(value);
            setFormula((prevFormula) => prevFormula + value);
            setResult(value);
            setDecimalEntered(false);
          } else if (["+", "/", "*"].includes(lastChar) && !minusEntered) {
            setCurrentOperator(value);
            setFormula((prevFormula) => prevFormula + value);
            setResult(value);
            setDecimalEntered(false);
          } else if (value === "-" && lastChar === "-" && !minusEntered) {
            setCurrentOperator(value);
            setFormula((prevFormula) => prevFormula + value);
            setResult(value);
            setMinusEntered(true);
            setDecimalEntered(false);
          }
          break;

        case "*":
          if (!["+", "-", "/", "*"].includes(lastChar)) {
            setCurrentOperator(value);
            setFormula((prevFormula) => prevFormula + value);
            setResult(value);
            setDecimalEntered(false);
          } else if (lastTwoChars[0] !== "-" && lastTwoChars[1] === "-") {
            // Eliminar los dos últimos caracteres y agregar el nuevo operador
            setFormula((prevFormula) => prevFormula.slice(0, -2) + value);
            setResult(value);
            setCurrentOperator(value);
            setDecimalEntered(false);
          } else {
            setCurrentOperator(value);
            setFormula((prevFormula) => prevFormula.slice(-2, -1) + value);
            setResult(value);
            setDecimalEntered(false);
          }
          break;

        case "/":
          if (!["+", "-", "/", "*"].includes(lastChar)) {
            setCurrentOperator(value);
            setFormula((prevFormula) => prevFormula + value);
            setResult(value);
            setDecimalEntered(false);
          } else if (lastTwoChars[0] !== "-" && lastTwoChars[1] === "-") {
            // Eliminar los dos últimos caracteres y agregar el nuevo operador
            setFormula((prevFormula) => prevFormula.slice(0, -2) + value);
            setResult(value);
            setCurrentOperator(value);
            setDecimalEntered(false);
          } else {
            setCurrentOperator(value);
            setFormula((prevFormula) => prevFormula.slice(-2, -1) + value);
            setResult(value);
            setDecimalEntered(false);
          }
          break;
      }
    }
  }

  function clear() {
    setFormula("");
    setResult(0);
    setCurrentOperator(null);
    setDecimalEntered(false);
    setThereIsResult(false);
    setMinusEntered(false);
  }

  function showResult() {
    if (formula) {
      // Utiliza math.evaluate para evaluar la fórmula
      const evaluationResult = math.evaluate(formula);
      setThereIsResult(true);
      // Actualiza el resultado en tu estado "result" o donde desees mostrarlo
      setFormula(formula + "=" + evaluationResult);
      setResult(evaluationResult);
    } else {
      // Maneja errores de sintaxis o cálculos inválidos
      setResult("Syntax Error");
    }
  }

  return (
    <div id="calculator">
      <div id="result">{formula}</div>

      <div id="display">{result}</div>

      <div id="calculator-buttons">
        <button id="clear" onClick={clear}>
          AC
        </button>
        <button id="divide" value="/" onClick={calcular}>
          ÷
        </button>
        <button id="multiply" value="*" onClick={calcular}>
          x
        </button>

        <button id="seven" value="7" onClick={calcular}>
          7
        </button>
        <button id="eight" value="8" onClick={calcular}>
          8
        </button>
        <button id="nine" value="9" onClick={calcular}>
          9
        </button>
        <button id="subtract" value="-" onClick={calcular}>
          -
        </button>

        <button id="four" value="4" onClick={calcular}>
          4
        </button>
        <button id="five" value="5" onClick={calcular}>
          5
        </button>
        <button id="six" value="6" onClick={calcular}>
          6
        </button>
        <button id="add" value="+" onClick={calcular}>
          +
        </button>

        <button id="one" value="1" onClick={calcular}>
          1
        </button>
        <button id="two" value="2" onClick={calcular}>
          2
        </button>
        <button id="three" value="3" onClick={calcular}>
          3
        </button>

        <button id="zero" value="0" onClick={calcular}>
          0
        </button>
        <button id="decimal" value="." onClick={calcular}>
          .
        </button>
        <button id="equals" value="=" onClick={showResult}>
          =
        </button>
      </div>
    </div>
  );
}
