import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { BackofficeStateContext } from '../utils/BackofficeState';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsHeroImage({ selectedFile, setImgFile }) {
  const { state_office, dispatch_office } = React.useContext(BackofficeStateContext);
  const [chipData, setChipData] = React.useState(selectedFile);

  React.useEffect(() => {
    setChipData(selectedFile);
  }, [selectedFile])
  

  const handleDelete = (chipToDelete) => () => {
    setChipData({
      image: '',
      imageUrl: ''
    });
    setImgFile(
      {
        image: '',
        imageUrl: ''
      } 
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 1,
        m: 0,
      }}
      component="ul"
    >
      {
        chipData.image === '' ?
        null
        :
        <ListItem sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
          <Chip
            avatar={<Avatar alt={chipData?.image?.name} src={chipData?.imageUrl} />}
            label={chipData?.image?.name.slice(0, 15)}
            onDelete={handleDelete(chipData)}
          />
          <Typography sx={{width: '100%'}}>{`veličina slike: ${chipData && Math.ceil(chipData?.image?.size/1000) + "kb"}`}</Typography>
        </ListItem>
      }
    </Paper>
  );
}