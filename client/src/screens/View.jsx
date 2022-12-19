import React, { useEffect, useState ,CSSProperties} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
  import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { DELETE_USER_MUTATION ,UPDATE_USER_MUTATION} from "../Graphql/Mutations";
import { useMutation } from "@apollo/client";
import {getTodo,EditTodo,DeleteTodo} from "../actions/allProductsAction"
import { useSelector, useDispatch } from "react-redux";
import Profile from './profile';
import Card from 'react-bootstrap/Card';
import ClipLoader from "react-spinners/ClipLoader";

const Edit = ({datas}) => {
  let [dats,setdats] = useState([])

  const [deleteTodo, { error }] = useMutation(DELETE_USER_MUTATION);
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const client = new ApolloClient({
    uri: 'http://localhost:3004/graphql',
    cache: new InMemoryCache(),
  });
  // const client = ...
  const  {Todo}  = useSelector((state) => state.Todo);
  const  state  = useSelector((state) => state.Todo);
  let [accessToken,setToken] = useState()
  let [id,setID] = useState()
  useEffect(()=>{
    Todo && Todo.getAllTodos &&setdats(Todo.getAllTodos)
    console.log(Todo)
  
    
  },[Todo])
  useEffect(()=>{
    setInterval(() => {
      setLoading(state.loading)
    }, 1000);
  },[])
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  let navigate = useNavigate()
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }
  useEffect(()=>{
    setToken(localStorage.getItem("accessToken"))
    setID(localStorage.getItem("userid"))
  
  
  },[])
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  let [remove ,setremove] = useState(null)
  let [tick ,settick] = useState([])
  let [edit,setediting] = useState([])
  let [editInput,setEdit] = useState([])
  let [limit,setLimit] = useState(5)

  let getData = (async()=>{

    // let datas = await axios.get(`http://localhost:8001/api?limit=5`)

    

//       client
// .query({
//   query: gql`
//   query{
//     getAllTodos{
//       title
//       id
//     }
//   }
//   `,
// })
// .then((result) => result &&   setdats(result.data));

  })
  let deleteHandler = (async(id)=>{
    dispatch(DeleteTodo(id))
    toast.success("Deleted successfuly")
    setInterval(() => {
      window.location.href ='/edit'
      
    }, 1000);

    // let datas = await axios.delete(`http://localhost:8001/api/${id}`)
    // if(datas.data.message ==='Todo was deleted successfully!'){
    //   getData()
    //   toast.error(datas.data.message)
    // }else{
    //   toast.error("something went wrong")
    // }
    // client
    // .mutate({
    //   mutation: gql`
    //   mutation{
    //     deleteTodo(id:${id})
    //   }
    //   `,
    // })
    // .then((result) => result && getData(),  toast.success("Deleted successfully"), getData())
    // deleteTodo({
    //   variables: {
    //     id:id
    //   },
    // });
    // if (error) {
    //   console.log(error)
    //  }else{
    //   getData()
    //   toast.success("deleted successfully")
    //  }

  })
  useEffect(()=>{
    // let  datasarray = []
    // let dataS = localStorage.getItem("todo")
    // var nameArr = dataS.split(',');
    // datasarray.push(nameArr)
    dispatch(getTodo())


  },[])
  // let viewmore =(async()=>{
  //   let datas = await axios.get(`http://localhost:8001/api?limit=${limit}`)

  //   datas &&   setdats(datas.data)
  // })
  // useEffect(()=>{
  //   viewmore()
   


  // },[limit])
  useEffect(()=>{
    if(remove!==null){
      const result = dats.filter(word => word!== remove);
      localStorage.setItem("todo",result)
      toast.error("succesfully deleted")
      window.location.href="/edit"
    }



  },[remove])
