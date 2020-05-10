import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import uploadIcon from '../assets/cloud-upload.svg';
import styled from '@emotion/styled';
import {v4 as uuidv4} from 'uuid';
import {colors} from '../util/variables.js';
import {LabelComponent, FormComponent} from './Common';
import {info} from '../util/env.js';
import {dict} from '../util/variables';

const DropzoneComponent = styled('div')({
    height: 130,
    width: 130,
    backgroundColor: colors.white,
    border: "2px dashed rgb(187, 186, 186)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    fontSize: 16,
    cursor: "pointer"
});

const Icon = styled('img')({
    opacity: .3,
    height: 55,
    width: 55
});

// const FileTooLarge = styled('div')({
//     color: colors.red,
//     fontStyle: "italic"
// });

const Preview = styled('img')({
    display: "flex",
    width: 115,
    height: 115,
    borderRadius: "50%"
});

const Clear = styled('div')({
    display: "flex",
    justifyContent: "center",
	padding: "4px",
	width: "8em",
	fontWeight: 700,
	fontStyle: "italic",
    cursor: "pointer",

    "&:hover": {
        textDecoration: "underline",
        backgroundColor: "rgba(223, 41, 12, .5)",
	    borderRadius: "1em"
    }
});

class DropZone extends Component {

    state = {
        files: "",
        show: true
    };

    onDrop = acceptedFiles => {
        const {shouldUpload} = this.props;

        acceptedFiles.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        )
        
        this.setState(prevState => ({
            files: acceptedFiles,
            show: true
            //files: this.state.files.concat(files),
        }));

        let finalUrl = info.bucket.concat(acceptedFiles[0]?.name)

        if (acceptedFiles !== "") {
            let fd = new FormData();
            fd.append('file', acceptedFiles[0], acceptedFiles[0]?.name);
            shouldUpload(finalUrl, fd);
        }
    }

    onClearImage = acceptedFiles => {
        const {shouldUpload} = this.props;

        //acceptedFiles.forEach(file => URL.revokeObjectURL(file.preview));

        this.setState(prevState => ({
            show: !prevState.show,
            files: ""
        }));

        let finalUrl = "";
        let file = "";
        
        shouldUpload(finalUrl, file);
    }

    render() {
        const {label, minSize, maxSize, multiple} = this.props;
        const {files, show} = this.state;

        return (
            <FormComponent>
                <LabelComponent>{label}</LabelComponent>
                <Dropzone 
                    onDrop={this.onDrop}
                    accept="image/*"
                    minSize={minSize}
                    maxSize={maxSize}
                    multiple={multiple}
                    >
                    {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles, acceptedFiles}) => {
                        //const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                        
                        return (
                            <>
                                <DropzoneComponent {...getRootProps()}>
                                    <input {...getInputProps()} />

                                    { !show ? 
                                        <Icon hide alt="upload" src={uploadIcon} /> : null
                                    }

                                    { acceptedFiles.length === 0 && !isDragActive && 
                                        <Icon alt="upload" src={uploadIcon} />
                                    }
                                    
                                    { acceptedFiles.length === 0 && isDragActive && !isDragReject && 
                                        <Icon alt="upload" src={uploadIcon} /> 
                                    }
                                    
                                    { acceptedFiles.length === 0 && isDragReject && 
                                        <>
                                            <Icon alt="upload" src={uploadIcon}/>
                                            <div>{dict.filetypeNotAccepeted}</div>
                                        </>
                                    }

                                    {/* {isFileTooLarge && (
                                        <FileTooLarge>File is too large.</FileTooLarge>
                                    )} */}

                                    { files.length > 0 && files.map(file => {
                                        return (
                                            <Preview key={uuidv4()} alt="Preview" src={file.preview} />
                                        )
                                    })}
                                </DropzoneComponent>
                                { acceptedFiles.length > 0 && show && 
                                    <Clear onClick={this.onClearImage}>{dict.removeImage}</Clear> 
                                }
                            </>
                        )}
                    }
                </Dropzone>
            </FormComponent>
        );
    }
}

export default DropZone;