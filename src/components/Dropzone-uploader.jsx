import React, {Component} from 'react';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import styled from '@emotion/styled';
import {v4 as uuidv4} from 'uuid';
import uploadIcon from '../assets/cloud-upload.svg';
import {LabelComponent, FormComponent} from './Common';
import {token, baseUrl} from '../axios.js';
import {colors} from '../util/variables.js';

const PreviewImage = styled('img')({
    display: "flex",
    width: 115,
    height: 115,
    borderRadius: "50%"
});

const Percentage = styled('div')({
    padding: "8px 0 0",
    fontStyle: "italic",
	fontSize: "1.1em"
});

const DropzoneComponent = styled('div')({
    display: "flex", 
    alignItems: "center", 
    flexDirection: "column", 
    fontFamily: 'Helvetica' 
});

const Icon = styled('img')({
    opacity: .3,
    height: 55,
    width: 55,
    cursor: "pointer"
});

const StatusSubmit = styled('div')({
    display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center"
});

const DropzoneOuterWrapper = styled('div')({
    display: "flex", 
    flexDirection: "row",
    justifyContent: "space-around"
});

const DropzoneInnerWrapper = styled('div')({
    maxHeight: 250, 
    overflow: "auto", 
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
	position: "relative",
    transition: "all .15s linear",

    "input": {
        display: "none"
    }
});

const Preview = ({meta}) => {
    const {name, previewUrl} = meta;

    return (
        <DropzoneComponent>
            <PreviewImage alt={name} src={previewUrl}/>
        </DropzoneComponent>
    )
}

const Layout = ({input, previews, submitButton, dropzoneProps, files, extra: {maxFiles}}) => {

    return (
        <DropzoneOuterWrapper>
            <DropzoneInnerWrapper  {...dropzoneProps}>
                {files.length > 0 && previews}
                {files.length < maxFiles && input}
            </DropzoneInnerWrapper>
            <StatusSubmit>
                {files.length > 0 && 
                    <Percentage>{Math.round(files[0].meta.percent)}%, {files[0].meta.status}</Percentage>
                }
                {files.length > 0 && submitButton}
            </StatusSubmit>
        </DropzoneOuterWrapper>
    )
}

class DropZone extends Component {
    getUploadParams = ({file, meta}) => {
        const url = `${baseUrl}image/upload`;
        const headers = {
            'Authorization': `Basic ${token}`
        }
        return { 
            url,
            headers,
            meta: { 
                fileUrl: `${url}/${encodeURIComponent(meta.name)}` 
            } 
        }
    }

    handleChangeStatus = ({ meta, file, xhr}, status) => {
        const {fileDestinaton} = this.props;

        if (status === 'done'){
            let response = xhr.response;
            fileDestinaton(response || "");
        }  
        console.log(status, meta, xhr)
    }

    handleSubmit = (file, allFiles) => {
        const {fileDestinaton} = this.props;

        let removeFile = file[0].remove() || "";
        fileDestinaton(removeFile);
    }

    render() {
        const {label, minSizeBytes, maxSizeBytes, maxFiles} = this.props;

        return (
            <FormComponent>
                <LabelComponent>{label}</LabelComponent>
                <Dropzone
                    inputContent={(file, extra) => (extra.reject ? 
                        'Image files only!' : <Icon key={uuidv4()} alt="upload" src={uploadIcon}/>
                    )}
                    inputWithFilesContent
                    minSizeBytes={minSizeBytes}
                    maxSizeBytes={maxSizeBytes}
                    maxFiles={maxFiles}
                    getUploadParams={this.getUploadParams}
                    submitButtonContent={'Remove'}
                    onSubmit={this.handleSubmit}
                    onChangeStatus={this.handleChangeStatus}
                    LayoutComponent={Layout}
                    PreviewComponent={Preview}
                    classNames={{ 
                        inputLabel: null, 
                        dropzone: null 
                    }}
                    accept="image/*"
                    disabled={file => file.some(f => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status))}
                    styles={{
                        inputLabel: (file, extra) => (extra.reject ? 
                            {color: 'red', fontFamily: 'Helvetica', fontSize: "1.1em"} : 
                            {color: "#000", fontFamily: 'Helvetica', fontSize: "1.1em"}),
                        submitButtonContainer: {margin: ".5em 0"}
                    }}
                />
            </FormComponent>
        )
    }
}

export default DropZone;