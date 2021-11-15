import React, { useEffect, useState } from "react";
import "./SubCategory.css";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Header from "../../Components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { addNewCategory, deleteCategories } from "../../Redux/Actions/category";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";

const SubCategory = (props) => {
  const categoryList = useSelector((state) => state.category.categories);
  const [subCateArray, setSubCateArray] = useState([]);
  const [newCategoryName, setNewCatogoryName] = useState("");
  const [newCategoryImage, setNewCatogoryImage] = useState("");
  const [newCategoryParentId, setNewCatogoryParentId] = useState("");
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    categoryList.map((cate, ind) => {
      cate.childrenCategory.map((subCate, subInd) => {
        setSubCateArray((init) => [
          ...init,
          {
            id: subCate._id,
            name: subCate.name,
            parentId: subCate.parentId,
            categoryImage: cate.categoryImage,
          },
        ]);
      });
    });
  }, [categoryList]);

  const handleCategoryImageChange = (e) => {
    setNewCatogoryImage(() => e.target.files[0]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const newCategoryForm = new FormData();

    newCategoryForm.append("name", newCategoryName);
    newCategoryForm.append("parentId", newCategoryParentId);
    newCategoryForm.append("categoryImage", newCategoryImage);

    dispatch(addNewCategory(newCategoryForm));

    setNewCatogoryName("");
    setNewCatogoryParentId("");

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
    { field: "parentId", headerName: "Parent ID", width: 130 },
    {
      field: "categoryImage",
      headerName: "Image",
      width: 300,
    },
  ];

  const subCategoryList = (parentCategory) => {
    if (parentCategory.childrenCategory.length > 0) {
      let children = parentCategory.childrenCategory;
      setSubCateArray((initSubCate) => [
        ...initSubCate,
        {
          id: children._id,
          name: children.name,
          parentId: children.parentId,
          categoryImage: children.categoryImage,
        },
      ]);
    }
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
            label="Sub-Category Name"
            type="text"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCatogoryName(e.target.value)}
          />
          <div className="select_container">
            <select
              name="category_select"
              id="category_select"
              onChange={(e) => setNewCatogoryParentId(e.target.value)}
            >
              <option value="" key="">
                Category
              </option>
              {categoryList.map((nowCate, ind) => (
                <option value={nowCate._id} key={nowCate._id}>
                  {nowCate.name}
                </option>
              ))}
            </select>
          </div>
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

  const addSelectedSubCategories = (e) => {
    if (e.isSelected) {
      setSelectedSubCategory((init) => [...init, e.data.id]);
    } else {
      const temp = selectedSubCategory.filter((curr) => curr != e.data.id);
      setSelectedSubCategory(temp);
    }
  };

  const deleteBtnClicked = () => {
    dispatch(deleteCategories(selectedSubCategory));
    handleCloseDelete();
  };

  const renderDeleteSubCategories = () => {
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
          {selectedSubCategory.map((curr) => (
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
      <div className="sub_category_container">
        <div className="sub_category_grid">
          <DataGrid
            rows={subCateArray}
            columns={columns}
            pageSize={10}
            checkboxSelection
            onRowSelected={addSelectedSubCategories}
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
            Add Sub-Category
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={handleClickOpenDelete}
          >
            Delete
          </Button>
        </div>
      </div>
      {addCategoryDialog()}
      {renderDeleteSubCategories()}
    </Header>
  );
};

export default SubCategory;
