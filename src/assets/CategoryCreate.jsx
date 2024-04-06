import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import OutlinedInput from '@mui/material/OutlinedInput';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { Button, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Select, Stack, Typography, useMediaQuery } from '@mui/material';
import theme from '../theme';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from 'next/image';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MenuItem from '@mui/material/MenuItem';
import { BackofficeStateContext } from '../utils/BackofficeState';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CategoryCreate(props) {
  const { open, setOpen } = props;
  const [category, setCategory] = React.useState([]);
  const [checkedCategoryIndex, setCheckedCategoryIndex] = React.useState(null);
  const [checkedSubcategoryIndex, setCheckedSubcategoryIndex] = React.useState(null);
  const [childCategory, setChildCategory] = React.useState([]);
  const { dispatch_office } = React.useContext(BackofficeStateContext);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [imgAvatarFile, setImgAvatarFile] = React.useState([]);
  const [chipData, setChipData] = React.useState([]);
  const [parentCatName, setParentCatName] = React.useState("New Category");
  const [subCatName, setSubCatName] = React.useState("New Sub Category");
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  

  React.useEffect(() => {
    setChipData(imgAvatarFile);
  }, [imgAvatarFile])
  

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip?.image?.name !== chipToDelete?.image?.name));
    setImgAvatarFile((prevImgFile) => prevImgFile.filter((item) => item?.image?.name !== chipToDelete?.image?.name));
  };

  React.useEffect(() => {
    fetchCategories();
  }, [loading]);

  const fetchCategories = async ()=> {
    try {
    const { data } = await axios.get('/api/category');
    setCategory(data);
    setLoading(false);
    handleClose();
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }
  
  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleCategoryChange = (index, catName, slug) => {
    setCheckedCategoryIndex(index);
    setCheckedSubcategoryIndex(null);
    dispatch_office({ type: 'CREATE_PRODUCT', payload: { category: catName, categoryUrl: slug } });
  };

  const handleSubCategoryChange = (parentIndex, subIndex, subName, subUrl) => {
    if (parentIndex !== checkedCategoryIndex) {
      setCheckedCategoryIndex(parentIndex);
    }
    setCheckedSubcategoryIndex(subIndex);
    dispatch_office({ type: 'CREATE_PRODUCT', payload: { subCategory: subName, subCategoryUrl: subUrl } });
  };

  function handleAvatarChoose(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImgAvatarFile([
          ...imgAvatarFile,
          {            
            image: file,
            imageUrl: reader.result
          }
        ]);
        e.target.value = ''
    }
    reader.readAsDataURL(file);
  }

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      images: imgAvatarFile?.map(item => item),
    }
    try {
    console.log(formData);
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formOutput = new FormData(e.currentTarget);
    const formData = {
      categoryName: formOutput.get('category'),
      avatar: {image: imgAvatarFile?.map(item => item.image.name), imageUrl: imgAvatarFile?.map(item => item.imageUrl)},
      slug: formOutput.get('slug'),
      subCategory: [
        {
          url: formOutput.get('subcategory-slug'),
          subCategoryName: formOutput.get('subcategory'),
          topCategoryName: formOutput.get('category'),
          topCategoryUrl: formOutput.get('slug')
        }
      ]
    }
    if (parentCatName.toString() === "New Category" && formData.categoryName === '') {
      return setError('please enter category name');
    }
    if (parentCatName.toString() === "New Category" && formData.slug === '') {
      return setError('please enter category slug');
    }
    if (parentCatName.toString() !== "New Category" && formData.subCategory[0].subCategoryName === '') {
      return setError('please enter sub category name');
    }
    if (parentCatName.toString() !== "New Category" && formData.subCategory[0].url === '') {
      return setError('please enter sub category url');
    }
    if (formData.avatar.image.length === 0) {
      return setError('please upload category icon');
    }
    try {
      console.log(formData, 'new');
      const { data } = axios.post('/api/category/create_category', formData);
      setParentCatName("New Category");
      setChipData([]);
      setImgAvatarFile([]);
      setSubCatName("New Sub Category");
      setError('');
      setLoading(true);
    } catch (error) {
      console.log(error, error.data);
      setError(`error: ${error}`);
      setLoading(false);
    }
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formOutput = new FormData(e.currentTarget);
    const selectedCategory = category.find((cat) => cat.categoryName === parentCatName.toString());
    console.log(selectedCategory);
    const formData = {
      categoryName: selectedCategory?.categoryName,
      image_name: imgAvatarFile[0]?.image?.name,
      avatar: imgAvatarFile[0]?.imageUrl,
      slug: selectedCategory?.slug,
      subCategory: [
        {
          url: subCatName.toString() === 'New Sub Category' ? formOutput.get('subcategory-slug') : selectedCategory?.subCategory[0].url,
          subCategoryName: subCatName.toString() === 'New Sub Category' ? formOutput.get('subcategory') : subCatName.toString(),
          topCategoryName: selectedCategory?.categoryName,
          topCategoryUrl: selectedCategory?.slug
        }
      ]
    }
    if (parentCatName.toString() !== "New Category" && subCatName.toString() === 'New Sub Category' && formData.subCategory[0].subCategoryName === '') {
      return setError('please enter subcategory name');
    }
    if (parentCatName.toString() !== "New Category" && subCatName.toString() === 'New Sub Category' && formData.subCategory[0].url === '') {
      return setError('please enter subcategory slug');
    }
    if (parentCatName.toString() !== "New Category" && formData.avatar === undefined) {
      return setError('please upload category icon');
    }
    if (parentCatName.toString() !== "New Category" && formData.image_name === undefined) {
      return setError('please upload category icon');
    }
    try {
      console.log(formData, 'edit');
      const { data } = axios.put('/api/category/edit_category', formData);
      setError('');
      setLoading(true);
      setParentCatName("New Category");
      setChipData([]);
      setImgAvatarFile([]);
      setSubCatName("New Sub Category");
    } catch (error) {
      console.log(error, error.data);
      setError(`error: ${error}`);
      setLoading(false);
    }
  }

  const handleChangeParentCat = (event) => {
    const {
      target: { value },
    } = event;
    if (value === "New Category") {
      setParentCatName("New Category");
      setChipData([]);
      setImgAvatarFile([]);
      setSubCatName("New Sub Category");
    } else {
      setParentCatName(typeof value === 'string' ? value.split(',') : value);
      const selectedCategory = category.find((cat) => cat.categoryName === value);
      if (selectedCategory) {
        const subCategories = selectedCategory.subCategory.map((subCat) => subCat.subCategoryName);
        setSubCatName(subCategories[0]);
        setChildCategory(selectedCategory);
      }
    }
  };

  const handleChangeSubCat = (event) => {
    const {
      target: { value },
    } = event;
    setSubCatName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Box>
      {
        category?.map((item, parentIndex) => (
          <Box key={item._id}>
            <FormControlLabel
              label={item?.categoryName}
              control={
                <Checkbox
                checked={parentIndex === checkedCategoryIndex}
                onChange={() => handleCategoryChange(parentIndex, item?.categoryName, item?.slug)}
                />
              }
            />
            {
             item?.subCategory?.map((subCategory, subIndex) => (
                <Box key={subCategory._id} sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                  <FormControlLabel
                    label={subCategory?.subCategoryName}
                    control={
                    <Checkbox
                    checked={parentIndex === checkedCategoryIndex && subIndex === checkedSubcategoryIndex}
                    disabled={parentIndex === 0 && checkedCategoryIndex === 0 ? checkedCategoryIndex : !checkedCategoryIndex || (checkedCategoryIndex !== parentIndex)}
                    onChange={() => handleSubCategoryChange(parentIndex, subIndex, subCategory?.subCategoryName, subCategory?.url)}
                    />
                  }
                  />
                </Box>
              ))
            }
          </Box>
        ))
      }
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
      >
        {
          error ? 
          <DialogTitle color="red" id="dialog-title">
          {error}
          </DialogTitle>
          :
          <DialogTitle id="dialog-title">
            {parentCatName.toString() === "New Category" ? "Create Category for this Product" : "Edit Category"}
          </DialogTitle>
        }
        <DialogActions sx={{flexWrap: 'wrap'}}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box component="form" noValidate onSubmit={parentCatName?.toString() === "New Category" ? handleSubmit : handleEditSubmit} sx={{ mt: 0 }}>
                <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                  <Select
                    displayEmpty
                    value={parentCatName}
                    onChange={handleChangeParentCat}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Parent Category</em>;
                      }

                      return selected;
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="New Category">
                      <em>New Category</em>
                    </MenuItem>
                    {category?.map((name) => (
                      <MenuItem
                        key={name?.categoryName}
                        value={name?.categoryName}
                      >
                        {name?.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {
                  parentCatName.toString() !== "New Category" &&
                  <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                    <Select
                      displayEmpty
                      value={subCatName}
                      onChange={handleChangeSubCat}
                      input={<OutlinedInput />}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Child Category</em>;
                        }

                        return selected;
                      }}
                      MenuProps={MenuProps}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value="New Sub Category">
                        <em>New Sub Category</em>
                      </MenuItem>
                      {
                      childCategory?.subCategory?.map((name) => (
                          <MenuItem
                            key={name?._id}
                            value={name?.subCategoryName}
                          >
                            {name?.subCategoryName}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                }
                {
                  parentCatName.toString() === "New Category" &&
                  <FormControl fullWidth sx={{ p: 1 }} variant="standard">
                    <InputLabel htmlFor="category"></InputLabel>
                    <Input
                      id="category"
                      name='category'
                      startAdornment={<InputAdornment position="start">Category Name:</InputAdornment>}
                    />
                  </FormControl>
                }
                {
                  parentCatName.toString() === "New Category" &&
                  <FormControl fullWidth sx={{ p: 1 }} variant="standard">
                    <InputLabel htmlFor="slug"></InputLabel>
                    <Input
                      id="slug"
                      name="slug"
                      startAdornment={<InputAdornment position="start">Category Slug:</InputAdornment>}
                    />
                  </FormControl>
                }
                {
                  subCatName.toString() === "New Sub Category" &&
                  <FormControl fullWidth sx={{ p: 1 }} variant="standard">
                    <InputLabel htmlFor="subcategory"></InputLabel>
                    <Input
                      id="subcategory"
                      name='subcategory'
                      startAdornment={<InputAdornment position="start">Subcategory Name:</InputAdornment>}
                    />
                  </FormControl>
                }
                {
                  subCatName.toString() === "New Sub Category" &&
                  <FormControl fullWidth sx={{ p: 1 }} variant="standard">
                    <InputLabel htmlFor="subcategory-slug"></InputLabel>
                    <Input
                      id="subcategory-slug"
                      name="subcategory-slug"
                      startAdornment={<InputAdornment position="start">Subcategory Slug:</InputAdornment>}
                    />
                  </FormControl>
                }
                <Box sx={{display: 'flex', justifyContent: 'flex-end', my: 3}}>
                  <Button size='small' type='submit' autoFocus>
                    submit categories
                  </Button>
                </Box>
              </Box>
              <Button sx={{mt: 5}} autoFocus onClick={handleClose}>
                Close
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              {
                parentCatName.toString() !== "New Category" && chipData.length === 0 ?
                <Box sx={{px: 3, py: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end'}}>
                  <Typography sx={{width: '100%', py: 3}}>Category Icon</Typography>
                  <Box sx={{width: '150px', height: '100px', position: 'relative', zIndex: 0, '& > img': {objectFit: 'contain'}}}>
                    {
                      category.map(item => (
                        parentCatName.toString() === item.categoryName &&
                        <Image
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={item?.avatar}
                          alt={item?.categoryName}
                        />
                      ))
                    }
                  </Box>
                  <Stack sx={{ width: '100%'}} direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <Box sx={{width: '100%', py: 2}}>
                      <Button component="label" onChange={handleAvatarChoose} htmlFor="file-avatar" sx={{ width: '100%', display: 'flex', justifyContent: 'center', px: 3}}>
                        edit icon
                      <Box sx={{display: 'none'}} accept="image/jpg image/png image/jpeg" component="input" type="file" name="file-avatar" id="file-avatar"/>
                      </Button>
                    </Box>
                  </Stack>
                </Box>
                :
                <Box sx={{px: 3, py: 0, display: 'flex', justifyContent: 'flex-end'}}>  
                  {
                    <Box sx={{width: '200px'}} component="form" method='POST' onSubmit={handleAvatarSubmit}>
                      <InputLabel sx={{textAlign: 'center', mb: 5}} htmlFor="category">Cetegory Icon:</InputLabel>
                      <Stack sx={{display: chipData.length > 0 && 'none'}} direction="row" justifyContent="center" alignItems="center" spacing={2}>
                        <Box sx={{width: '100%', p: 2}}>
                          <Button component="label" onChange={handleAvatarChoose} htmlFor="file-avatar" sx={{border: 'thin dashed grey', width: '100%', height: '100px', display: 'flex', justifyContent: 'center', px: 3}} startIcon={<CloudUploadIcon />}>
                            Upload
                          <Box sx={{display: 'none'}} accept="image/jpg image/png image/jpeg" component="input" type="file" name="file-avatar" id="file-avatar"/>
                          </Button>
                        </Box>
                      </Stack>
                      {
                        chipData.map(item => (
                          <Box sx={{position: 'relative', width: '100%', height: 'auto', display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap'}} key={item?.image?.lastModified}>
                            <IconButton sx={{position: 'absolute', top: -20, right: -20, zIndex: 10, backgroundColor: '#fff', width: '30px', height: '30px', borderRadius: '100%'}} size='small' onClick={handleDelete(item)}>
                              <HighlightOffIcon />
                            </IconButton>
                            <Box sx={{width: '150px', height: '100px', position: 'relative', zIndex: 0, '& > img': {objectFit: 'contain'}}}>
                              <Image
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                src={item?.imageUrl}
                                alt={item?.image?.name}
                              />
                            </Box>
                          </Box>
                        ))
                      }
                      <Button sx={{width: '100%', my: 3}} type='submit' size='small'>
                        add icon
                      </Button>
                    </Box>
                  }
                </Box>
              }
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
