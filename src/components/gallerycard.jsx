import React from 'react';
import {Text, Image, ImageFit, OverflowSet, Modal, mergeStyleSets, IconButton, getTheme, FontSizes, FontWeights} from 'office-ui-fabric-react';
import {Card} from '@uifabric/react-cards';
import DragScrollProvider from 'drag-scroll-provider';
import {initializeIcons} from '@uifabric/icons';
import {currentTheme} from '../App'

var images = require.context("../images", true)
initializeIcons();

class GalleryCard extends React.Component {
    state = {
        showModal: false
    }

    galleryStyles = {
        root: {
            margin: 10,
            padding: 10,
            background: currentTheme.palette.themePrimary
        }
    }

    imageProps = {
        imageFit: ImageFit.contain,
        height: 300,
        width: 400,
        className: "ModalImage"
    }

    footerCardSectionStyles = {
        root: {
          borderTop: '1px solid #F3F2F1'
        }
    };

    xIconStyles = mergeStyleSets({
        root: {
          position: 'absolute',
          top: '4px',
          right: '4px'
        }
      });

    linkIconStyles= {
        root: {
            fontSize: 1500
        }
    }
      
    headerStyles = {
        root: {
            fontSize: FontSizes.xxLargePlus,
            fontWeight: FontWeights.bold,
            padding: '12px 12px 14px 24px',
        }
    }

    modalParaStyles = {
        root: {
            background: currentTheme.palette.themePrimary
        }
    }

    render() {
        return <>
        <Card onClick={this._openModal} styles={this.galleryStyles}>
            <Card.Item>
                <Text variant="large" >
                    {this.props.data.title}
                </Text>
            </Card.Item>

            <Card.Item>
                <div className="CardImage">
                    <Image src={images(this.props.data.imagepaths[0])} width={250}/>
                </div>
            </Card.Item>
            
            <Card.Section> 
                <Text variant="small">
                    {this.props.data.date}
                </Text>
                <Text variant="small" className="CardText">
                    {this.props.data.paras[0]}
                </Text>
            </Card.Section>
            <Card.Item grow={1}>
                <span/>
            </Card.Item>

            <Card.Section styles={this.footerCardSectionStyles}>
                <OverflowSet items={this.props.data.keys} onRenderItem={this._onRenderKey}/>
            </Card.Section>
        </Card>

        <Modal isOpen={this.state.showModal} onDismiss={this._closeModal} className="GalleryModal">
            <div margin={200}>
                <Text styles={this.headerStyles}>{this.props.data.title}</Text>
                <span/>
                <IconButton
                    styles={this.xIconStyles}
                    iconProps={{ iconName: 'Cancel' }}
                    ariaLabel="Close modal"
                    onClick={this._closeModal}
                />
                <DragScrollProvider>
                    {({onMouseDown, ref}) => (
                        <div className="ModalImages" ref={ref} onMouseDown={onMouseDown}>
                            {this.props.data.imagepaths.map(src => (
                                <Image {...this.imageProps} src={images(src)}/>
                            ))}
                        </div>
                    )}  
                </DragScrollProvider>

                <OverflowSet vertical items={this.props.data.paras} onRenderItem={this._onRenderModalPara}/>
                <Text block variant={"xLarge"} className="ModalPara" styles={this.modalParaStyles}>Relevant Skills</Text>
                <OverflowSet vertical items= {this.props.data.keys} onRenderItem={this._onRenderModalKey}/>
                <OverflowSet styles={this.footerCardSectionStyles} items={this.props.data.links} onRenderItem={this._onRenderLink} className="ModalLinks"/>
            </div>
        </Modal>
        </>
    }

    /*
        Card Functions
    */

    _openModal = () => {
        this.setState({showModal: true});
    }

    _onRenderKey = (item) => {
        return (
        <div className="GalleryKey">
          <Text variant={"xSmall"}>
            {item}
          </Text>
        </div>
        );
    };

    /* 
        Modal Functions
    */

    _closeModal = () => {
        this.setState({showModal: false});
    }

    _onRenderLink = (link) => {
        var icon = "Globe";
        if(link.type === "repo")
            icon = "Code";

        return(
            <IconButton iconProps={{iconName: icon, style: {fontSize: 40}}} href={link.url} className="ModalLink">{link.url}</IconButton>
        )
    }

    _onRenderImage = (image) => {
        var imageRef = images(image)
        return (
            <Image {...this.imageProps} src={imageRef}/>
        )
    }

    _onRenderModalKey = (key) => {
        return (
            <Text variant={'large'} className="ModalKey" styles={this.modalParaStyles}>{"- " + key}</Text>
        )
    }

    _onRenderModalPara = (para) => {
        return <Text variant={'large'} className="ModalPara" styles={this.modalParaStyles}>{para}</Text>
    }
}

export default GalleryCard;