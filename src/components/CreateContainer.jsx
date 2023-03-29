import { motion } from 'framer-motion';
import React, { useState } from 'react'
import { 
  MdAttachMoney, 
  MdCloudUpload, 
  MdDelete ,
  MdOutlineMonitorWeight,
  MdStoreMallDirectory} from 'react-icons/md'
import { categories } from '../utils/data';
import Loader from './Loader';
import { 
  deleteObject, 
  getDownloadURL, 
  ref, 
  uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { getAllWoodenItems, saveItem } from '../utils/firebaseFunctions';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

const CreateContainer = () => {

  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const [field, setField] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{woodenitems},dispatch] = useStateValue();


  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage,`Images/${Date.now()}-${imageFile.name}`)
    const uploadtask = uploadBytesResumable(storageRef,imageFile);

    uploadtask.on('state_changed',(snapshot)=>{
      const uploadProgress =(snapshot.bytesTransferred/snapshot.totalBytes)*100;
    },(error)=>{
      console.log(error);
      setField(true);
      setMsg('Error while uploading : try again ');
      setAlertStatus('denger');
      setTimeout(()=>{
        setField(false);
        setIsLoading(false);
      },4000);
    },()=>{
      getDownloadURL(uploadtask.snapshot.ref).then(downloadURL =>{
        setImageAsset(downloadURL);
        setIsLoading(false);
        setField(true);
        setMsg('image uploaded successfully :)');
        setAlertStatus('success');
        setTimeout(()=>{
          setField(false);
        },4000);
      })
    })
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef =ref(storage,imageAsset);
    deleteObject(deleteRef).then(()=>{
      setImageAsset(null)
      setIsLoading(false);
      setField(true);
      setMsg('image deleted successfully :|');
        setAlertStatus('success');
        setTimeout(()=>{
          setField(false);
        },4000);
    })

  };

  const saveDetails = () => {
    setIsLoading(true);
    try{
      if(!title  || !calories || !imageAsset || !category){
        setField(true);
        setMsg('Required  filds can be empty ');
        setAlertStatus('denger');
        setTimeout(()=>{
          setField(false);
          setIsLoading(false);
        },4000);
      }else{
        const data ={
          id:`${Date.now()}`,
          title:title,
          imageURL:imageAsset,
          category:category,
          calories:calories,
          qty:1,
          price:price
        }
        saveItem(data);
        setIsLoading(false);
        setField(true);
        setMsg('Data upLoaded successfully :|');
        clearData();
          setAlertStatus('success');
          setTimeout(()=>{
            setField(false);
          },4000);
      }
    }
    catch(error){
      console.log(error);
      setField(true);
      setMsg('Error while uploading : try again ');
      setAlertStatus('denger');
      setTimeout(()=>{
        setField(false);
        setIsLoading(false);
      },4000);
    }
    fetchData()
  };

  const clearData = ()=>{
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
  }

  const fetchData =async () => {
    await getAllWoodenItems().then((data) =>{
      dispatch({
        type : actionType.SET_WOODEN_ITEMS,
        woodenitems: data
      })
      
    });
  };

  return (
    <div className='w-full h-auto flex items-center justify-center pt-[6rem]'>
      <div className='w-[90%] md:w-[75%] border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-4'>
        {
          field && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}

              className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === "danger" ? "bg-red-400 text-red-800" : "bg-emerald-400 text-emerald-800"}`}>
              {msg}
            </motion.p>
          )
        }

        <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
          <MdStoreMallDirectory className='text-xl text-gray-700' />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='give me a title..'
            className='w-full h-full text-lg bg-transparent font-semibold outline-none broder-none placeholder:text-gray-500 text-textColor' />
        </div>

        <div className='w-full'>
          <select onChange={(e) => setCategory(e.target.value)} className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursur-pointer'>
            <option value="other" className='bg-white'>
              select category
            </option>
            {
              categories && categories.map((item) => (
                <option
                  key={item.id}
                  className='text-base border-0 outline-none capitalize bg-white text-headingColor '
                  value={item.urlParamName}>
                  {item.name}
                </option>
              ))
            }
          </select>
        </div>

        <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 rounded-lg'>
          {
            isLoading ? <Loader /> : <>
              {!imageAsset ? (<>
                <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                  <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                    <MdCloudUpload className='text-gray-500  text-3xl hover:text-gray-700 ' />
                    <p className='text-gray-500   hover:text-gray-700 '> Click here to upload </p>
                  </div>
                  <input type="file" name='uploadimage' accept='image/*' onChange={uploadImage} className='w-0 h-0' ></input>
                </label>
              </>
              ) : (
                <>
                  <div className='relative h-full'>
                    <img src={imageAsset} alt='uploaded image' className='w-full h-full object-cover' />
                    <button type='button' className='absolute botton-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out'
                      onClick={deleteImage}
                    > <MdDelete className='text-white' /> </button>
                  </div>
                </>)}
            </>
          }
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdOutlineMonitorWeight className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="weight"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className='flex item-center w-full '>
          <button type='button' className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg
           text-lg text-white font-semibold'
            onClick={saveDetails}>
            Save
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default CreateContainer;