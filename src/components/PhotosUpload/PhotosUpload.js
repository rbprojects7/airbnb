import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DropzoneComponent from 'react-dropzone-component';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Redux Action
import { createListPhotos, removeListPhotos } from '../../actions/manageListPhotos';

// Style
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';

// Component
import PhotosList from '../PhotosList';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class PhotosUpload extends Component {

  static propTypes = {
    createListPhotos: PropTypes.func.isRequired, 
    removeListPhotos: PropTypes.func.isRequired, 
    listId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.success = this.success.bind(this);
    this.complete = this.complete.bind(this);
    this.dropzone = null;
  }

  componentDidMount() {
    const isBrowser = typeof window !== 'undefined';
    const isDocument = typeof document !== undefined;
    if (isBrowser && isDocument) {
      document.querySelector(".dz-hidden-input").style.visibility = 'visible';
      document.querySelector(".dz-hidden-input").style.opacity = '0';
      document.querySelector(".dz-hidden-input").style.height = '100%';
      document.querySelector(".dz-hidden-input").style.width = '100%';
      document.querySelector(".dz-hidden-input").style.cursor = 'pointer';
    }
  }

  success(file, fromServer) {
    /*const { listId, createListPhotos } = this.props;
    const { files } = fromServer;
    let fileName = files[0].filename;
    let fileType = files[0].mimetype;
    // Calling Redux action to create a record for uploaded file
    if(listId != undefined) {
      createListPhotos(listId, fileName, fileType);
    }*/
  } 

  complete(file){
    const { listId, createListPhotos } = this.props;
    if(file && file.xhr) {
      const { files } = JSON.parse(file.xhr.response);
      let fileName = files[0].filename;
      let fileType = files[0].mimetype;
      if(listId != undefined) {
        createListPhotos(listId, fileName, fileType);
      }
      this.dropzone.removeFile(file);
    }
  }

  render() {
    const { placeholder, listId } = this.props;
    const djsConfig = {
      dictDefaultMessage: placeholder,
      addRemoveLinks: false,
      maxFilesize: 10,
      maxFiles: 20,
      acceptedFiles: 'image/*',
      hiddenInputContainer: '.dzInputContainer' 
    };
    const componentConfig = {
      iconFiletypes: ['.jpg', '.png'],
      //showFiletypeIcon: true,
      postUrl: '/photos'
    };
    const eventHandlers = {
      init: dz => this.dropzone = dz,
      success: this.success,
      complete: this.complete,
    };

    return (
      <div className={cx('listPhotoContainer')}>
          <div className={cx('dzInputContainer')}>
            <DropzoneComponent 
              config={componentConfig}
              eventHandlers={eventHandlers}
              djsConfig={djsConfig}
            />
          </div>
           <p className={cx('photoUpload')}> <FormattedMessage {...messages.photoSizePlaceholder} /> </p>
          <PhotosList listId={listId} />
        </div>  
    );
  }

}

const mapState = (state) => ({});

const mapDispatch = {
  createListPhotos,
  removeListPhotos
};

export default injectIntl(withStyles(s) (connect(mapState, mapDispatch)(PhotosUpload)));
