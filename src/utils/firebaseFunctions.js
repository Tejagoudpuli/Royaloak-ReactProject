import { firestore } from "../firebase.config"
import { collection, doc, getDocs, orderBy, setDoc,query } from 'firebase/firestore'
import { async } from "@firebase/util";

export const saveItem =async (data) =>{
    await setDoc(
        doc(firestore,'woodenitems',`${Date.now()}`),data,{ 
            merge : true,
        });
};

export const getAllWoodenItems = async () =>{
    const items = await getDocs(
        query(collection(firestore,"woodenitems"),orderBy("id","desc"))
    );
    return items.docs.map((doc)=>doc.data());
}