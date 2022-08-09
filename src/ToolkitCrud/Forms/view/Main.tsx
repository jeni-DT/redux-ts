import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import { useDispatch, } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/Store";
import { addUsers} from "../UserSlice";

const Main = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  type values={
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
 
  

  const [InValue, setInValue] = useState<values>({});
  const [error, setError] = useState <errorType>({});

  const handleText = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target)
    const { name, value } = e.target;

    console.log(e.target);

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

    setInValue({ ...InValue, [name]: value });
  };
  const Validate = () => {
    const {
      firstname,
      lastname,
      phonenumber,
      mail,
      arrival,
      departure,
      // noguests,
      // roomtype,
    } = InValue;
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

  const handleSub = (e:React.FormEvent) => {
    e.preventDefault();

    console.log(InValue);

    let errorsValid = Validate();
    if (Object.keys(errorsValid).length === 0) {
      dispatch(addUsers(collections))
      navigate('/user')
    } else {
      console.log("errorvalid", errorsValid);
      setError(errorsValid);
    }
  };
  // type collection ={
  //   firstname ?:string;
  //   lastname ?:string;
  //   phonenumber ?:number;
  //   mail ?:string;
  //   arrival ?: string;
  //   departure ?:string;
  //   noguests ?:number;
  //   roomtype ?:string;

  // }
  const collections={
    // id:InValue.id,
    firstname:InValue.firstname,
    lastname:InValue.lastname,
    phonenumber:InValue.phonenumber,
    mail:InValue.mail,
    arrival:InValue.arrival,
    departure:InValue.departure,
    // noguests:InValue.noguests,
    // roomtype:InValue.roomtype,
  }
  return (
    <div>
      
      <div>
        <body className="hotel">
          <div className="title">
            <h1>Resort Booking</h1>
          </div>

          <Container className="resortcont">
            <Form onSubmit={(e) => handleSub(e)}>
              <div className="mt-5">
                <div className="headform">
                  <h2>
                    <mark>BOOKING FORM</mark>
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
                      value={InValue.firstname}
                      onChange={ handleText}
                      data-testid="firstname"
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
                      value={InValue.lastname}
                      onChange={handleText}
                      data-testid="lastname"
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
                      value={InValue.phonenumber}
                      onChange={handleText}
                      data-testid="phonenumber"
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
                      value={InValue.mail}
                      onChange={handleText}
                      data-testid="mail"
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
                      value={InValue.arrival}
                      onChange={ handleText}
                      data-testid="arrival"
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
                      value={InValue.departure}
                      onChange={handleText}
                      data-testid="departure"
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
                    <br></br>
                    <select
                      id="country"
                      className="options"
                      name="noguests"
                      value={InValue.noguests}
                      onChange={(e) => handleText(e)}
                      data-testid="noguests"
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
                    <br></br>
                    <select
                      id="country1"
                      className="option"
                      name="roomtype"
                      value={InValue.roomtype}
                      onChange={(e) => handleText(e)}
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
                <Button variant="primary" type="submit">
                  <b>
                    <i>BOOK NOW</i>
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

export default Main;
