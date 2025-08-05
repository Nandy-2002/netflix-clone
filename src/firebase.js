import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithCredential, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyDREXkD8p_fHCCm4VAq7WN-u6KGCXVPSnI",
  authDomain: "netflix-clone-5c6a6.firebaseapp.com",
  projectId: "netflix-clone-5c6a6",
  storageBucket: "netflix-clone-5c6a6.firebasestorage.app",
  messagingSenderId: "592886104892",
  appId: "1:592886104892:web:74569fa00e6d7efa7bd439"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup=async(name,email,password)=>{
    try{
        const res =await createUserWithEmailAndPassword(auth,email,password)
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider: "local",
            email,
        })
    }catch(error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login=async(email,password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};