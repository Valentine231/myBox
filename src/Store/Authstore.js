// import { create } from "zustand";
// import { supabase } from "../service/Supabase";

// const useAuth = create((set) => ({
//     user : null,
//     loading: false,
//     rememberMe:false,
//     notification:null,

//     //SIGUP FUNCTION

//   // SIGUP FUNCTION
// signup: async (email, password) => {
//     set({ loading: true, notification: null });
  
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//     });
  
//     if (error) {
//       set({ notification: error.message });
//     } else {
//       set({
//         notification: "Signup successful! Check your email to verify your account",
//       });
//     }
  
//     set({ loading: false });
//   },
  


//     // LOGIN FUNCTION
//     login: async (email,password,remember)=>{
//         set({loading:true,notification:null})

//         const {data,error} = await supabase.auth.signInWithPassword({
//             email,
//             password
//         })

//         if(error){
//             set({notification:error.message})
//         }else {
//             set({
//                 user:data.user,
//                 rememberMe:remember,
//                 notification:"Login successful!"
                
//             })

//             if(remember){
//                 localStorage.setItem("user",JSON.stringify(data.user))
//             } else {
//                 localStorage.removeItem("user")
//             }
//         }
//         set({loading:false})
//     },

//       // --- LOGOUT ---
//   logout: async () => {
//     await supabase.auth.signOut()
//     localStorage.removeItem("user")
//     set({ user: null, notification: "Logged out successfully." })
//   },

//   // --- CHECK SESSION / REMEMBER ME ---
//   loadUser: () => {
//     const user = localStorage.getItem("user")
//     if (user) {
//       set({ user: JSON.parse(user), rememberMe: true })
//     }
//   },

    


// }))

// export default useAuth