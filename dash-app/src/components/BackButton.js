import React from 'react';
import {useNavigate} from "react-router-dom"
import Button from '@mui/material/Button';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
  const history = useNavigate();

  const handleGoBack = () => {
    history(-1)
  };

  return (
    <Button variant="outlined"  onClick={handleGoBack}>
      Back
    </Button>
  );
};

export default BackButton;
