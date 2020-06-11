import React from 'react';
import {Text, Image, ImageFit, OverflowSet, Modal, IconButton, Link } from 'office-ui-fabric-react';
import {Card} from '@uifabric/react-cards';
import {initializeIcons} from '@uifabric/icons';


import './stylesheets/gallerycard.css'

var images = require.context("../images", true)
initializeIcons();

class GalleryCard extends React.Component {
    state = {
        showModal: false
    }

    render() {
       this.galleryStyles = {
            root: {
                margin: 10,
                padding: 10,
                background: this.props.theme.palette.themeDarker
            }
        }
    
        this.imageProps = {
            imageFit: ImageFit.contain,
            height: 300,
            width: 400,
            className: "ModalImage"
        }
    
        this.footerCardSectionStyles = {
            root: {
              borderTop: '1px solid',
              borderTopColor: this.props.theme.palette.black
            }
        };
    
        this.modalParaStyles = {
            root: {
                background: this.props.theme.palette.themeDarker
            }
        }

        this.galleryModal = {
            scrollableContent: { overflow: "visible" } //prevent double scrollbar
        }

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
            <Card.Item>
                <span/>
            </Card.Item>

            <Card.Section styles={this.footerCardSectionStyles}>
                <OverflowSet items={this.props.data.keys} onRenderItem={this._onRenderKey}/>
            </Card.Section>
        </Card>

        <Modal isOpen={this.state.showModal} onDismiss={this._closeModal} styles={this.galleryModal} className="GalleryModal">
            <Text className="ModalHeader" >{this.props.data.title}</Text>
            <IconButton
                className="ModalXIcon"
                iconProps={{ iconName: 'Cancel' }}
                ariaLabel="Close modal"
                onClick={this._closeModal}
            />

            <div className="ModalImages">
                {this.props.data.imagepaths.map(src => (
                    <Image {...this.imageProps} src={images(src)}/>
                ))}
            </div>

            <OverflowSet vertical items={this.props.data.paras} onRenderItem={this._onRenderModalPara}/>
            <Text block variant={"xLarge"} className="ModalPara" styles={this.modalParaStyles}>Relevant Skills</Text>
            <OverflowSet vertical items= {this.props.data.keys} onRenderItem={this._onRenderModalKey}/>
            <OverflowSet styles={this.footerCardSectionStyles} items={this.props.data.links} onRenderItem={this._onRenderLink} className="ModalLinks"/>
        </Modal>
        </>
    }

    /*
        Card Functions
    */

    _openModal = () => {
        this.setState({showModal: true});
    }

    //renders project skill highlights
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
            <div className="ModalLink">
                <IconButton iconProps={{iconName: icon, style: {fontSize: 40}}} href={link.url} className="ModalLinkIcon">{link.url}</IconButton>
                <Link href={link.url} className="ModalLinkText">{link.url}</Link>
            </div>
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