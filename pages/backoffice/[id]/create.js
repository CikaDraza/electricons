import React, { useContext } from 'react';
import { Box, Button, Divider, Grid, Paper, Stack, TextField, TextareaAutosize, Typography } from '@mui/material';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Link from 'next/link';
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
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import InventoryProduct from '../../../src/assets/InventoryProduct';
import ShipingProduct from '../../../src/assets/ShippingProduct';
import ChipsHeroImage from '../../../src/components/ChipsHeroImage';
import StoresProduct from '../../../src/assets/StoresProduct';
import axios from 'axios';

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
    ['image', 'video']
  ]
};

const formats = [
  'header', 'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'link', 'blockquote', 'align', 'color', 'background', 'image', 'imageBlot'
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
  const { state, dispatch } = useContext(Store);
  const { snack } = state;
  const titleRef = React.useRef('');
  const slugRef = React.useRef('');
  const shortDescriptionRef = React.useRef('');
  const descriptionRef = React.useRef('');
  const [description, setDescription] = React.useState('');
  const [error, setError] = React.useState('');
  const [imgFile, setImgFile] = React.useState([]);
  const [imgHeroFile, setImgHeroFile] = React.useState([]);
  const [specifications, setSpecifications] = React.useState([{ attribute: '', detail: '' }]);
  const [open, setOpen] = React.useState(false);
  const [openBrand, setOpenBrand] = React.useState(false);
  const [brands, setBrands] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchBrends();
  }, [loading]);

  const fetchBrends = async ()=> {
    setLoading(true);
    const { data } = await axios.get('/api/brand/fetch_brands');
    setBrands(data)
    setLoading(false);
  }

  const isQuill = typeof window !== 'undefined' ? require('quill') : null;

  function handleImageChoose(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const newImgFile = [...imgFile, { image: file, imageUrl: reader.result }];
      setImgFile(newImgFile);
      console.log(newImgFile);
      handleImages(newImgFile)
      e.target.value = '';
    }
    reader.readAsDataURL(file);
    if (!file) {
      setImgFile([
        {
          image: '',
          imageUrl: ''
        }
      ])
    }
  }

  function handleImages(imagesInfo) {
    dispatch_office({ type: 'SET_IMAGES', payload: imagesInfo });
  }

  console.log(state_office?.product);

  function handleHeroImageChoose(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const newHeroImage = { image: file, imageUrl: reader.result };
      console.log(newHeroImage);
      setImgHeroFile(newHeroImage);
      handleHeroImages(newHeroImage)
      e.target.value = '';
    }
    reader.readAsDataURL(file);
    if (!file) {
      setImgHeroFile(
        {
          image: '',
          imageUrl: ''
        }
      )
    }
  }

  function handleHeroImages(heroImageInfo) {
    dispatch_office({ type: 'SET_HERO_IMAGES', payload: heroImageInfo });
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
      widgetImages: { image: imgWidgetFile?.imageUrl },
      category: '',
      categoryUrl: '',
      subCategory: '',
      subCategoryUrl: '',
      brand: '',
      brandImg: '',
      brandPublished: false,
      price: 0,
      oldPrice: 0,
      rating: 0,
      reviews: 0,
      inStock: 0,
      inWidget: '',
      online: false,
      shipping: {
        weight: formOutput.get('weight'),
        length: formOutput.get('length'),
        width: formOutput.get('width'),
      },
      stores: [
        { store: formOutput.get('short-description')}
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

  const handleTitle = (e) => {
    titleRef.current = e.target.value;
    dispatch_office({ type: 'CREATE_PRODUCT', payload: { title: titleRef.current } });
  }

  const handleSlug = (e) => {
    slugRef.current = e.target.value;
    dispatch_office({ type: 'CREATE_PRODUCT', payload: { slug: slugRef.current } });
  }

  const handleShortDescription = (e) => {
    shortDescriptionRef.current = e.target.value;
    dispatch_office({ type: 'CREATE_PRODUCT', payload: { shortDescription: shortDescriptionRef.current } });
  }

  const handleDescription = (values) => {
    descriptionRef.current = values;
    setDescription(descriptionRef.current)
    dispatch_office({ type: 'CREATE_PRODUCT', payload: { description: descriptionRef.current } });
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

  React.useEffect(() => {
    setSpecifications(state_office?.product?.details || '' );
  }, []);

  React.useEffect(() => {
    setImgFile(state_office?.product?.images || '' );
  }, []);

  React.useEffect(() => {
    setImgHeroFile(state_office?.product?.heroImage || '' );
  }, []);

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
                  <Box sx={{flex: 1, order: {xs: 2, md: 1}, width: {xs: '100%', md: '50%'}}}>
                    <Typography component="h2" variant='h6'>Add new product</Typography>
                    <Typography variant='caption'>
                      Fill in the fields below to create a new product
                    </Typography>
                  </Box>
                  <Box sx={{mb: {xs: 3, md: 0}, order: {xs: 1, md: 2},width: {xs: '100%', md: 'auto'}}}>
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
                  <Box sx={{ mt: 0 }}>
                    <TextField
                      name="title"
                      id="title"
                      label="Product title here..."
                      value={state_office?.product?.title}
                      sx={{mb: 1, pb: 3, width: '100%'}}
                      onChange={handleTitle}
                    />
                    <TextField
                      name="slug"
                      id="slug"
                      label="Product slug here..."
                      value={state_office?.product?.slug}
                      sx={{mb: 1, pb: 3, width: '100%'}}
                      onChange={handleSlug}
                    />
                    <Typography component="label">Short Description</Typography>
                    <TextareaAutosize
                      name="short-description"
                      required
                      id="short"
                      placeholder="Short description here..."
                      value={state_office?.product?.shortDescription}
                      maxRows={10}
                      minRows={4}
                      aria-label="empty textarea"
                      style={{ width: '100%', resize: 'vertical', padding: '8px' }}
                      onChange={handleShortDescription}
                    />
                    <Box sx={{py: 3}}>
                      <Typography component="label">Description</Typography>
                      {
                        isQuill &&
                        <QuillStyled
                          theme="snow"
                          modules={modules}
                          formats={formats}
                          value={state_office?.product?.description}
                          onChange={handleDescription}
                        />
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
                                value={item.attribute}
                                onChange={(e) => handleSpecificationChange(index, 'attribute', e.target.value)}
                                startAdornment={<InputAdornment position="start">Attribute:</InputAdornment>}
                              />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                              <InputLabel htmlFor={`detail-${index}`}>*</InputLabel>
                              <Input
                                id={`detail-${index}`}
                                value={item.detail}
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
                  <InventoryProduct />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                  <StoresProduct />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                  <ShipingProduct />
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
                  <Box sx={{px: 2, pt: 2, display: 'flex', alignItems: 'center'}}>
                    <Typography sx={{display: 'flex', alignItems: 'center'}} component="span" color="secondary.lightGrey" variant='span'>Status</Typography>
                    <Typography sx={{pl: 1}} component="span" variant='span'>Draft</Typography>
                  </Box>
                  <Box sx={{px: 2, pt: 2, display: 'flex', alignItems: 'center'}}>
                    <Typography sx={{display: 'flex', alignItems: 'center'}} component="span" color="secondary.lightGrey" variant='span'>Visibility</Typography>
                    <Typography sx={{pl: 1}} component="span" variant='span'>Visible</Typography>
                  </Box>
                  <Box sx={{p: 2, display: 'flex', alignItems: 'center'}}>
                    <Typography component="span" color="secondary.lightGrey" variant='span'>SEO score</Typography>
                    <Typography sx={{pl: 1}} component="span" variant='span'>Good</Typography>
                    <Typography sx={{display: 'flex', alignItems: 'center', pl: 1}} component="span" variant='span'>{customIcons[4].icon}</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{p: 2}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', pb: 2}}>
                      <Link href={`/backoffice/preview/${state_office?.product?.slug}`}>
                        <Button sx={{mr: 1}} variant='outlined'>
                          Preview
                        </Button>
                      </Link>
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
                  <Typography component="p" variant='p' sx={{px: 2, py: 1, fontWeight: 'bold'}}>Hero Image</Typography>
                  <Divider />
                  <Box>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                      <Box sx={{width: '100%', p: 2}}>
                        <Button component="label" onChange={handleHeroImageChoose} htmlFor="file-widget" sx={{border: 'thin dashed grey', width: '100%', height: '100px', display: 'flex', justifyContent: 'center'}} startIcon={<CloudUploadIcon />}>
                          Upload
                        <Box sx={{display: 'none'}} accept="image/jpg image/png image/jpeg" component="input" type="file" name="file-widget" id="file-widget"/>
                        </Button>
                      </Box>
                    </Stack>
                  </Box>
                  <ChipsHeroImage selectedFile={imgHeroFile} setImgFile={setImgHeroFile} />
                </Paper>
              </Grid>
              {/* Upload Hero Images */}
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
                    <BrandCreate open={openBrand} setOpen={setOpenBrand} brands={brands} />
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