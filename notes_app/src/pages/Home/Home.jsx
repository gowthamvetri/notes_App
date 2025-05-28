import React, { useState,useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NotesCard from "../../components/Cards/NotesCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Tost from "../../components/TostMessage/Tost";
import Emptycard from "../../components/Emptycard/Emptycard";
import AddNotesImg from "../../assets/img2-removebg-preview.png";

function Home() {

  Modal.setAppElement("#root");
  const [openEditModal, setopenEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  const [userInfo, setuserInfo] = useState(null);
  const [AllNotes,setAllNotes] = useState([]);
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const [openToast,setOpenToast] = useState({
    isShow : false,
    message : "",
    type: "add"
  })

  const handleEdit = async (noteDetails)=>{
    setopenEditModal({
      isShow: true,
      type: "edit",
      data: noteDetails
    })
  }

  const handleOpenToast = (message,type)=>{
    setOpenToast({
      isShow : true,
      message,
      type
    })
  }

  const handleCloseToast = ()=>{
    setOpenToast({
      isShow:false,
      message:""
    })
  }

  const getInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/user/get-user");
      if (response.data && response.data.user) {
        setuserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async ()=>{
    try {
      const response = await axiosInstance.get('/api/notes/get-notes');
      if(response.data && response.data.notes){
        setAllNotes(response.data.notes)
      }

    } catch (error) {
      console.log("An un expected error occured! please try again later")
    }
  }

  const deleteNote = async (data)=>{
    try {
      const noteid = data._id;
      const response = await axiosInstance.delete('/api/notes/delete/'+noteid);
      console.log(response)
      if(response.data && !(response.data.error)){
        handleOpenToast("Note Deleted Successfully","delete")
        getAllNotes();
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
      handleOpenToast("An un expected error occured! please try again later","delete")
    }
  }
}

const onSerachNotes = async (query)=>{
  try{
    const response = await axiosInstance.get('/api/notes/search/',{
      params: { query }
    });
    console.log(response)
    if(response.data && response.data.notes){
      setIsSearch(true);
      setAllNotes(response.data.notes)
    }
  }
 catch (error) {
  console.log("An un expected error occured! please try again later")
}
}

const updateIsPinned = async(noteData)=>{
  try {
    const response = await axiosInstance.put('/api/notes/update-pin/'+noteData._id,{
      isPinned : !noteData.isPinned
    });
    if(response.data && !(response.data.error)){
      handleOpenToast("Note Updated Successfully","update")
      getAllNotes();
    }
  } catch (error) {
    if(error.response && error.response.data && error.response.data.message){
      handleOpenToast("An un expected error occured! please try again later","update")
    }
  }
}


  useEffect(() => {
    getInfo();
    getAllNotes();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSerachNotes={onSerachNotes} getNotes={getAllNotes}/>

      <div className="mx-auto container">
        {AllNotes.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 mt-8">
        {AllNotes.map((item, index) => (
          <NotesCard
            key={item._id}
            title={item.title}
            date={item.createdAt}
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            onDelete={()=>deleteNote(item)}
            onEdit={()=> handleEdit(item)}
            onPinNote={() => updateIsPinned(item)}
          />
        ))}

        </div>
        ) : (
          <Emptycard imgSrc={AddNotesImg} message={`Start creating your First Notes by chicking the add Button down below and make note of your daily works and finish it!!`}/>
        )
}
      </div>

      <button
        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10 cursor-pointer"
        onClick={() => {
          setopenEditModal({
            isShow: true,
            data: null,
            type: "add",
          });
        }}
      >
        <MdAdd className="text-white text-[32px]" />
      </button>

      <Modal
        isOpen={openEditModal.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,.2)",
          },
        }}
        contentLabel=""
        className="w-[33%] max-h-3/4 bg-white rounded mx-auto mt-24 p-5 overflow-auto"
      >
        <AddEditNotes
          type={openEditModal.type}
          noteData={openEditModal.data}
          onClose={() => {
            setopenEditModal({
              isShow: false,
              type: "add",
              data: null,
            });
          }}
          getAllNotes = {getAllNotes}
          showTostMsg = {handleOpenToast}
        />
      </Modal>

      <Tost
        isShow = {openToast.isShow}
        message = {openToast.message}
        type = {openToast.type}
        onClose = {handleCloseToast}
      />
    </>
  );
}

export default Home;