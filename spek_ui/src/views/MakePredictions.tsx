import React, { FC, useState, useMemo, useEffect, useContext } from 'react';
import { Paper, Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Face, Fingerprint } from '@material-ui/icons';
import EmailIcon from '@mui/icons-material/Email';
import { Alert } from '@material-ui/lab';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';

import { signUp, isAuthenticated } from '../utils/auth';
import { imageUpload } from '../utils/api';

// image upload UI
import { useDropzone } from 'react-dropzone';


// context API
import { ImageContext } from '../contextManagers/imagesContext';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  cardMargin: {
    margin: theme.spacing(1),
  },
  padding: {
    padding: theme.spacing(1),
  },
  button: {
    textTransform: 'none',
  },
  marginTop: {
    marginTop: 10,
    },
  headerStyles2: {
    margin: '3% auto 2% auto',
  }
}));

const baseStyle = {
  flex: 1,
  display: 'flex',
  margin: 'auto',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const thumbsContainer = {
    marginTop: 16,
    display: 'flex',
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: '10%',
  height: '5%',
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
    display: 'block',
    width: '90%',
    height: '90%',
    margin: 'auto'
};



function StyledDropzone(props: any) {
  // use imagecontext
  const { image, addImage } = useContext(ImageContext);
  var [files, setFiles] = useState<any[]>([]);
  const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
      acceptedFiles,
      open
  } = useDropzone({
      accept: '.jpeg,.png,.jpg', maxFiles: 1,
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
        addImage(acceptedFiles);
      }
  });
  
  const acceptedFileItems = acceptedFiles.map(file => {
    return (
      <li key={file.name}>
        {file.name}  {file.size} bytes
      </li>
    )
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);
    
    const thumbs = files.map(file => (
        <div key={file.name}>
        <div style={thumbInner}>
            <img
            src={file.preview}
            style={img}
            />
        </div>
        </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="container">
        <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <br />
        <button type="button" onClick={open}>
            Open File Dialog
        </button>
        <aside>
            <h4>Accepted files</h4>
            <ul>{acceptedFileItems}</ul>
        </aside>
        <aside style={thumbsContainer}>
            {thumbs}
        </aside>
      </div>
      
  );
}


export const MakePrediction: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [conf_thresh, setConf_thresh] = useState<string>('');
  const [iou_thresh, setIou_thresh] = useState<string>('');
  const [patient_id, setPatient_id] = useState<string>('');
  // use imagecontext
  const { image, addImage } = useContext(ImageContext);
  const [error, setError] = useState<any | null>('');
  
  const handleSubmit = async (_: React.MouseEvent) => {
    setError('');
    try {
      const data = await imageUpload(
        conf_thresh,
        iou_thresh,
        patient_id,
        image
      );
      if (data !== null) {
        addImage([data]);
        history.push("/result/");
      }
    } catch (err) {
      if (err instanceof Error) {
        // handle errors thrown from frontend
        setError(err.message);
      } else {
        // handle errors thrown from backend
        setError(err);
      }
    }
  };
  
    
    return isAuthenticated() ? (
        <Paper className={classes.padding} style={{ width: "60%", marginTop: "10%" }}>
            <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end">
                    
                    <Grid item md={true} sm={10} xs={10}>
                        <TextField
                            id="conf_thresh"
                            label="Confidence Threshold"
                            type="text"
                            value={conf_thresh}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setConf_thresh(e.currentTarget.value)
                            }
                            fullWidth
                            autoFocus
                            required
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                    
                    <Grid item md={true} sm={10} xs={10}>
                        <TextField
                            id="iou_thresh"
                            label="IOU Threshold"
                            type="text"
                            value={iou_thresh}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setIou_thresh(e.currentTarget.value)
                            }
                            fullWidth
                            autoFocus
                            required
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                   
                    <Grid item md={true} sm={10} xs={10}>
                        <TextField
                            id="patient_id"
                            label="Patient ID"
                            type="text"
                            value={patient_id}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setPatient_id(e.currentTarget.value)
                            }
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
                <br />
                <Grid container alignItems="center">
                     <Grid item md={true} sm={10} xs={10}>
                      <StyledDropzone />
                    </Grid>
                </Grid>
                <Grid container justify="center" className={classes.marginTop}>
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        onClick={handleSubmit}
                    >
                        Make Prediction
                    </Button>
                </Grid>
            </div>
        </Paper>
    ) : (
        <Redirect to="/" />
    );
};
