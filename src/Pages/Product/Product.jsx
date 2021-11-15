import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import Header from "../../Components/Header/Header";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import "./Product.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";
import { createProduct, deleteProducts } from "../../Redux/Actions/product";

const Product = (props) => {
  const productsList = useSelector((state) => state.product.products);
  const categoryList = useSelector((state) => state.category.categories);
  const [productsArray, setProductsArray] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductImage, setNewProductImage] = useState("");
  const [newProductParentId, setNewProductParentId] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    productsList.map((product, ind) => {
      setProductsArray((init) => [
        ...init,
        {
          id: product._id,
          name: product.name,
          parentId: product.parentId,
          price: product.price,
          description: product.description,
          productImage: product.productImage,
        },
      ]);
    });
  }, [productsList]);

  const handleProductImageChange = (e) => {
    setNewProductImage(() => e.target.files[0]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const newProductForm = new FormData();

    newProductForm.append("name", newProductName);
    newProductForm.append("price", newProductPrice);
    newProductForm.append("description", newProductDescription);
    newProductForm.append("parentId", newProductParentId);
    newProductForm.append("productImage", newProductImage);

    dispatch(createProduct(newProductForm));

    setNewProductName("");
    setNewProductPrice("");
    setNewProductDescription("");
    setNewProductParentId("");

    setOpen(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 230 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "parentId", headerName: "ParentId", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    {
      field: "productImage",
      headerName: "Image",
      width: 300,
    },
  ];

  const addProductDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product Name"
            type="text"
            fullWidth
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Product Price"
            type="text"
            fullWidth
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Product Description"
            type="text"
            fullWidth
            value={newProductDescription}
            onChange={(e) => setNewProductDescription(e.target.value)}
          />
          <div className="select_container">
            <select
              name="sub_category_select"
              id="sub_category_select"
              onChange={(e) => setNewProductParentId(e.target.value)}
            >
              <option value="" key="">
                Product
              </option>
              {categoryList.map((cate, ind) =>
                cate.childrenCategory.map((subCate, index) => (
                  <option value={subCate._id} key={subCate._id}>
                    {cate.name} -{subCate.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <input
            type="file"
            name="productImage"
            onChange={handleProductImageChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const addSelectedProducts = (e) => {
    if (e.isSelected) {
      setSelectedProduct((init) => [...init, e.data.id]);
    } else {
      const temp = selectedProduct.filter((curr) => curr != e.data.id);
      setSelectedProduct(temp);
    }
  };

  const deleteBtnClicked = () => {
    dispatch(deleteProducts(selectedProduct));
    handleCloseDelete();
  };

  const renderDeleteProducts = () => {
    return (
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete following products?"}
        </DialogTitle>
        <DialogContent>
          {selectedProduct.map((curr) => (
            <DialogContentText>{curr}</DialogContentText>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            No
          </Button>
          <Button onClick={deleteBtnClicked} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Header>
      <div className="product_container">
        <div className="product_grid">
          <DataGrid
            rows={productsArray}
            columns={columns}
            pageSize={20}
            checkboxSelection
            onRowSelected={addSelectedProducts}
          />
        </div>
        <div className="buttons_container">
          <Button
            variant="contained"
            size="medium"
            color="primary"
            style={{ marginTop: "20px" }}
            onClick={handleClickOpen}
          >
            Add Product
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            // onClick={deleteBtnClicked}
            onClick={handleClickOpenDelete}
          >
            Delete
          </Button>
        </div>
      </div>
      {addProductDialog()}
      {renderDeleteProducts()}
    </Header>
  );
};

export default Product;
