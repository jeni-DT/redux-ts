import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Main from "./Main";
import { BrowserRouter as Router } from "react-router-dom";

const middlewares = [thunk];
const store = configureStore({
  reducer: {},
  middleware: middlewares,
});
describe("<Main />", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <Provider store={store}>
        <Router>
          <Main />
        </Router>
      </Provider>
    );
  });

  it("just-tested", () => {
    const firstname: HTMLInputElement = screen.getByTestId("firstname");

    const lastname: HTMLInputElement = screen.getByTestId("lastname");

    const phonenumber: HTMLInputElement = screen.getByTestId("phonenumber");

    const mail: HTMLInputElement = screen.getByTestId("mail");

    const arrival: HTMLInputElement = screen.getByTestId("arrival");

    const departure: HTMLInputElement = screen.getByTestId("departure");

    fireEvent.change(firstname, { target: { value: "Jeni" } });
    fireEvent.change(lastname, { target: { value: "Aro" } });
    fireEvent.change(phonenumber, { target: { value: "9025143828" } });
    fireEvent.change(mail, { target: { value: "jeni@gmail.com" } });
    fireEvent.change(arrival, { target: { value: "2021-01-09" } });
    fireEvent.change(departure, { target: { value: "2021-01-09" } });

    expect(firstname.value).toBe("Jeni");
    expect(lastname.value).toBe("Aro");
    expect(phonenumber.value).toBe("9025143828");
    expect(mail.value).toBe("jeni@gmail.com");
    expect(arrival.value).toBe("2021-01-09");
    expect(departure.value).toBe("2021-01-09");
  });
});