let setItem = (()=>{
  let dataS = localStorage.getItem("todo")

  localStorage.setItem("todo",[dataS,editInput])
  edits()
})
  let edits = (()=>{
 let dataS = localStorage.getItem("todo")
 var nameArr = dataS.split(',');
       const result2 = nameArr.filter(word => word!== edit);
      localStorage.setItem("todo",result2)
      toast.success("succesfully Edited")
      const interval = setInterval(() => {
        window.location.href ='/edit'
      }, 2000);
interval()

  })
 
  // let clickHandler = ((e)=>{
  //   let tick = []
  //   tick.push(e.target.value)
  
  //  })

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    height:"30vh",
    transform: 'translate(-50%, -50%)',
  },
};
let editHandler =(async()=>{
  // client
  // .mutate({
  //   mutation: gql`
  //   mutation{
  //     updateTodo(id:${edit},title:"${editInput}") {
  //       id
  //     }
  //   }
  //   `,
  // })
  // .then((result) => result && getData(),  toast.success("updated successfully"), closeModal())
  dispatch(EditTodo(edit,editInput))
  toast.success("Edited successfuly")

  setInterval(() => {
    window.location.href ='/edit'
    
  },1000);
  // let datas = await axios.put(`http://localhost:8001/api/${edit}`, {title:editInput})
  // if(datas.data.message ==='Todo was updated successfully.'){
  //   getData()
  //   toast.success(datas.data.message)
  // }


})
console.log(dats)
  return (

    <>
    
   <div style={{ marginLeft: "10%" }}>

      <div > 
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div style={{display:"flex" ,justifyContent:"space-between" ,marginBottom:"30%"}}>
          <h2        
ref={(_subtitle) => (subtitle = _subtitle)}>Edit</h2>
          <Button style={{borderRadius:"100%" ,height:"40px"}} variant='danger' onClick={closeModal}>x</Button>
          </div>
    
          <input onChange={(e) => { setEdit(e.target.value); } } />
          <Button type='button' onClick={(e) => { editHandler(); } }> Submit</Button>
        </Modal>
      </div>


{loading ?   <div className="sweet-loading" style={{marginTop:"400px",marginRight:"100px"}}>

<ClipLoader
  color={color}
  loading={loading}
  cssOverride={override}
  size={150}
  aria-label="Loading Spinner"
  data-testid="loader"
/>
</div> :   dats && dats.map((items)=>{



return  <Card style={{margin:"80px"}}>
    <Card.Header style={{background:"rgb(13,110,253)",color:"white"}}><Profile id={items.USERId}  /></Card.Header>
    <Card.Body>
      <Card.Title>                  
</Card.Title>
      <Card.Text>
        {items.title}
       </Card.Text>
      {items.USERId == id &&          <Button style={{margin:"10px"}} variant="primary" onClick={() => [openModal(), setediting(items.id)]}>Edit</Button>
                }   
                      {items.USERId == id && <Button variant="danger" onClick={() => deleteHandler(items.id)}>Delete</Button>
                }   </Card.Body>
  </Card>
})}

{dats && dats.length < 1 && <h1 style={{textAlign:"center",marginTop:"200px"}}>No entries found</h1>}
        



      {/* <div>
      <h1>Checkbox</h1>
    {dats &&dats.map((items)=>(
      items !== '' &&
      <div>
         <p>
        {items.lists}
        &nbsp;&nbsp;&nbsp;
        {tick && tick.length && tick.includes(items) ?          <><input type="checkbox" defaultChecked value={`${items}`} /><span style={{marginLeft:"10px"}}>completed</span></>
:          <input type="checkbox" value={`${items}`}/>
}      <Button style={{marginLeft:"200px"}}  variant="danger" onClick={()=>{setremove(items)}}>Delete</Button>{' '}
      
      </p>
  
    
      </div>
  
    ))}
    </div> */}
      {/* <Button  style={{marginLeft:"90%"}} variant="primary" onClick={()=>{setLimit(limit+5)}} >View more</Button> */}

    </div><ToastContainer position='bottom' /></>

  )
}

export default Edit