import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";

const ManageCars = () => {
  const [products, setProducts] = useState([]);

  // Load products
  useEffect(() => {
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [products]);

  // Delete product
  const deleteProduct = (id) => {
    console.log(id);
    const proceed = window.confirm("Are you sure that you want to delete?");
    if (proceed) {
      const url = `http://localhost:5000/cars/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log(data.deletedCount);
          if (data.deletedCount) {
            alert("successfully deleted");
            const remaining = products.filter((product) => product._id !== id);
            setProducts(remaining);
          }
        });
    }
  };
  const handleState = (id) => {
    const proceed = window.confirm("Are you sure that you want to update?");
    if (proceed) {
      const url = `http://localhost:5000/updateCar/${id}`;
      fetch(url, {
        method: "put",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("first console", data);
          if (data.modifiedCount > 0) {
            alert("Status Changed Successfully");

            fetch("http://localhost:5000/cars")
              .then((res) => res.json())
              .then((data) => setProducts(data));
          }
        });
    }
  };

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Product Name</th>
            <th>Founded</th>
            <th>Price($)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{product?.name}</td>
              <td>{product?.founded}</td>
              <td>{product?.price}</td>
              <td>{product?.status}</td>
              <td>
                <div className="d-flex justify-content-center fs-4">
                  {product?.status === "Available" && (
                    <span
                      onClick={() => handleState(product?._id)}
                      role="button"
                      className="px-2 text-primary"
                    >
                      <BiEditAlt />{" "}
                    </span>
                  )}
                  <span
                    onClick={() => deleteProduct(product?._id)}
                    role="button"
                    className="px-2 text-danger"
                  >
                    <MdDeleteSweep />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageCars;
