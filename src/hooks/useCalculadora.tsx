import { useState, useRef } from "react"

enum Operadores{
    sumar, restar, multiplicar, dividir
  }
  
export const useCalculadora = () => {
    const [numeroAnterior, setNumeroAnterior] = useState('0')
    const [numero, setNumero] = useState('0')
    
    const ultimaOperacion = useRef<Operadores>()
  
  
    const limpiar = () => {
      setNumero("0")
      setNumeroAnterior("0")
    }
  
    const armarNumero = (numeroTexto:string) => {
  
      if (numero.includes('.') && numeroTexto === '.') return;
  
      if ( numero.startsWith('0') || numero.startsWith('-0') ){
  
        //Punto decimal
        if( numeroTexto === "."){
          setNumero ( numero + numeroTexto);
         
          //Evaluar si es otro cero, y hay un punto
        } else if( numeroTexto === '0' && numero.includes('.') ){
          setNumero( numero + numeroTexto)
  
          //Evaluari si es diferente de cero y no tiene punto
        } else if ( numeroTexto !== '0' && !numero.includes('.') ){
          setNumero( numeroTexto )
        
          //Evaluar 0000.0
        }else if ( numeroTexto === '0' && !numero.includes('.') ){
          setNumero( numeroTexto )
        
      } else{
        setNumero( numero + numeroTexto)
      }
      
      }else{
        setNumero( numero + numeroTexto)
      }
    }
  
    const positivoNegativo = () => {
      if(numero.includes("-")){
        setNumero( numero.slice(1))
      }else{
        setNumero( "-" + numero)
      }
    }
    
    const btnDelete = () => {
      if(numero.length === 1 || (numero.length === 2 && numero.includes('-'))){
        setNumero('0') 
      }else{
        setNumero(numero.slice(0, -1))
      }
    }
  
    const cambiarNumPorAnterior = () => {
      if(numero.endsWith('.')){
        setNumeroAnterior(numero.slice(0,-1))
      }else{
        setNumeroAnterior(numero)
      }
      setNumero('0')
    }
  
    const btnSumar = () => {
      cambiarNumPorAnterior()
      ultimaOperacion.current = Operadores.sumar
    }
    const btnRestar = () => {
      cambiarNumPorAnterior()
      ultimaOperacion.current = Operadores.restar
    }
    const btnMultiplicar = () => {
      cambiarNumPorAnterior()
      ultimaOperacion.current = Operadores.multiplicar
    }
    const btnDividir= () => {
      cambiarNumPorAnterior()
      ultimaOperacion.current = Operadores.dividir
    }
  
    const calcular  = () => {
  
      // if(numeroTexto.includes("=")) return;
      
      let num1 = Number(numero)
      let num2 = Number(numeroAnterior)
      
      switch (ultimaOperacion.current) {
        case Operadores.sumar:
          setNumero(` ${num1 + num2}`)
          break;
  
        case Operadores.restar:
          setNumero(` ${num1 - num2}`)
          break;
  
        case Operadores.multiplicar:
          setNumero(` ${num2 * num1}`)
          break;
              
        case Operadores.dividir:
          setNumero(` ${num2 / num1}`)
          break;
      }
      setNumeroAnterior('0')
    }
  
    return {
        numeroAnterior, 
        numero, 
        limpiar, 
        positivoNegativo, 
        btnDelete, 
        btnDividir,
        btnMultiplicar, 
        btnRestar, 
        btnSumar, 
        armarNumero, 
        calcular
    }
}
