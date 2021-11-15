import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Header from "../../Components/Header/Header";
import "./Category.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";
import { addNewCategory, deleteCategories } from "../../Redux/Actions/category";

const Category = (props) => {
  const categoryList = useSelector((state) => state.category.categories);
  const [row, setRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newCategoryName, setNewCatogoryName] = useState("");
  const [newCategoryImage, setNewCatogoryImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    categoryList.map((cate, ind) => {
      setRow((init) => [
        ...init,
        {
          id: cate._id,
          name: cate.name,
          categoryImage: cate.categoryImage,
        },
      ]);
    });
  }, [categoryList]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const newCategoryForm = new FormData();

    newCategoryForm.append("name", newCategoryName);
    newCategoryForm.append("categoryImage", newCategoryImage);

    dispatch(addNewCategory(newCategoryForm));

    setNewCatogoryName("");

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
    {
      field: "categoryImage",
      headerName: "Image",
      width: 300,
    },
  ];

  const handleCategoryImageChange = (e) => {
    setNewCatogoryImage(() => e.target.files[0]);
  };

  const addCategoryDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCatogoryName(e.target.value)}
          />
          <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImageChange}
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

  const addSelectedCategories = (e) => {
    if (e.isSelected) {
      setSelectedCategory((init) => [...init, e.data.id]);
    } else {
      const temp = selectedCategory.filter((curr) => curr != e.data.id);
      setSelectedCategory(temp);
    }
  };

  const deleteBtnClicked = () => {
    dispatch(deleteCategories(selectedCategory));
    handleCloseDelete();
  };

  const renderDeleteCategories = () => {
    return (
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete following categories"}
        </DialogTitle>
        <DialogContent>
          {selectedCategory.map((curr) => (
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
      <div className="category_container">
        <div className="category_grid">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            checkboxSelection
            onRowSelected={addSelectedCategories}
          />
        </div>
        <div className="buttons_container">
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={handleClickOpen}
          >
            Add Category
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
      {addCategoryDialog()}
      {renderDeleteCategories()}
    </Header>
  );
};

export default Category;
