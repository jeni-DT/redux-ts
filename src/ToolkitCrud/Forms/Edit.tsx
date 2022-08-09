import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUsers,editUsers} from "./UserSlice";


import { AppDispatch, RootState } from "../store/Store";

const Edit = () => {
  type val={
    id ?: number;
    firstname ?:string;
    lastname ?:string;
    phonenumber ?:number;
    mail ?:string;
    arrival ?: string;
    departure ?:string;
    // noguests ?:number;
    // roomtype ?:string;
  }
  type errorType ={
    firstname ?:string;
    lastname ?:string;
    phonenumber ?:string;
    mail ?:string|undefined;
    arrival ?: string;
    departure ?:string;
    // noguests ?:string;
    // roomtype ?:string;
  }
  const [values, setValues] = useState<val>({});
  const [error,setError]=useState<errorType>({});
  const {id}=useParams();
  const navigate=useNavigate();
  const dispatch=useDispatch<AppDispatch>();
  const editData =useSelector((state:RootState)=>state.user)
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const{name,value}=e.target
    console.log(e.target)
    switch (name) {
        case "firstname":
          error.firstname = "";
          break;
  
        case "lastname":
          error.lastname = "";
          break;
  
        case "phonenumber":
          error.phonenumber = "";
          break;
        case "mail":
          error.mail = "";
          break;
        case "arrival":
          error.arrival = "";
          break;
        case "departure":
          error.departure = "";
          break;
        // case "noguests":
        //   error.noguests = "";
        //   break;
        // case "roomtype":
        //   error.roomtype = "";
        //   break;
  
        default:
          break;
      }
      setValues({...values,[name]:value});
  }
  const Validate = () => {
    const {
      id,
      firstname,
      lastname,
      phonenumber,
      mail,
      arrival,
      departure,
      // noguests,
      // roomtype,
    } = values;
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let errors:errorType = {};
    let email=mail?.match(regEx)
    if (firstname === "") {
      errors.firstname = "First name can't be blank *";
    }
    if (lastname === "") {
      errors.lastname = "LastName can't be blank*";
    }

    if (!phonenumber) {
      errors.phonenumber = "Phonenumber can't be blank*";
    }
    if (phonenumber?.toString()?.length!= 10) {
      errors.phonenumber = "Phonenumber must be 10 numbers*";
    }
    if (mail === "") {
      errors.mail = "email can't be blank*";
    }
    else if (!email) {
      errors.mail = "Please Enter the valid mail*";
    }
    if (arrival === "") {
      errors.arrival = "please fill the arrival date*";
    }

    if (departure === "") {
      errors.departure = "please fill the departure date*";
    }
    else if(departure === arrival){
      errors.departure="Please enter the valid date "
    }
    // let check=noguests!==0

    // if (check) {
    //   errors.noguests = "please choose the number of guests*";
    // }

    // if (roomtype === "") {
    //   errors.roomtype = "Please choose the room type*";
    // }
   
    return errors;
  };
  useEffect(()=>{
    dispatch(fetchUsers()); 
  },[])
  const filteredData =
    editData && editData.users.find((data:any) => data.id .toString()===id);
  useEffect(() => {
    
    if (filteredData) {
    setValues(filteredData);
    }
  }, [filteredData]);
  
  const handleSubmit=(e:React.FormEvent)=>{ 
e.preventDefault();
let errors = Validate();
    if (Object.keys(errors).length === 0) {
        dispatch(editUsers(changes));
        
        navigate("/user");
    } else {
      console.log("errorvalid", errors);
      setError(errors);
    }
  }
  const changes={
    id:values.id,
    firstname:values.firstname,
    lastname:values.lastname,
    phonenumber:values.phonenumber,
    mail:values.mail,
    arrival:values.arrival,
    departure:values.departure,
    // noguests:values.noguests,
    // roomtype:values.roomtype

  }
  return (
    <div >
      <div>
        <body className="update" >
          <div className="title">
            <h1 className="updateheader">Resort Booking</h1>
          </div>

          <Container className="resortcont">
            <Form onSubmit={handleSubmit}>
              <div className="mt-5">
                <div className="headform">
                  <h2>
                    Changes the Form 
                  </h2>
                  <br></br>
                </div>
                <Row>
                  <Col>
                    <Form.Label>
                      <b>FirstName</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="FirstName"
                      name="firstname"
                      value={values.firstname}
                      onChange={handleChange}
                    ></Form.Control>
                    {error.firstname && (
                        <span style={{ color: "red" }}>{error.firstname}</span>
                    )}
                  </Col>
                  <Col>
                    <Form.Label>
                      <b>LastName</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="LastName"
                      name="lastname"
                      value={values.lastname}
                      onChange={handleChange}
                     
                    ></Form.Control>
                    {error.lastname && (
                        <span style={{ color: "red" }}>{error.lastname}</span>
                    )}
                  </Col>
                </Row>
              </div>
              <br></br>

              <div>
                <Row>
                  <Col>
                    <Form.Label>
                      <b>Phone number</b>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Phone number"
                      name="phonenumber"
                      value={values.phonenumber}
                      onChange={handleChange}
                    ></Form.Control>
                   {error.phonenumber && (
                        <span style={{ color: "red" }}>{error.phonenumber}</span>
                    )}
                  </Col>
                  <Col>
                    <Form.Label>
                      <b>Email</b>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="mail"
                      value={values.mail}
                      onChange={handleChange}
                    ></Form.Control>
                    {error.mail && (
                        <span style={{ color: "red" }}>{error.mail}</span>
                    )}
                  </Col>
                </Row>
              </div>
              <br></br>

              <div>
                <Row>
                  <Col>
                    <Form.Label>
                      <b>Arrival</b>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Arrival Date"
                      name="arrival"
                      value={values.arrival}
                      onChange={handleChange}
                    ></Form.Control>
                    {error.arrival && (
                        <span style={{ color: "red" }}>{error.arrival}</span>
                    )}
                  </Col>
                  <Col>
                    <Form.Label>
                      <b>Departure</b>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Departure Date"
                      name="departure"
                      value={values.departure}
                      onChange={handleChange}
                    ></Form.Control>
                    {error.departure && (
                        <span style={{ color: "red" }}>{error.departure}</span>
                    )}
                  </Col>
                </Row>
              </div>
              <br></br>
              {/* <div>
                <Row>
                  <Col>
                    <Form.Label>
                      <b>No.of guests</b>
                    </Form.Label>
                    <select
                      id="country"
                      className="options"
                      name="noguests"
                      value={values.noguests}
                      onChange={handleChange}
                    >
                       <option value="members">Members</option>
                      <option value="1">1</option>
                      <option value="2">2 </option>
                      <option value="3">3</option>
                      <option value="4">4 </option>
                      <option value="5">5 </option>
                      <option value="6">6 </option>
                    </select>
                    {error.noguests && (
                        <span style={{ color: "red" }}>{error.noguests}</span>
                    )}
                  </Col>
                  <Col>
                    <Form.Label>
                      <b>Room type</b>
                    </Form.Label>
                    <select
                      id="country1"
                      className="option"
                      name="roomtype"
                      value={values.roomtype}
                      onChange={handleChange}
                    >
                      <option value="Type">Room Type</option>
                      <option value="Single">Single Room</option>
                      <option value="Double">Double Room </option>
                      <option value="Suit">Suit Room</option>
                    </select>
                    {error.roomtype && (
                        <span style={{ color: "red" }}>{error.roomtype}</span>
                    )}
                  </Col>
                </Row>
              </div> */}
              <br></br>
              <div className="btnS">
                <Button variant="info" type="submit">
                  <b>
                    <i>UPDATE</i>
                  </b>
                </Button>{" "}
              </div>
            </Form>
          </Container>
        </body>
      </div>
    </div>
  );
};

export default Edit;
