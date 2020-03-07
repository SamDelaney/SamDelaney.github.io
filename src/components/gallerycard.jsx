import React from 'react';
import {Text, Image, ImageFit, OverflowSet, Modal, Link, mergeStyleSets, IconButton, getTheme, FontSizes, FontWeights} from 'office-ui-fabric-react';
import {Card} from '@uifabric/react-cards';
import DragScrollProvider from 'drag-scroll-provider';

var images = require.context("../images", true)
var theme = getTheme()

class GalleryCard extends React.Component {
    state = {
        showModal: false
    }

    galleryStyles = {
        root: {
            margin: 10,
            padding: 10
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

    iconButtonStyles = mergeStyleSets({
        root: {
          color: theme.palette.neutralPrimary,
          marginLeft: 'auto',
          marginTop: '4px',
          marginRight: '2px'
        },
        rootHovered: {
          color: theme.palette.neutralDark
        }
      });
      
    headerStyles = {
        root: {
            fontSize: FontSizes.xxLargePlus,
            fontWeight: FontWeights.bold,
            padding: '12px 12px 14px 24px'
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
                <div>
                    <Text styles={this.headerStyles}>{this.props.data.title}</Text>
                    <IconButton
                    styles={this.iconButtonStyles}
                    iconProps={{ iconName: 'Cancel' }}
                    ariaLabel="Close modal"
                    onClick={this._closeModal}
                    />
                </div>
                <DragScrollProvider>
                    {({onMouseDown, ref}) => (
                        <div className="ModalImages" ref={ref} onMouseDown={onMouseDown}>
                            {this.props.data.imagepaths.map(src => (
                                <Image {...this.imageProps} src={images(src)}/>
                            ))}
                        </div>
                    )}  
                </DragScrollProvider>
                <OverflowSet vertical items={[this.props.data.paras[0]]} onRenderItem={this._onRenderModalPara}/>
                <Text block variant={"xLarge"} className="ModalPara">Relevant Skills</Text>
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
        return(
            <a href={link} className="ModalLink">{link}</a>
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
            <Text variant={'large'} className="ModalKey">{"- " + key}</Text>
        )
    }

    _onRenderModalPara = (para) => {
        return <Text variant={'large'} className="ModalPara">{para}</Text>
    }
}

export default GalleryCard;