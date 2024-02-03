import React, { useContext, useMemo } from 'react';
import { Box, Button, Divider, Grid, Paper, Stack, TextField, TextareaAutosize, Typography } from '@mui/material';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import axios from 'axios';
import theme from '../../../src/theme';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Link from '../../../src/Link';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import 'react-quill/dist/quill.snow.css';
import ChipsImages from '../../../src/components/ChipsImages';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CategoryCreate from '../../../src/assets/CategoryCreate';
import BrandCreate from '../../../src/assets/BrandCreate';
import Cookies from 'js-cookie';
import { BackofficeStateContext } from '../../../src/utils/BackofficeState';
import { Store } from '../../../src/utils/Store';
import ProductPrice from '../../../src/assets/ProductPrice';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const Quill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link'],
    ['blockquote'],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    ['clean'],
  ]
};

const formats = [
  'header', 'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'link', 'blockquote', 'align', 'color', 'background'
];

const QuillStyled = styled(Quill)(({ theme }) => ({
  '& .ql-toolbar.ql-snow': {
    borderRadius: '3px 3px 0 0'
  },
  '& .ql-container.ql-snow': {
    borderRadius: '0 0 3px 3px'
  }
}))

const LabelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  textTransform: 'capitalize',
  backgroundColor: theme.palette.primary.white,
  border: 'thin solid lightGrey',
  borderLeft: '5px solid black',
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function CreateNewItems() {
  const userInf0 = Cookies.get('userInfo') && JSON.parse(Cookies.get('userInfo'));
  const { state_office, dispatch_office } = useContext(BackofficeStateContext);
  const { state, dispatch,  } = useContext(Store);
  const { snack } = state;
  const [description, setDescription] = React.useState('');
  const [error, setError] = React.useState('');
  const [imgFile, setImgFile] = React.useState([]);
  const [imgWidgetFile, setImgWidgetFile] = React.useState([]);
  const [specifications, setSpecifications] = React.useState([{ attribute: '', detail: '' }]);
  const [open, setOpen] = React.useState(false);
  const [openBrand, setOpenBrand] = React.useState(false);
  const [checkedCategory, setCheckedCategory] = React.useState(true);

  const handleChange = (event) => {
    const newSelectedItems = cartItems.map((n) => n);
    setCheckedCategory(event.target.checked);
  };

  const isQuill = typeof window !== 'undefined' ? require('quill') : null;

  const formatText = () => {
    // Formatiranje teksta prema potrebama
    // Na primer, zamenjivanje novih redova sa <br> tagom
    const formattedText = description.replace(/\n/g, '<p style="margin: 0; padding: 3px 0" />');

    // Prikazivanje formatiranog teksta
    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  function handleImageChoose(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        setImgFile([
          ...imgFile,
          {            
            image: file,
            imageUrl: reader.result
          }
        ]);
        dispatch_office({ type: 'CREATE_PRODUCT', payload: { images:  [...imgFile, {image: file, imageUrl: reader.result}] } });
        e.target.value = ''
    }
    reader.readAsDataURL(file);
  }

  function handleWidgetImageChoose(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        setImgWidgetFile([
          ...imgWidgetFile,
          {            
            image: file,
            imageUrl: reader.result
          }
        ]);
        e.target.value = ''
    }
    reader.readAsDataURL(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formOutput = new FormData(e.currentTarget);
    const formData = {
      title: formOutput.get('title'),
      slug: formOutput.get('slug'),
      shortDescription: formOutput.get('short-description'),
      description: description,
      details: specifications,
      images: [
        { image: imgFile.map((item) => item?.imageUrl)}
      ],
      widgetImages: [
        { image: imgWidgetFile?.map((item) => item?.imageUrl) }
      ],
      category: '',
      categoryUrl: '',
      subCategory: '',
      subCategoryUrl: '',
      brand: '',
      brandImg: '',
      price: 0,
      oldPrice: 0,
      rating: 0,
      reviews: 0,
      inStock: 0,
      inWidget: '',
      online: false,
      stores: [
        { store: ''}
      ]
    }

    if (formOutput.get('title') === '') {
      console.log('please add title');
      dispatch({ type: 'SNACK_MESSAGE', payload: { ...snack, message: 'please add title', severity: 'warning'} });
      return;
    }
    if (formData.price === 0) {
      console.log('please add price');
      dispatch({ type: 'SNACK_MESSAGE', payload: { ...snack, message: 'please add price', severity: 'warning'} });
      return;
    }
    try {
    dispatch_office({ type: 'CREATE_PRODUCT', payload: formData }); 
    dispatch({ type: 'SNACK_MESSAGE', payload: { ...snack, message: 'product added successfuly', severity: 'success'} });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'SNACK_MESSAGE', payload: { ...snack, message: 'please add all fields', severity: 'warning'} });
    }
  }

  const handleAddSpecification = () => {
    setSpecifications([...specifications, { attribute: '', detail: '' }]);
  };

  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index][field] = value;
    setSpecifications(updatedSpecifications);
    dispatch_office({ type: 'CREATE_PRODUCT', payload: { details: updatedSpecifications } });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenBrand = () => {
    setOpenBrand(true);
  };

  return (
    <Box>
      {
        error ?
          <LabelButton sx={{width: '100%', my: 5, p: 2}}>
            <Typography sx={{m: 0, p: 1, fontSize: {xs: '.875rem', sm: '1.25rem'}}} variant="h5" component="h1" gutterBottom>
            {error}
            </Typography>
          </LabelButton>
         : 
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{display: 'flex', flexWrap: 'wrap', py: 3}}>
                  <Box sx={{flex: 1, order: {xs: 2, md: 1}}}>
                    <Typography component="h2" variant='h6'>Add new product</Typography>
                    <Typography variant='caption'>
                      Fill in the fields below to create a new product
                    </Typography>
                  </Box>
                  <Box sx={{order: {xs: 1, md: 2}, mb: {xs: 3, md: 0}}}>
                    <Link href={`/backoffice/${userInf0?._id}/list`}>
                      <Button variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
                        go to All Products
                      </Button>
                    </Link>
                  </Box>
                </Box>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                  }}
                >
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 0 }}>
                    <TextField
                      name="title"
                      id="title"
                      label="Product title here..."
                      sx={{mb: 1, pb: 3, width: '100%'}}
                    />
                    <TextField
                      name="slug"
                      id="slug"
                      label="Product slug here..."
                      sx={{mb: 1, pb: 3, width: '100%'}}
                    />
                    <Typography component="label">Short Description</Typography>
                    <TextareaAutosize
                      name="short-description"
                      required
                      id="short"
                      placeholder="Short description here..."
                      maxRows={10}
                      minRows={4}
                      aria-label="empty textarea"
                      style={{ width: '100%', resize: 'vertical', padding: '8px' }}
                    />
                    <Box sx={{py: 3}}>
                      <Typography component="label">Description</Typography>
                      {
                        isQuill ?
                        <QuillStyled
                          theme="snow"
                          modules={modules}
                          formats={formats}
                          value={description}
                          onChange={(values) => setDescription(values)}
                        />
                        :
                        null
                      }
                    </Box>
                    <Box sx={{py: 3}}>
                      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography component="label">Specification</Typography>
                        <Button size='small' onClick={handleAddSpecification}>{'+ Add Specification'}</Button>
                      </Box>
                      {
                        specifications?.map((item, index) => (
                          <Box key={index} sx={{display: 'flex', flexWrap: 'nowrap'}}>
                            <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                              <InputLabel htmlFor={`attribute-${index}`}>*</InputLabel>
                              <Input
                                id={`attribute-${index}`}
                                value={specifications.attribute}
                                onChange={(e) => handleSpecificationChange(index, 'attribute', e.target.value)}
                                startAdornment={<InputAdornment position="start">Attribute:</InputAdornment>}
                              />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                              <InputLabel htmlFor={`detail-${index}`}>*</InputLabel>
                              <Input
                                id={`detail-${index}`}
                                value={specifications.detail}
                                onChange={(e) => handleSpecificationChange(index, 'detail', e.target.value)}
                                startAdornment={<InputAdornment position="start">Detail:</InputAdornment>}
                              />
                            </FormControl>
                          </Box>
                        ))
                      }
                    </Box>
                  </Box>
                </Paper>
              </Grid>
               {/* Additional Informations */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                  <ProductPrice />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>

                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Grid container spacing={3}>
              {/* Publish Product */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    py: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography component="p" variant='p' sx={{px: 2, py: 1, fontWeight: 'bold'}}>Publish</Typography>
                  <Divider />
                  <Box sx={{p: 2, display: 'flex', alignItems: 'center'}}>
                    <Typography sx={{display: 'flex', alignItems: 'center'}} component="span" variant='span'>{customIcons[4].icon}</Typography>
                    <Typography sx={{pl: 1}} component="span" variant='span'>SEO score</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{p: 2}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', pb: 2}}>
                      <Button sx={{mr: 1}} variant='outlined'>
                        Preview
                      </Button>
                      <Button sx={{ml: 1, color: 'whitesmoke'}} color='dashboard' variant='contained'>
                        Save Draft
                      </Button>
                    </Box>
                    <Button sx={{width: '100%'}} variant='contained'>Publish</Button>
                  </Box>
                </Paper>
              </Grid>
              {/* Upload Product Images */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    py: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography component="p" variant='p' sx={{px: 2, py: 1, fontWeight: 'bold'}}>Product Images</Typography>
                  <Divider />
                  <Box>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                      <Box sx={{width: '100%', p: 2}}>
                        <Button component="label" onChange={handleImageChoose} htmlFor="file" sx={{border: 'thin dashed grey', width: '100%', height: '100px', display: 'flex', justifyContent: 'center'}} startIcon={<CloudUploadIcon />}>
                          Upload
                        <Box sx={{display: 'none'}} accept="image/jpg image/png image/jpeg" component="input" type="file" name="file" id="file"/>
                        </Button>
                      </Box>
                    </Stack>
                  </Box>
                  <ChipsImages selectedFile={imgFile} setImgFile={setImgFile} />
                </Paper>
              </Grid>
              {/* Upload Widget Images */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    py: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography component="p" variant='p' sx={{px: 2, py: 1, fontWeight: 'bold'}}>Widget Images</Typography>
                  <Divider />
                  <Box>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                      <Box sx={{width: '100%', p: 2}}>
                        <Button component="label" onChange={handleWidgetImageChoose} htmlFor="file-widget" sx={{border: 'thin dashed grey', width: '100%', height: '100px', display: 'flex', justifyContent: 'center'}} startIcon={<CloudUploadIcon />}>
                          Upload
                        <Box sx={{display: 'none'}} accept="image/jpg image/png image/jpeg" component="input" type="file" name="file-widget" id="file-widget"/>
                        </Button>
                      </Box>
                    </Stack>
                  </Box>
                  <ChipsImages selectedFile={imgWidgetFile} setImgFile={setImgWidgetFile} />
                </Paper>
              </Grid>
              {/* Upload Widget Images */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    py: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography component="p" variant='p' sx={{px: 2, py: 1, fontWeight: 'bold'}}>Brands</Typography>
                    <Button onClick={handleClickOpenBrand} size='small' sx={{mr: 3}}>+ add brand</Button>
                  </Box>
                  <Divider />
                  <Box sx={{p: 3}}>
                    <BrandCreate open={openBrand} setOpen={setOpenBrand} />
                  </Box>
                </Paper>
              </Grid>
              {/* Upload Widget Images */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    py: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography component="p" variant='p' sx={{px: 2, py: 1, fontWeight: 'bold'}}>Categories</Typography>
                    <Button onClick={handleClickOpen} size='small' sx={{mr: 3}}>+ add new or edit</Button>
                  </Box>
                  <Divider />
                  <Box sx={{p: 3}}>
                    <CategoryCreate open={open} setOpen={setOpen} />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
    </Box>
  )
}

export default dynamic(() => Promise.resolve(CreateNewItems), { ssr: true });