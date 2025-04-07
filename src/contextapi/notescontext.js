import { createContext, useContext } from "react";



export const notesContext = createContext();


export const useNotesContext = ()=>{
   return useContext(notesContext)
}