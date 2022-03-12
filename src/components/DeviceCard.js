import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import Container from '@mui/material/Container';

export default function DeviceCardComponent(props) {
    const { name, type, } = props;

  return (
    <Container style={{width:'100%'}}>
        <div className="row g-3 my-2">
            <div className="col-xl-4 col-lg-4">
                <div className="p-2 bg-white shadow-sm d-flex justify-content-around flex-column align-items-center rounded">
                    <div className='p-1 align-items-center text-center'>
                        <i className="fas fa-fire-alt fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                        <h3 className="fs-2" >{name}</h3>
                        <p className="fs-5">{type}</p>
                    </div>
                    <div className='p-0 align-items-center'>
                        <IconButton aria-label="play">
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                        <IconButton aria-label="stop">
                            <StopIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                    </div>
                </div>
            </div>            
        </div>
    </Container>
  );
}