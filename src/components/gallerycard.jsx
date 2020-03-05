import React from 'react';
import {Text, Image, OverflowSet, Modal, Link} from 'office-ui-fabric-react';
import {Card} from '@uifabric/react-cards';

var images = require.context("../images", true)

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

    onClicked = () => {
        this._openModal();
    };

    render() {
        return <>
        <Card onClick={this.onClicked} styles={this.galleryStyles}>
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
                <Text variant="small">
                    {this.props.data.paras[0]}
                </Text>
                <OverflowSet items={this.props.data.keys} onRenderItem={this._onRenderItem}/>
            </Card.Section>
        </Card>

        <Modal isOpen={this.state.showModal} onDismiss={this._closeModal} className="GalleryModal">
            <div>
                <Text variant={"xxLargePlus"}>{this.props.data.title}</Text>
                <OverflowSet items={this.props.data.imagepaths} onRenderItem={this._onRenderImage}/>
                <OverflowSet vertical items={[this.props.data.paras[0]]} onRenderItem={this._onRenderModalPara}/>
                <Text block variant={"xLarge"}>Relevant Skills</Text>
                <OverflowSet vertical items= {this.props.data.keys} onRenderItem={this._onRenderModalKey}/>
                <Link src={this.props.data.links[0]}>{this.props.data.links[0]}</Link>
            </div>
        </Modal>
        </>
    }

    _closeModal = () => {
        this.setState({showModal: false});
    }

    _openModal = () => {
        this.setState({showModal: true});
    }

    _onRenderLink = (link) => {
        return(
            <Link src={link}>{link}</Link>
        )
    }

    _onRenderImage = (image) => {
        var imageRef = images(image)
        return (
            <Image border={50} src={imageRef} height={450}/>
        )
    }

    _onRenderModalKey = (key) => {
        return (
            <Text variant={'large'}>{"- " + key}</Text>
        )
    }

    _onRenderModalPara = (para) => {
        return <Text variant={'large'}>{para}</Text>
    }

    _onRenderItem = (item) => {
        return (
        <div className="GalleryKey">
          <Text variant={"xSmall"}>
            {item}
          </Text>
        </div>
        );
    };
}



export default GalleryCard;