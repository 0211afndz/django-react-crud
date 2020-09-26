import logo from './logo.svg';
import './App.css';

  import React, { Component } from "react";
    import Modal from "./components/Modal";
    import axios from "axios";

    class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
          modal: false,
          activeItem: {
            name: "",
            pages: "",
          },
          bookList: []
        };
      }
      componentDidMount() {
        this.refreshList();
      }
      refreshList = () => {
        axios
          .get("http://localhost:8000/api/books/")
          .then(res => this.setState({ bookList: res.data }))
          .catch(err => console.log(err));
      };

      renderItems = () => {
        const newItems = this.state.bookList;
        return newItems.map(item => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
          <span
              className={`frontend-title mr-2`}
              name={item.name}
            >
              {item.name}
            </span>
            <span
              className={`frontend-title mr-2`}
              name={item.pages}
            >
              {item.pages}
            </span>
            <span>
              <button className="btn btn-secondary mr-2" onClick={() => this.editItem(item)}> {""} Edit {""} </button>
              <button className="btn btn-danger" onClick={() => this.handleDelete(item)}> {""} Delete {""} </button>
            </span>
          </li>
        ));
      };

      toggle = () => {
        this.setState({ modal: !this.state.modal });
      };
      handleSubmit = item => {
        this.toggle();
        if (item.id) {
          axios
            .put(`http://localhost:8000/api/books/${item.id}/`, item)
            .then(res => this.refreshList());
          return;
        }
        axios
          .post("http://localhost:8000/api/books/", item)
          .then(res => this.refreshList());
      };
      handleDelete = item => {
        axios
          .delete(`http://localhost:8000/api/books/${item.id}`)
          .then(res => this.refreshList());
      };
      createItem = () => {
        const item = { name: "", pages: "" };
        this.setState({ activeItem: item, modal: !this.state.modal });
      };
      editItem = item => {
        this.setState({ activeItem: item, modal: !this.state.modal });
      };


      render() {
        return (
          <main className="content">
            <h1 className="text-white text-uppercase text-center my-4">Book List</h1>
            <div className="row ">
              <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="card p-3">
                  <div className="">
                    <button onClick={this.createItem} className="btn btn-primary">Add Book</button>
                  </div>
                  <ul className="list-group list-group-flush">
                    {this.renderItems()}
                  </ul>
                </div>
              </div>
            </div>
              {this.state.modal ? (
              <Modal
                activeItem={this.state.activeItem}
                toggle={this.toggle}
                onSave={this.handleSubmit}
              />
            ) : null}
          </main>

        );
      }
    }
    export default App;
