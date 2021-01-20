import React from "react";
import "./Create.css";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import Parse from "parse";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      seats: 0, // Set by default
      coach: "",
      time: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  changeHandler = (event) => {
    const name = event.target.getAttribute("id");
    const value = event.target.value;

    console.log("Trigger");

    console.log(value);
    console.log(name);

    /*console.log(this.state.seats);
    console.log(this.state.time);
    console.log(this.state.coach);*/

    if (!value || value === "") {
      // console.log('Entro error');
      this.setState({
        [`${name}Error`]: true,
      });
    } else {
      // console.log('No Error');
      this.setState({
        [`${name}Error`]: false,
        [name]: value,
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    // Get rid of the timing part - strings with pm
    const time = Number(this.state.time.split(" ").shift());
    const hours = time === 6 ? 18 : 19;

    console.log(this.state.seats);
    console.log(time);
    console.log(this.state.coach);

    const Class = Parse.Object.extend("Class");
    const myNewObject = new Class();

    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let classTime = new Date(year, month, day, hours).getTime();

    myNewObject.set("seats", Number(this.state.seats));
    myNewObject.set("time", classTime);
    myNewObject.set("coach", this.state.coach);

    myNewObject.save().then(
      (result) => {
        //document.write(`Class created: ${JSON.stringify(result)}`);
        console.log("Class created", result);
        alert("User created!");
        this.props.history.push("/");
      },
      (error) => {
        console.error("Error while creating Class: ", error);
      }
    );

    /*newClass.set("seats", Number(this.state.seats));
    newClass.set("password", Number(time));
    newClass.set("email", this.state.coach || "");

    try {
      const result = await newClass.save();
      if (result) {
        alert("User created!");
        this.props.history.push("/");
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }*/
  };

  render() {
    return (
      <section id="register">
        <Container>
          <Row>
            <h1>Fill class details</h1>
          </Row>
          <Row className={"box-form"}>
            <Col>
              <Form onSubmit={this.handleSubmit} className={"formLogin"}>
                <Form.Group>
                  <Form.Label htmlFor="seats">Seats:</Form.Label>
                  <Form.Control
                    required
                    id="seats"
                    type="number"
                    onChange={this.changeHandler}
                  />
                  <Form.Control.Feedback
                    className={
                      this.state.usernameError ? "displayErrors" : "noError"
                    }
                  >
                    Seats is required
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="time">Time:</Form.Label>
                  <Form.Control
                    id="time"
                    as="select"
                    onChange={this.changeHandler}
                  >
                    <option></option>
                    <option>6 pm</option>
                    <option>7 pm</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="seats">Coach:</Form.Label>
                  <Form.Control
                    id="coach"
                    type="text"
                    onChange={this.changeHandler}
                  />
                </Form.Group>
                <Form.Row>
                  <Button
                    type="submit"
                    className={"btn btn-primary"}
                    disabled={
                      this.state.seats <= 0 || !this.state.seats ? true : false
                    }
                  >
                    Create
                  </Button>
                  {/*<Button href="/" variant="link">
                    Login
                  </Button>*/}
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Register;
