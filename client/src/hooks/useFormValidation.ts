// import { RefObject, useState } from "react";

// type InputType = "email" | "text" | "number";
// type ValidationRule = {
//     [key : string] : {
//         type : InputType;
//         required: boolean;
//     }
// }
// type Error = {
//     hasError : boolean;
//     field : {
//         [key:string]: string
//     }
// }
// const useFormValidation = (formRef: RefObject<HTMLFormElement>,validationRule : ValidationRule) => {
//     const [error,setError] = useState<Error>({hasError: false, field : {}});

//     const handleSubmit = ( e : SubmitEvent) => {
//         e.preventDefault();
//         if(!formRef.current) throw new Error("Plase pass the form ref");
//         const formData = new FormData(formRef.current);
//         let error : Error = {hasError: false, field : {}};
//         for(const [key,value] of formData.entries()) {
//             if(key in validationRule) {
//                 const {required} = validationRule[key];
//                 if(required && value === "") {
//                     error = {
//                         hasError:true,
//                         field : {
//                             ...error.field,
//                             message : `${}`
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }
